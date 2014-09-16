if(!d3.chart) d3.chart = {};

d3.chart.histogram = function() {
    var g;
    var data;
    var width = 400;
    var height = 400;
    var cx = 10;
    var numberBins = 5;
    var dispatch = d3.dispatch(chart, "hover");
    var extent = [];
    var xScales = [];
    var plot;

    function chart(container) {
        g = container.attr('transform', 'translate('+ (width+70)+',20)');

        var bitrate = d3.extent(data, function(d){return  parseFloat(d.metrics.bitrate_views)});
        var views = d3.extent(data, function(d){return parseFloat(d.metrics.views)});
        var hd = d3.extent(data, function(d){return parseFloat(d.metrics.HD_play_duration)});
        var sd = d3.extent(data, function(d){return parseFloat(d.metrics.SD_play_duration)});

        extent = [bitrate, views, hd, sd];

        extent.forEach(function(d){
            xScales.push(d3.scale.linear().domain(d).range([0,width]));
        })


        update();
    }
    chart.update = update;
    function update() {

        var bitrate = d3.mean(data, function(d){return d.metrics.bitrate_views});
        var views = d3.mean(data, function(d){return d.metrics.views});
        var hd = d3.mean(data, function(d){return d.metrics.HD_play_duration});
        var sd = d3.mean(data, function(d){return d.metrics.SD_play_duration});
        console.log("views"+views);

        var array = [{name: 'bitrate',  value: bitrate},
            {name: 'views',  value: views},
            {name: 'hd',  value: hd},
            {name: 'sd',  value: sd}]


        var b = g.selectAll('g')
            .data(array);

        var bg = b.enter()
            .append('g');

        bg.append('rect')
            .attr('class', 'extent')
            .attr('fill', '#eee');
        bg.append('rect')
            .attr('class','avg')
            .attr('fill', '#333');


        b.select('.extent')
            .attr('x', 0)
            .attr('y', function(d,i){ return i * 40 +10;})
            .attr('width', width)
            .attr('height', 10);


        b.select('.avg')
            .transition()
            .attr('x', function(d,i){
                console.log(xScales[i](d.value));
                return xScales[i](d.value)
            })
            .attr('y', function(d,i){ return i * 40 +10;})
            .attr('width', 5)
            .attr('height', 10);

        var a = g.selectAll('text')
            .data(array, function(d){return d.name});

        a.enter()
            .append('text')
        .attr('x', 10)
        .attr('y', function(d,i){ return i *40 + 5;})    ;

        a
            .text(function(d,i){return d.value + '/'+ extent[i][1] +' '+ d.name;})

        a.exit()
            .remove();


        console.log(a.data());



        a.on("mouseover", function(d) {
            d3.select(this).style("fill", "orange")
            console.log("hist over", d)
            dispatch.hover(d)
        })
        a.on("mouseout", function(d) {
            d3.select(this).style("fill", "")
            dispatch.hover([])
        })
    }

    chart.highlight=function(data){
        console.log("highlighted "+data);

        if(data[0] && data[0].metrics) {
            var rects = g.selectAll("rect.extent");

            var current = [
                data[0].metrics.bitrate_views,
                data[0].metrics.views,
                data[0].metrics.HD_play_duration,
                data[0].metrics.SD_play_duration
                ];

            current = current.map(function(d){

                return parseFloat(d)})
            var c = g.selectAll('.currentContainer')
                .data(current);

            var cg = c.enter().append('g') .attr('class', 'currentContainer');

            cg.append('rect')
                .attr('class', 'currentRect')
                .attr('fill', 'red');

            cg.append('text')
                .attr('class', 'currentText');

            c.select('.currentRect')
                .attr('x', function (d, i) {
                    console.log("domain::"+xScales[i].domain())
                    console.log("d value::"+d);
                    return xScales[i](d)
                })
                .attr('y', function (d, i) {
                    return i * 40 + 10;
                })
                .attr('width', 2)
                .attr('height', 10);
            c.select('.currentText')
                .attr('x', function(d,i){ return xScales[i](d);})
                .attr('y', function (d, i) {
                    return i * 40 + 35;
                })
                .attr('text-anchor', 'middle')
                .text(function(d,i){return d});
        }
        else{
            g.selectAll('.currentContainer').remove();
        }

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
