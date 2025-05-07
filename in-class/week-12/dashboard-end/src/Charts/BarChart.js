import * as d3 from 'd3';
import Card from '../UI/Card.js';
import ChartContainer from '../ChartComponents/ChartContainer.js';
import Axis from '../ChartComponents/Axis.js';
import Rectangle from '../ChartComponents/Rectangle.js';

const BarChart = props => {
  const width = 300;
  const height = 245;
  const marginBottom = 85;
  const innerWidth = width - props.margin.left - props.margin.right;
  const innerHeight = height - props.margin.top - marginBottom;
  const marginBarChart = { top: props.margin.top, right: props.margin.right, 
    bottom: marginBottom, left: props.margin.left }

  const awarenessData = [];
  props.data.forEach(d => {
    const awareness = { id: d.id, name: d.name, 
      awareness_percentage: d.awareness[d.awareness.length-1].percentage_question
    };
    awarenessData.push(awareness);
  });
  awarenessData.sort((a, b) => b.awareness_percentage - a.awareness_percentage);

  const xScale = d3.scaleBand()
    .domain(awarenessData.map(d => d.name))
    .range([0, innerWidth])
    .padding(0.2);
  const yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([innerHeight, 0]);

  return (
    <Card>
      <h2>Awareness</h2>
      <ChartContainer width={width} height={height} margin={marginBarChart}>
      <Axis type="band" scale={xScale} ticks={awarenessData.map(d => d.name)}
        innerWidth={innerWidth} innerHeight={innerHeight}/>
      <Axis type="left" scale={yScale} innerWidth={innerWidth} 
        innerHeight={innerHeight} label="Awareness %"/>
      {awarenessData.map(framework => (
        <Rectangle key={`rectangle-${framework.id}`} 
          x={xScale(framework.name)} y={yScale(framework.awareness_percentage)} 
          width={xScale.bandwidth()} 
          height={innerHeight - yScale(framework.awareness_percentage)}
          fill={props.colorScale(framework.id)}/>
      ))}
      </ChartContainer>
    </Card>
  )
};

export default BarChart;