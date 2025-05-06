import Circle from "../ChartComponents/Circle.js"

const Badge = props => {
  return (
    <g className="label"
      style={{ transform: `translate(${props.translation[0]}px, ${props.translation[1]}px)` }}>
      <Circle cx={0} cy={0} r={18} fill="#fff" stroke={props.strokeColor}
        strokeWidth={3}/>
      <text textAnchor="middle" alignmentBaseline="middle" fill="#374f53"
        style={{ fontSize: "12px", fontWeight: "bold" }}>
        {props.label}
      </text>
    </g>
  );
};

export default Badge;