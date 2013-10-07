var count = 1;
var data = [15, 10,98, 13, 19, 1121,33, 625, 322, 144, 1, 13, 11, 312, 15,212, 9209, 818, 17, 16,55, 718, 20, 2511, 23, 1133];

var sortStruct;

var setStruct = function () {
    sortStruct = {
        '0': [],
            '1': [],
            '2': [],
            '3': [],
            '4': [],
            '5': [],
            '6': [],
            '7': [],
            '8': [],
            '9': []
    };

}


var log10 = function (val) {
    return Math.log(val) / Math.LN10;
}

var getMax = function (a) {
    var max = 0;
    for (var i = 0; i < a.length; i++) {
        if (a[i] > max) {
            max = a[i];
        }
    }
    var digits = Math.floor(log10(max)) + 1;

    return digits;
};


var sortByDigit = function (rank) {

    var m = Math.pow(10, rank);
    var n = Math.pow(10, rank - 1);
    
    for (var i = 0; i < data.length; i++) {
        var sortKey = Math.floor(data[i] % m / n);
       
        sortStruct[sortKey].push(data[i]);
        
    }

    var returnArr = dumpStruct(sortStruct);
    setStruct();
    return returnArr;
};


var dumpStruct = function (obj) {
    var j = 0;
    var dumpReturn = [];
    for (var i = 0; i < 10; i++) {
        for (var k = 0; k < obj[i].length; k++) {

            dumpReturn[j] = obj[i][k];
            j++;
        }

    }
    data = dumpReturn;
    return dumpReturn;
};


setStruct();
//var biggestNum = getMax(data);
//console.log("biggestNum", biggestNum);

//for (var digit = 1; digit <= biggestNum; digit++) {

  // sortByDigit(digit);
//}




var w = 600;
var h = 250;
var padding = 1;
var xScale = d3.scale.ordinal()
    .domain(d3.range(data.length))
    .rangeRoundBands([0, w], 0.05);

var yScale = d3.scale.pow().exponent(.2)
    .range([0, h])
    .domain([0, d3.max(data, function (d) {
    return d;
})]);

var colorScale = d3.scale.pow().exponent(.2)
    .domain([0, d3.max(data, function (d) {
    return d;
})])
    .range(["black", "gray"]);


var svg = d3.select("#graph")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
    return xScale(i);
})
    .attr("y", function (d) {
    return h - yScale(d);
})
    .attr("width", xScale.rangeBand())
    .attr("height", function (d) {
    return yScale(d);
})
    .attr("fill", function (d) {
    return colorScale(d);
});



d3.select("p")
   .on("click", function () {
    
   data = sortByDigit(count);
   count++;
   var text = arrayToList(data);
   $('body').append('<p>' + text + '</p>');
       
       
    svg.selectAll("rect").data(data)
       .transition()
       .attr("y", function (d) {
       return h - yScale(d);
    }).attr("height", function (d) {
        return yScale(d);
   }).attr("fill", function (d) {
       return colorScale(d);
   });
       
       

});

var arrayToList = function(a){
    var list = "" + count + ". ";
 for (var i = 0; i < a.length; i++){
      list = list + a[i];
      if (i != a.length - 1){
      list = list + ",";
      }
 }
 return list;
}

$('body').append('<p>' + arrayToList(data)+ '</p>');
