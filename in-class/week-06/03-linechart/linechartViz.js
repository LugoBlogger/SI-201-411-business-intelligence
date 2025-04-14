function createLinechartViz() {
  d3.csv("../../datasets/tweetdata.csv")
    .then(data => {overallViz(data)})
    .catch(err => errorHandling(err))
}

function overallViz(incomingData) {
  console.log(incomingData);
  const blue = "#5eaec5", green = "#92c463", orange = "#fe9a22";
  let xExtent = d3.extent(incomingData, d => parseInt(d.day))
  let yTweetsExtent = d3.extent(incomingData, d => parseInt(d.tweets));
  let yRetweetsExtent = d3.extent(incomingData, d => parseInt(d.retweets));
  let yFavoritesExtent = d3.extent(incomingData, d => parseInt(d.favorites));
  
  let yExtent = [null, null];
  yExtent[0] = Math.min(yTweetsExtent[1], yRetweetsExtent[1], yFavoritesExtent[1]);
  yExtent[1] = Math.max(yTweetsExtent[1], yRetweetsExtent[1], yFavoritesExtent[1]);
  console.log(xExtent, yExtent);

  let xMargin = 1.4;
  let yMargin = 3;
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

  // add data
  d3.select("svg").selectAll("circle.tweets")
    .data(incomingData)
    .join("circle")
    .attr("class", "tweets")
    .attr("r", 5)
    .attr("cx", d => xScale(parseInt(d.day)))
    .attr("cy", d => yScale(parseInt(d.tweets)))
    .style("fill", orange);

  d3.select("svg").selectAll("circle.retweets")
    .data(incomingData)
    .join("circle")
    .attr("class", "retweets")
    .attr("r", 5)
    .attr("cx", d => xScale(parseInt(d.day)))
    .attr("cy", d => yScale(parseInt(d.retweets)))
    .style("fill", blue); 

  d3.select("svg").selectAll("circle.favorites")
    .data(incomingData)
    .join("circle")
    .attr("class", "favorites")
    .attr("r", 5)
    .attr("cx", d => xScale(parseInt(d.day)))
    .attr("cy", d => yScale(parseInt(d.favorites)))
    .style("fill", green);

  // adding lines
  const lambdaXScale = d => xScale(parseInt(d.day))
  let tweetLine = d3.line()
    .x(lambdaXScale)
    .y(d => yScale(parseInt(d.tweets)))
  let retweetLine = d3.line()
    .x(lambdaXScale)
    .y(d => yScale(parseInt(d.retweets)))
  let favoriteLine = d3.line()
    .x(lambdaXScale)
    .y(d => yScale(parseInt(d.favorites)))

  // add line interpolation
  tweetLine.curve(d3.curveBasis);
  retweetLine.curve(d3.curveStep);
  favoriteLine.curve(d3.curveCardinal);
  
  d3.select("svg").append("path")
    .attr("d", tweetLine(incomingData))
    .attr("fill", "none")
    .attr("stroke", orange)
    .attr("stroke-width", 2)

  d3.select("svg").append("path")
    .attr("d", retweetLine(incomingData))
    .attr("fill", "none")
    .attr("stroke", blue)
    .attr("stroke-width", 2)

  d3.select("svg").append("path")
    .attr("d", favoriteLine(incomingData))
    .attr("fill", "none")
    .attr("stroke", green)
    .attr("stroke-width", 2)

}


function errorHandling(err) {
  console.log(err)
}