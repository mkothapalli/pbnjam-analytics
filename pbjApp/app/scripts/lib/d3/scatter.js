if(!d3.chart) d3.chart = {};

d3.chart.scatter = function() {
    var g;
    var data;
    var width = 400;
    var height = 400;
    var cx = 10;
    var numberBins = 5;
    var dispatch = d3.dispatch(chart, "hover");

    function chart(container) {
        g = container;

        g.append("g")
            .classed("xaxis", true)

        g.append("g")
            .classed("yaxis", true)

        update();
    }
    chart.update = update;
    function update() {
        var maxCreated = d3.max(data, function(d) { return d.startdate });
        var minCreated = d3.min(data, function(d) { return d.startdate });
        var maxScore = d3.max(data, function(d) { return parseFloat(d.metrics.bitrate_views) })

        var colorScale = d3.scale.category20();
        var createdScale = d3.time.scale()
            .domain([minCreated, maxCreated])
            .range([cx, width])

        var commentScale = d3.scale.linear()
            .domain(d3.extent(data, function(d) { return parseFloat(d.metrics.views) }))
            .range([3, 15])

        var yScale = d3.scale.linear()
            .domain([0, maxScore])
            .range([height, cx])

        var xAxis = d3.svg.axis()
            .scale(createdScale)
            .ticks(3)
            .tickFormat(d3.time.format("%x %H:%M"))

        var yAxis = d3.svg.axis()
            .scale(yScale)
            .ticks(3)
            .orient("left")

        var xg = g.select(".xaxis")
            .classed("axis", true)
            .attr("transform", "translate(" + [0,height] + ")")
            .transition()
            .call(xAxis)

        g.select('.xaxis')
            .select('.domain')
            .attr('d', 'M10,6V0H400V6');

        var yg = g.select(".yaxis")
            .classed("axis", true)
            .classed("yaxis", true)
            .attr("transform", "translate(" + [cx - 5,0] + ")")
            .transition()
            .call(yAxis)

        g.select('.yaxis')
            .select('.domain')
            .attr('d', 'M-6,10H0V400H-6');

        g.select('.yaxis')
            .append('text')
            .attr('x',15 )
            .attr('y', 20)
            .attr('transform', 'rotate(90)')
            .text('Bitrate');

        var circles = g.selectAll("circle")
            .data(data, function(d) { return d.id })

        circles.enter()
            .append("circle")

        circles
            .transition()
            .attr({
                cx: function(d,i) { return createdScale(d.startdate) },
                cy: function(d,i) {
                    return yScale(parseFloat(d.metrics.bitrate_views))
                },
                r: function(d) { return commentScale(parseFloat(d.metrics.views))}
            })

        circles.exit().remove()

        circles.on("mouseover", function(d) {
            d3.select(this).style("stroke", "red").style('stroke-width',2)
            dispatch.hover([d])
        })
        circles.on("mouseout", function(d) {
            d3.select(this).style("stroke", "").style('stroke-width', '')
            dispatch.hover([])
        })

        var hist = d3.layout.histogram()
            .value(function(d) { return d.metrics.bitrate_views })
            .range([0, d3.max(data, function(d){ return d.metrics.bitrate_views }) ])
            .bins(numberBins);
        var layout = hist(data);

        for(var i = 0; i < layout.length; i++) {
            var bin = layout[i];
            g.selectAll("circle")
                .data(bin, function(d) { return d.id })
                .style("fill", function() {  return colorScale(i) })
        }

    }

    chart.highlight = function(data) {
        var circles = g.selectAll("circle")
            .style("stroke", "")


        circles.data(data, function(d) { return d.id })
            .style("stroke", "red")
            .style("stroke-width", 3)
    }

    chart.data = function(value) {
        if(!arguments.length) return data;
        data = value;
        return chart;
    }
    chart.width = function(value) {
        if(!arguments.length) return width;
        width = value;
        return chart;
    }
    chart.height = function(value) {
        if(!arguments.length) return height;
        height = value;
        return chart;
    }

    return d3.rebind(chart, dispatch, "on");
}