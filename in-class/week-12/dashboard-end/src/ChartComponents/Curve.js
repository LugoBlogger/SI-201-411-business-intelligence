import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const Curve = props => {
  // console.log("props", props)
  // console.log("props.xScale", props.xScale)
  // console.log("props.yScale", props.yScale)
  // console.log("props.xAccessor", props.xAccessor)
  // console.log("props.yAccessor", props.yAccessor)
  // console.log("props.data", props.data)
  // console.log("props.data[0]", props.data[0]);

  // const idx = 0;
  // console.log(`props.data[${idx}][props.xAccessor]`, props.data[idx][props.xAccessor]);
  // console.log(`props.data[${idx}][props.yAccessor]`, props.data[idx][props.yAccessor]);
  // console.log(`props.xScale(props.data[${idx}][props.xAccessor])`, 
  //   props.xScale(props.data[idx][props.xAccessor]))
  // console.log(`props.yScale(props.data[${idx}][props.yAccessor])`, 
  //   props.yScale(props.data[idx][props.yAccessor]))

  const lineGenerator = d3.line()
    .defined(d => d[props.yAccessor] !== null)
    .x(d => props.xScale(d[props.xAccessor]))
    .y(d => props.yScale(d[props.yAccessor]))
    .curve(d3.curveMonotoneX);

  // console.log("lineGenerator", lineGenerator([
  //   {"year": 2018, "rank": 0}, {"year": 2019, "rank": 3}]))
  // console.log(props.data.map(d => d[props.yAccessor] !== null))
  // console.log("lineGenerator", lineGenerator);
  // console.log("lineGenerator(props.data)", lineGenerator(props.data));

  const pathRef = useRef();
  useEffect(() => {
    const path = pathRef.current;
    d3.select(path)
      .transition()
      .duration(400)
      .ease(d3.easeCubicOut)
      .attr("d", lineGenerator(props.data))
  }, [props.data, lineGenerator])

  // return (<path d={lineGenerator(props.data)} fill="none" stroke={props.stroke}
  //   strokeWidth={props.strokeWidth}/>);
  return (<path ref={pathRef} fill="none" stroke={props.stroke}
    strokeWidth={props.strokeWidth}/>);

};

export default Curve;