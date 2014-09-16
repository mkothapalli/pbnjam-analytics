/**
 * Created by skantaba on 9/13/14.
 */
angular.module('angularPassportApp')
    .controller('PlaceHolder1Ctrl', function ($scope,DataStream) {

        $scope.value="EventData";
        function dateConversion(givendate){

            givendate*= 1000;
            return givendate;
        }
        DataStream.setDataStream().then(function(){
            $scope.jsonData =DataStream.getDataStream();

        }).then(function(){
            console.log("result obtained"+$scope.jsonData);
            $scope.jsonData.forEach(function(d) {
                d.startdate=dateConversion(d.startdate);
                //d.enddate=dateConversion(d.enddate);
            })
            var display = d3.select("#display")

            //table
            var tdiv = display.append("div").classed("table", true)
            var table = d3.chart.table()
            table.data($scope.jsonData)
            table(tdiv);

            var svg = d3.select("svg")
            //scatter plot
            var sgroup = svg.append("g")
                .attr("transform", "translate(50, 0)")
            var scatter = d3.chart.scatter()
            scatter.data($scope.jsonData)
            scatter(sgroup)
            var bgroup = svg.append("g")
                .attr("transform", "translate(100, 430)")
            var brush = d3.chart.brush()
            brush
                .data($scope.jsonData)
                .width(800)
            brush(bgroup)
            var hgroup = svg.append("g")
                .attr("transform", "translate(450, 0)")
            var histogram = d3.chart.histogram()
            histogram.data($scope.jsonData);
            histogram(hgroup)

            brush.on("filter", function(filtered) {
                console.log("filtered", filtered);

                scatter.data(filtered);
                scatter.update();
                table.data(filtered)
                table.update();
                histogram.data(filtered)
                histogram.update();


            })
            table.on("hover", function(hovered) {
                scatter.highlight(hovered)
                brush.highlight(hovered)
            })
            scatter.on("hover", function(hovered) {
                table.highlight(hovered)
                brush.highlight(hovered)
                histogram.highlight(hovered)
            })
            histogram.on("hover", function(hovered) {
                table.highlight(hovered)
                scatter.highlight(hovered)
                brush.highlight(hovered)
            })

        })




    });

