import { useState, Fragment } from 'react';

import RankingFilters from '../Interactions/RankingFilters.js';
import Card from '../UI/Card.js';
import ChartContainer from '../ChartComponents/ChartContainer.js'; 

import * as d3 from 'd3';
import Curve from "../ChartComponents/Curve.js";
import Label from "../ChartComponents/Label.js";

import Badge from "../UI/Badge.js"

const rankingFilters = [
  { id: "satisfaction", label: "Satisfaction" },
  { id: "interest", label: "Interest" },
  { id: "usage", label: "Usage" },
  { id: "awareness", label: "Awareness" },
];

const Rankings = props => {
  const [activeFilter, setActiveFilter] = useState("satisfaction");
  
  const width = 1000;
  const height = 542;
  const marginRight = 150;
  const marginLeft = 110;
  const innerWidth = width - marginLeft - marginRight;
  const innerHeight = height - props.margin.top - props.margin.bottom;
  const marginRankings = { top: props.margin.top, right: marginRight, 
    bottom: props.margin.bottom, left: marginLeft };

  // console.log(props.data.years)
  // console.log("innerWidth", innerWidth);
  const xScale = d3.scalePoint()
    .domain(props.data.years)
    .range([0, innerWidth]);
  const yScale = d3.scalePoint() 
    .domain(d3.range(1, props.data.ids.length + 1))
    .range([0, innerHeight]);
    
  // console.log(d3.range(1, props.data.ids.length + 1))
  // console.log(props.data.experience.map(d => d[activeFilter]))

  const filterSelectionHandler = (id) => {
    if (activeFilter !== id) {
      setActiveFilter(id);
    }
  };

  return (
    <Card>
      <h2>Rankings</h2>
      <RankingFilters
        filters={rankingFilters}
        activeFilter={activeFilter}
        onFilterSelection={filterSelectionHandler}
      />
      <ChartContainer width={width} height={height} margin={marginRankings}>
        {/* Adding grid and labels */}
        {props.data.years.map(year => (
          <g key={`line-year-${year}`} className="axis" 
            transform={`translate(${xScale(year)}, 0)`}>
            <line x1={0} y1={innerHeight+ 30} x2={0} y2={0} strokeDasharray="6 4"/>
            <text x={0} y={innerHeight + 50} textAnchor="middle">
              {year}
            </text>
          </g>
        ))} 
        {/* Display the rank curve */}
        {props.data.experience.map((framework, i) => {
          const selectedData = framework[activeFilter];
          // console.log("selectedData", selectedData);
          return (
          <g key={`curve-${framework.id}`}>
            <Curve data={selectedData} xScale={xScale} 
              yScale={yScale} xAccessor="year" yAccessor="rank" 
              stroke={props.colorScale(framework.id)} strokeWidth={5} />
            {selectedData[0].rank &&
              <Label x={-25} y={yScale(selectedData[0].rank)}
                color={props.colorScale(framework.id)} label={framework.name}
                textAnchor="end"/>
            }
            <Label x={innerWidth + 25} 
              y={yScale(selectedData[selectedData.length - 1].rank)}
              color={props.colorScale(framework.id)} label={framework.name}
              textAnchor="start"/>
            {selectedData.map((selection, i) => (
              <Fragment key={`${framework.id}-selection-${i}`}>
                {selection.rank &&
                  <Badge 
                    translation={[xScale(selection.year), yScale(selection.rank)]}
                    strokeColor={props.colorScale(framework.id)}
                    label={`${Math.round(selection.percentage_question)}%`}/>}
              </Fragment>
            ))}
          </g>
        )})}
      </ChartContainer>
    </Card>
  )
};

export default Rankings;