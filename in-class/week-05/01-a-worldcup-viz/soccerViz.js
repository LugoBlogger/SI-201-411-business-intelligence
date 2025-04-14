function createSoccerViz() {
  d3.csv("../../datasets/worldcup.csv")
    .then(data => {overallTeamViz(data)})
    .catch(err => errorHandling(err))
}

function overallTeamViz(incomingData) {
  // 01.a) Create <g id="teamG"> inside <svg> element and after that create
  // <g class="overallG"> inside <g id="teamG">
  d3.select("svg")
    .append("g")
    .attr("id", "teamG")
    .attr("transform", "translate(50, 300)")
    .selectAll("g")
    .data(incomingData)
    .join("g")
    .attr("class", "overallG")
    .attr("transform", (d, i) => "translate(" + (i * 50) + ", 0)");

  // 01.b) Get HTML element <g class="overallG"> and add eight circles
  // and `d.team` below each circle 
  // let teamG = d3.selectAll("g.overallG");
  // teamG.append("circle")
  //   .attr("r", 20);
  // teamG.append("text")
  //   .attr("y", 30)
  //   .text(d => d.team);

  // 05) Dynamic appearance of the circle in beginning
  let teamG = d3.selectAll("g.overallG");
  teamG.append("circle")
    .attr("r", 0)
    .transition()
    .delay((d, i) => i * 100)
    .duration(500)
    .attr("r", 40)
    .transition()
    .duration(500)
    .attr("r", 20)
  teamG.append("text")
    .attr("y", 30)
    .text(d => d.team)
    .style("font-size", "0px")
    .transition()
    .delay((d, i) => i * 100)
    .style("font-size", "10px");

  // 02) create a button dynamically, that accesses the numerical data keys
  const dataKeys = Object.keys(incomingData[0])
    .filter(d => d !== "team" && d !== "region");
  d3.select("#controls").selectAll("button")
    .data(dataKeys)
    .join("button")
    .on("click", buttonClick)
    .html(d => d);
  
  function buttonClick(event, datapoint) {
    // 03) Set the interactivity of radius and color
    let maxValue = d3.max(incomingData, d => parseFloat(d[datapoint]));
    let minValue = d3.min(incomingData, d => parseFloat(d[datapoint]));
    let radiusScale = d3.scaleLinear()
      .domain([minValue, maxValue]).range([2, 20]);
    let colorRamp = d3.scaleQuantize()
      .domain([minValue, maxValue]).range(colorbrewer.Blues[8].toReversed());
    
    d3.selectAll("g.overallG").select("circle")
      .transition().duration(500)       // Step 06) transition after clicking the button
      .attr("r", d => radiusScale(d[datapoint]))
      .style("fill", d => colorRamp(d[datapoint]));
  }

  // 04) Add mouse hover events
  teamG.on("mouseover", highlightRegion);
  function highlightRegion(event, dataHover) {
    // console.log(event);
    // console.log(dataHover);
    console.log(this);
    d3.select(this).select("text")
      .style("font-size", "")       // for the step 05)
      .classed("active", true)
      .attr("y", 10);

    // put the hover circle to the end of the list
    this.parentElement.appendChild(this);
  }

  teamG.on("mouseout", unHighlight);
  function unHighlight(event, dataHover) {
    // console.log(event);
    // console.log(dataHover);
    console.log(this);
    d3.select(this).select("text")
      .classed("active", false)
      .attr("y", 30);
  }

  // Fix the hover area due to font increasing after "mouseover"
  teamG.select("text").style("pointer-events", "none");

}

function errorHandling(err) {
  console.log(err);
}