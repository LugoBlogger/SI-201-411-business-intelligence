/*
Logs 
- [2025/03/25]    
  This problem is coming from the discussion during the class in Week-05.   
  Actually we need to move beyond <g>, and use one by one <circle> and <text>.
  Then we have to set the "id" attribute for each circle for detecting
  the index of hovered circle.

  All the idea is coming from,
  https://using-d3js.com/02_04_reordering_elements.html,
  with some modification.

  It took me more than 6 hours to solve this. 
 */

function createSoccerViz() {
  d3.csv("../../datasets/worldcup.csv")
    .then(data => {overallTeamViz(data)})
    .catch(err => errorHandling(err))
}

function overallTeamViz(incomingData) {
  console.log(incomingData);

  // We cannot use <g> to group <circle> and <text>, because
  // <g> does not have <cx> or <x> attribute to modify with transition().
  // So we need to create one by one without any grouping.
  const circIntevalWidth = 400/(incomingData.length - 1);
  let teamG = d3.select("svg")
    .append("g")
    .attr("id", "teamG")
    .attr("transform", "translate(50, 300)");

  // add circle
  teamG.selectAll("circle")
    .data(incomingData)
    .join("circle")
    .attr("class", "overallCirc")
    .attr("id", (d, i) => `circ${i}`)
    .attr("cx", (d, i) => i * circIntevalWidth)
    .attr("r", 0)
    .transition()
    .delay((d, i) => i * 100)
    .duration(500)
    .attr("r", 40)
    .transition()
    .duration(500)
    .attr("r", 20)

  // add text also its transition
  teamG.selectAll("text")
    .data(incomingData)
    .join("text")
    .attr("class", "overallText")
    .attr("id", (d, i) => `text${i}`)
    .attr("x", (d, i) => i * circIntevalWidth)
    .attr("y", 30)
    .text(d => d.team)
    .style("font-size", "0px")
    .transition()
    .delay((d, i) => i * 100)
    .style("font-size", "10px");


  // 02) create a button dynamically, that accesses the numerical data keys
  const dataKeys = Object.keys(incomingData[0])
    .filter(d => d !== "team" && d !== "region");
  incomingData.map((d, i) => d.idx = i);  // for argSort
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

    d3.selectAll("circle.overallCirc")
      .sort((a, b) => d3.descending(parseInt(a[datapoint]), parseInt(b[datapoint])))
      .transition().duration(500)
      .attr("cx", (d, i) => i*circIntevalWidth)
      .attr("r", d => radiusScale(parseInt(d[datapoint])))
      .style("fill", d => colorRamp(parseInt(d[datapoint])));
    
    d3.selectAll("text.overallText")
      .sort((a, b) => d3.descending(parseInt(a[datapoint]), parseInt(b[datapoint])))
      .transition().duration(500)
      .attr("x", (d, i) => i*circIntevalWidth);
    
  }

  // 04) Add mouse hover events
  let overallCirc = teamG.selectAll("circle.overallCirc");
  overallCirc.on("mouseover", highlightRegion);
  function highlightRegion(event, dataHover) {
    // console.log(event);
    // console.log(dataHover);
    // console.log(this, dataHover["idx"]);
    const idxCirc = dataHover["idx"];

    teamG.select(`text#text${idxCirc}`)
      .style("font-size", "")
      .classed("active", true)
      .attr("y", 10);
    // teamG.select("text.overall")
    //   .style("font-size", "")       // for the step 05)
    //   .classed("active", true)
    //   .attr("y", 10);

    // put the hover circle to the end of the list
    // this.parentElement.appendChild(this);
  }

  overallCirc.on("mouseout", unHighlight);
  function unHighlight(event, dataHover) {
    // console.log(event);
    // console.log(dataHover);
    console.log(this);
    const idxCirc = dataHover["idx"];
    teamG.select(`text#text${idxCirc}`)
      .classed("active", false)
      .attr("y", 30);
  }

  // Fix the hover area due to font increasing after "mouseover"
  teamG.selectAll(".overallText").style("pointer-events", "none");

}

function errorHandling(err) {
  console.log(err);
}