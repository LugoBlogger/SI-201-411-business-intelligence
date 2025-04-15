function createPieChartViz() {
  d3.json("../../datasets/tweets.json")
    .then(data => {overallViz(data.tweets)})
    .catch(err => errorHandling(err))
}

function overallViz(incomingData) {
  console.log(incomingData);

  let userTweets = d3.groups(incomingData, d => d.user);
  console.log("userTweets", userTweets);

  let arrObjUserTweets = Array.from({ length: userTweets.length }, () => ({}));
  userTweets.forEach((d, i) => {
    arrObjUserTweets[i] = {
      user: d[0],
      numTweets: d[1].length,
      numFavorites: d3.sum(d[1], p => p.favorites.length),
      numRetweets: d3.sum(d[1], p => p.retweets.length)}
  });
  console.log("arrObjUserTweets", arrObjUserTweets);

  let pieChart = d3.pie();

  pieChart.value(d => d.numTweets).sort(null);
  let tweetsPie = pieChart(arrObjUserTweets);

  pieChart.value(d => d.numFavorites).sort(null);
  let favoritesPie = pieChart(arrObjUserTweets);

  pieChart.value(d => d.numRetweets).sort(null);
  let retweetsPie = pieChart(arrObjUserTweets);


  let pieUserTweets = Array.from( {length: arrObjUserTweets.length }, () => ({}));
  arrObjUserTweets.forEach((d, i) => {
    pieUserTweets[i] = {
      user: d.user, 
      tweetsSlice: tweetsPie[i],
      favoritesSlice: favoritesPie[i],
      retweetsSlice: retweetsPie[i]}
  })

  console.log("pieUserTweets", pieUserTweets)

  let newArc = d3.arc()
  newArc.innerRadius(20).outerRadius(100);
  let fillScale = d3.scaleOrdinal()
    .range(["#fcd88a", "#cf7c1c", "#93c464", "#75734f"]);

  d3.select("svg").append("g")
    .attr("transform", "translate(250, 250)")
    .selectAll("path")
    .data(pieUserTweets)
    .join("path")
    .attr("d", d => newArc(d.tweetsSlice))
    // .attr("d", d => newArc(d.favoritesSlice))
    // .attr("d", d => newArc(d.retweetsSlice))
    .style("fill", (d, i) => fillScale(i))
    .style("stroke", "black")
    .style("stroke-width", "2px");

  d3.selectAll("path")
    .transition()
    .delay(1000)
    .duration(1000)
    .attrTween("d", d => arcTween(d, "tweetsSlice", "favoritesSlice"))
    .transition()
    .delay(1000)
    .duration(1000)
    .attrTween("d", d => arcTween(d, "favoritesSlice", "retweetsSlice"));

  function arcTween(d, startSlice, endSlice) {
    return t => {
      let interpolateStartAngle = d3.interpolate(
        d[startSlice].startAngle, d[endSlice].startAngle);
      let interpolateEndAngle = d3.interpolate(
        d[startSlice].endAngle, d[endSlice].endAngle);
        d.startAngle = interpolateStartAngle(t);
        d.endAngle = interpolateEndAngle(t);

        return newArc(d);
    }
  }

}


function errorHandling(err) {
  console.log(err);
}