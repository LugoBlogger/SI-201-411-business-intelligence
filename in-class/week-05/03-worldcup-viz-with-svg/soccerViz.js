function createSoccerViz() {
  d3.csv("../../datasets/worldcup.csv")
    .then(data => {overallTeamViz(data)})
    .catch(err => errorHandling(err))
}

function overallTeamViz(incomingData) {
  d3.select("svg")
    .append("g")
    .attr("id", "teamG")
    .attr("transform", "translate(50, 300)")
    .selectAll("g")
    .data(incomingData)
    .join("g")
    .attr("class", "overallG")
    .attr("transform", (d, i) => "translate(" + (i * 50) + ", 0)");
  
  let teamG = d3.selectAll("g.overallG");
  teamG.append("text")
        .attr("y", 30)
        .text(d => d.team)

  // create a button dynamically.
  // Get the numerical data keys
  const dataKeys = Object.keys(incomingData[0])
    .filter(d => d !== "team" && d !== "region");
  
  // -- the input argument for function in .on() has been changed for
  // d3.v7. The input argument is (err, data) not (data).
  d3.select("#controls").selectAll("button")
    .data(dataKeys)
    .join("button")
    .on("click", buttonClick)
    .html(d => d);
  
  let clickState = "";   // for 08.b)

  // in the textbook, there are some values which are negatives
  // and radius of the circle must be positive. We add minValue to resolve 
  // this problem
  function buttonClick(event, datapoint) {
    // console.log(`datapoint ${datapoint}`);
    // console.log(dataKeys[0]);
    // console.log(incomingData[0]);
    let maxValue = d3.max(incomingData, d => parseFloat(d[datapoint]));
    let minValue = d3.min(incomingData, d => parseFloat(d[datapoint]));
    // console.log(`maxValue ${maxValue}`);
    let radiusScale = d3.scaleLinear()
      .domain([minValue, maxValue]).range([2, 20]);
    
    // let colorRamp = d3.scaleQuantize()
    //   .domain([minValue, maxValue]).range(colorbrewer.Reds[8].toReversed());
    let colorRamp = d3.scaleQuantize()
      .domain([minValue, maxValue]).range(colorbrewer.Blues[8]);
    d3.selectAll("g.ballG")
      .transition().duration(500)
      .attr("transform", d => `scale(${radiusScale(d[datapoint])/(20-2)})`);
    // console.log(event);
    // console.log(incomingData);
    // console.log(incomingData[idx]);
    d3.selectAll("g.ballG").each(function(d, i) {
      let gParent = this;
      // console.log(d);
      // console.log(i);
      // console.log(gParent);
      d3.select(gParent).selectAll("path")
        .style("fill", colorRamp(d[datapoint]));
    });

    clickState = datapoint;   // for 08.b)
    // console.log(`clickState=${clickState}`);
  }


  // It has been set for style of <g class="overallG"> 
  // for <g style="pointer-events:bounding-box">. See the above declaration 
  // for <g class="overallG">
  teamG = d3.selectAll("g.overallG");
  // console.log(teamGcircle);
  teamG.on("mouseover", highlightRegion);
  function highlightRegion(event, d) {
    // console.log(event);
    d3.select(this).select("text")
      .classed("active", true)
      .attr("y", 50);
    
    // console.log(d.region);
    d3.selectAll("g.ballG").each(function(ballData, ballIdx) {
      let gParent = this;
      // console.log(ballData);
      let pColor = d3.select(gParent).select("path").style("fill");
      pColor = d3.rgb(pColor);
      if (ballData.region == d.region) {
        d3.select(gParent).selectAll("path")
          .style("fill", pColor.darker(0.75));
      } else {
        d3.select(gParent).selectAll("path")
          .style("fill", pColor.brighter(0.25));
      }
    })
    // d3.selectAll("g.overallG").select("circle")
    //   .style("fill", function(p) {
    //     // console.log(p.region);
    //     let pColor = d3.select(this).style("fill");
    //     // console.log(p, pColor);
    //     pColor = d3.rgb(pColor);
    //     let finalColor = p.region == d.region ? 
    //       pColor.darker(0.75) : pColor.brighter(0.5);
    //     return finalColor});
    // to fix z-levels for "Argentina" and other <text> element
    this.parentElement.appendChild(this);
  }
  // revert back to the ybRamp color scale
  teamG.on("mouseout", unHighlight);
  function unHighlight(event, d) {
    // console.log(d);
    // console.log(`clickState=${clickState}`);
    if (clickState === "") {
      // console.log(clickState)
      d3.selectAll("g.ballG").selectAll("path")
        .style("fill", "#93C464")
        .style("stroke", "black")
        .style("stroke-width", "1px");
    } else {
      let maxValue = d3.max(incomingData, d => parseFloat(d[clickState]));
      let minValue = d3.min(incomingData, d => parseFloat(d[clickState]));
      // console.log(`(minValue, maxValue) = ${minValue}, ${maxValue}`);

    let colorRamp = d3.scaleQuantize()
      .domain([minValue, maxValue]).range(colorbrewer.Blues[8]);
    d3.selectAll("g.ballG").each(function(ballData, ballIdx) {
      let gParent = this;
      // console.log(ballData);
      // console.log(ballIdx);
      // console.log(gParent);
      console.log(ballData)
      d3.select(gParent).selectAll("path")
        .style("fill", colorRamp(ballData[clickState]));
    });
    }


    d3.select(this).select("text")
      .classed("active", false)
      .attr("y", 30);
  }
  

  // To fix an event when hovering outside the circle but still inside the text
  // because we have enlarge the text
  teamG.select("text").style("pointer-events", "none");


  // Section 3.3.3 Pregenerated SVG
  // Download the svg for the football in https://thenounproject.com/icon/football-1907/
  // It is different from the textbook, we need to add .then()
  d3.html("../../datasets/noun-football-1907.svg")
    .then(loadSVG)
  // function loadSVG(svgData) {
  //   // console.log(svgData);
  //   d3.select(svgData).selectAll("path").each(function() {
  //     d3.select("svg").node().appendChild(this);
  //   });
  //   d3.selectAll("path")
  //     .attr("transform", "translate(50, 50)");
  // }

  // multiple transformation is done by concatenating with space
  // read more about .cloneNode in https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode
  // two nested .each is one for each <g> element in our DOM and one for each
  // <path> element in the icon.
  function loadSVG(svgData) {
    // console.log(svgData);
    let ballG = d3.selectAll("g.overallG").append("g")
      .attr("class", "ballG")
      .style("pointer-events", "bounding-box")   // for mouse hovering events
    d3.selectAll(ballG).each(function(d, i) {
      let gParent = this;
      d3.select(svgData).selectAll("path").each(function() {
        gParent.appendChild(this.cloneNode(true))
      });
      // console.log(i);
      d3.selectAll("path")
        // // .attr("transform", "translate(-20, -20) scale(0.4)")
        // .attr("transform", "scale(0.01)")
        // .transition()
        // .delay(i * 500)
        // .attr("transform", "translate(-40, -40) scale(0.8)")
        // .transition()
        // .duration(500)
        .attr("transform", "translate(-20, -20) scale(0.4)");
    
    });

    d3.selectAll("g.ballG").selectAll("path")
      .style("fill", "#93C464")
      .style("stroke", "black")
      .style("stroke-width", "1px");
  }
  

}


function errorHandling(err) {
  console.log(err);
}