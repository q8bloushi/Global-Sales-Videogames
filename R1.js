//Mohammad Ahmed (A00425053)

var format = d3.format(".2%");

var dataset = d3.csv("vgsales.csv");
var selectedRegion;
var selectedPlatform;
var regionName = ["NA_Sales", "EU_Sales", "JP_Sales", "Other_Sales", "Global_Sales"];
var filteredPlatform = [];

$('body').ready(init);

//filter the platforms and push them into the array
var platformName = [];
function pushPlatform(d) {
    var temp = [];
    platformName.push(d.Platform);
    temp = platformName.filter((value, index, categoryArray) => categoryArray.indexOf(value) === index);
    return temp;
}

function init() {


    dataset.then(function (data) {

        var selectRegion = $("<select>")
            .attr("id", "selectRegion")
            .change(printChart);

        regionName.forEach(function (d) {
            var addOption = $("<option>")
                .html(d)
                .val(d);
                selectRegion.append(addOption);
        });

        var selectPlat = $("<select>")
            .attr("id", "selectPlat")
            .change(printChart);

        filteredPlatform = data.map(pushPlatform);
        filteredPlatform = filteredPlatform[filteredPlatform.length - 1];
        filteredPlatform.forEach(function (d) {
            var addOption = $("<option>")
                .html(d)
                .val(d);
                selectPlat.append(addOption);
        });

        $("#select").append(selectPlat);
        $("#select").append(selectRegion);


        function printChart() {

            $("#chart").empty();

            selectedRegion = $("#selectRegion option:selected").val();
            selectedPlatform = $("#selectPlat option:selected").val();


            var filtered = data.filter(function (d) {
                return d.Platform == selectedPlatform;
            })

            var svg = d3.select("#chart").append("svg");
            svg.attr("height", 20000).attr("width", 2000);

            var chart = svg.selectAll("g")
                .data(filtered)
                .enter()
                .append("g");


            const barHeight = 20;

            chart.append("rect")
                .attr("y", function (d, i) {
                    return (i + 1) * (barHeight + 2);
                })
                .attr("x", function (d, i) { 0 })
                .attr("height", barHeight)
                .attr("width", function (d) {
                    return (parseFloat(d[selectedRegion]) * 20);
                })
                .attr("fill", "#69b3a2");

            chart.append("text")
                .attr("x", function (d) {
                    return parseFloat((parseFloat(d[selectedRegion]) * parseFloat(20)) + 5);
                })
                .attr("y", function (d, i) {
                    return (i + 1.8) * (barHeight + 2);
                }).text(function (d) {
                    return d.Rank + ": " + d.Name + " ($" + d[selectedRegion] + "M) " + d.Platform;
                }).attr("fill", "black");
        }
        printChart();
    });
}