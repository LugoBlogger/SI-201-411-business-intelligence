function createStackedchartViz() {
  d3.csv("../../datasets/movies.csv")
    .then(data => {overallViz(data)})
    .catch(err => errorHandling(err))
}

function overallViz(incomingData) {
  console.log(incomingData);
  const blue = "#5eaec5", green = "#92c463", orange = "#fe9a22";
  let xExtent = d3.extent(incomingData, d => parseInt(d.day))
  
  let yExtent = [0, 0];
  const keys = Object.keys(incomingData[0]).filter(d => d != "day");
  keys.forEach(key => {
    tempMax = d3.max(incomingData, d => parseInt(d[key]));
    tempMin = d3.min(incomingData, d => parseInt(d[key]));
    yExtent[1] = (tempMax > yExtent[1]) ? tempMax : yExtent[1];
    yExtent[0] = (tempMin < yExtent[0]) ? tempMax : yExtent[0];
  })
  console.log(xExtent, yExtent);

  let xMargin = 1.4;
  let yMargin = 35;
  xScale = d3.scaleLinear().domain([0, xExtent[1]+xMargin]).range([40, 460]);
  yScale = d3.scaleLinear().domain([0, yExtent[1]+yMargin]).range([460, 40]);
  
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

  
  // add plot
  console.log(keys);
  let fillScale = d3.scaleOrdinal()
    .domain(keys).range(["#fcd88a", "#cf7c1c", "#93c464", "#75734f", "#5eafc6", "#41a368"]);

  keys.forEach(key => {
    let movieArea = d3.area()
      .x(d => xScale(parseInt(d.day)))
      .y0(d => yScale(simpleStacking(d, key) - d[key]))
      .y1(d => yScale(simpleStacking(d, key)))
      .curve(d3.curveBasis);
    console.log(movieArea)

    d3.select("svg")
      .append("path")
      .style("id", key + "Area")
      .attr("d", movieArea(incomingData))
      .attr("fill", fillScale(key))
      .attr("stroke", "black")
      .attr("stroke-width", 1)
  })

  function simpleStacking(lineData, lineKey) {
    let newHeight = 0;
    Object.keys(lineData).every(key => {
      if (key !== "day") {
        newHeight += parseInt(lineData[key]);
        if (key === lineKey) {
          return false
        }
      }
      return true
    })
    return newHeight
  }


  // adding a color legend
  let legendA = d3.legendColor().scale(fillScale)
  d3.select("svg")
    .style("width", "1000px");
  d3.select("svg")
    .append("g")
    .attr("transform", `translate(${460+20}, 40)`)
    .call(legendA);

  // horizontal orientation
  // legendA.orient("horizontal")
  //   .shapePadding(60)
  //   .shapeWidth(12)
  //   .shapeHeight(20);

  // d3.select("svg")
  //   .style("width", "1000px");
  // d3.select("svg")
  //   .append("g")
  //   .attr("transform", `translate(${100}, 60)`)
  //   .call(legendA);
}


function errorHandling(err) {
  console.log(err);
}