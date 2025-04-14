function createBoxplotViz() {
  d3.csv("../../datasets/boxplots.csv")
    .then(data => {overallViz(data)})
    .catch(err => errorHandling(err))
}

function overallViz(incomingData) {
  console.log(incomingData);

  // A copy from ./01-scatterplot/scatterViz.js
  let xExtent = d3.extent(incomingData, d => parseInt(d.day));
  let yExtent = d3.extent(incomingData, d => parseInt(d.median));
  console.log(xExtent, yExtent);
  const xMargin = 1.5;
  const yMargin = 40;
  let xScale = d3.scaleLinear().domain([0, xExtent[1]+xMargin]).range([40, 460]);
  let yScale = d3.scaleLinear().domain([0, yExtent[1]+yMargin]).range([460, 40]);

  // set axis
  let yAxis = d3.axisLeft().scale(yScale)
    .ticks(8).tickSizeOuter(0).tickSizeInner(5);
  d3.select("svg").append("g")
    .attr("id", "yAxisG").call(yAxis);
  d3.selectAll("#yAxisG").attr("transform", "translate(40, 0)");

  let xAxis = d3.axisBottom().scale(xScale)
    .ticks(8).tickSizeOuter(0).tickSizeInner(5);
  d3.select("svg").append("g")
    .attr("id", "xAxisG").call(xAxis);
  d3.selectAll("#xAxisG").attr("transform", "translate(0, 460)");
  
  //  set gridlines
  d3.selectAll("#yAxisG g.tick")
    .insert("line")
    .attr("class", "gridline")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 420)
    .attr("y2", 0)
    .attr("stroke", "#9ca5aecf")
    .attr("stroke-dasharray", "4");

  d3.selectAll("#xAxisG g.tick")
    .insert("line")
    .attr("class", "gridline")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 0)
    .attr("y2", -420)
    .attr("stroke", "#9ca5aecf")
    .attr("stroke-dasharray", "4")

  // remove an excess gridline
  d3.select("#xAxisG g.tick line.gridline").remove();

  // 02) add boxplot components
  d3.select("svg").selectAll("g.box")   // if we use g only, we also select g axis
    .data(incomingData)
    .join("g")
    .attr("class", "box")
    .attr("transform", 
      d => `translate(${xScale(parseInt(d.day))}, `
                      + `${yScale(parseInt(d.median))})`)
    .each(function (d, i) {
        let dq1 = parseInt(d.q1), dq3 = parseInt(d.q3);
        let dmedian = parseInt(d.median), dmax = parseInt(d.max);
        let dmin = parseInt(d.min);
        const boxHeight = -(yScale(dq3) - yScale(dq1));
        // console.log(yScale(dmedian),yScale(dq1), yScale(d.q3))
        
        // <rect.distribution>
        d3.select(this)
          .append("rect")
          .attr("class", "distribution")
          .attr("width", 20)
          .attr("x", -10)
          .attr("y", yScale(dq3) - yScale(dmedian))
          .attr("height", boxHeight)
          .attr("fill", "white")
          .style("stroke", "black")

        // <line.range>
        d3.select(this)
          .append("line")
          .attr("class", "range")
          .attr("x1", 0)
          .attr("x2", 0)
          .attr("y1", yScale(dmax) - yScale(dmedian))
          .attr("y2", yScale(dmin) - yScale(dmedian))
          .style("stroke", "black")
          .style("stroke-width", "4px");

        // <line.max>
        d3.select(this)
          .append("line")
          .attr("class", "max")
          .attr("x1", -10)
          .attr("x2", 10)
          .attr("y1", yScale(dmax) - yScale(dmedian))
          .attr("y2", yScale(dmax) - yScale(dmedian))
          .style("stroke", "black")
          .style("stroke-width", "4px");

        // <line.min>
        d3.select(this)
          .append("line")
          .attr("class", "min")
          .attr("x1", -10)
          .attr("x2", 10)
          .attr("y1", yScale(dmin) - yScale(dmedian))
          .attr("y2", yScale(dmin) - yScale(dmedian))
          .style("stroke", "black")
          .style("stroke-width", "4px");

        // <line.median>
        d3.select(this)
          .append("line")
          .attr("class", "median")
          .attr("x1", -10)
          .attr("x2", 10)
          .attr("y1", 0)
          .attr("y2", 0)
          .style("stroke", "darkgray")
          .style("stroke-width", "4px");
      });

  // for image in the slides
  // d3.select("svg").selectAll("g.box")   
  //   .each(function (d, i) {
  //     console.log(i);
  //     if (i != 2) {
  //       d3.select(this).style("display", "none");
  //     }
  //   });

}


function errorHandling(err) {
  console.log(err);
}