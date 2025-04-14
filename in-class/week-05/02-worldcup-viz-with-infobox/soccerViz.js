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

  // dynamic appearance of the circle in the beginning
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
        .transition()
        .delay((d, i) => i * 100)
        .duration(500)
        .attr("y", 30)
        .text(d => d.team)

  // add flags to each circle. To get the flags images
  // visit https://en.wikipedia.org/wiki/List_of_national_flags_of_sovereign_states
  d3.selectAll("g.overallG").insert("image", "text")
    .attr("xlink:href", d => `../../datasets/flags/${d.team}.png`)
    .attr("width", "0px")
    .attr("height", "0px")
    .attr("x", -22)
    .attr("y", -10)
    .transition()
    .delay((d, i) => i * 100)
    .duration(500)
    .attr("width", "90px")
    .attr("height", "40px")
    .attr("x", -22 - 22.5)
    .attr("y", -10 - 10)
    .transition()
    .duration(500)
    .attr("width", "45px")
    .attr("height", "20px")
    .attr("x", -22)
    .attr("y", -10);


  // add infobox. In the D3 v7, we need to use .then()
  d3.text("./infobox.html")
    .then((html) => {
      // console.log(html);
      d3.select("body").append("div")
        .attr("id", "infobox")
        .html(html);
      });
  teamG.on("click", teamClick);
  // remember that the function signature for .on() is function(err, data).
  function teamClick(err, d) {
    console.log(d);
    console.log(Object.values(d));
    d3.selectAll("td.data").data(Object.values(d))
      .join("td.data")
      .html(p => p)
  }
}


function errorHandling(err) {
  console.log(err);
}