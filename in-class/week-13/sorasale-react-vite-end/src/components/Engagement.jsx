import * as d3 from 'd3';
import geojson from '../data/geojson.js';
import activeCountries from '../data/activeCountries.js';
import { useRef, useEffect } from 'react';
import { SlidersVertical } from 'lucide-react';
import { Chart } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

const Engagement = (props) => {
  const svgRef = useRef();

  const width = 270;
  const height = 150;

  const projection = d3.geoMercator().fitSize([width, height], geojson).scale(45);
  const geoPathGenerator =d3.geoPath().projection(projection);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const mapGroup = svg.selectAll("path");

    // Set up zoom behavior
    const zoom = d3.zoom().scaleExtent([1, 8])
      .on("zoom", (event) => {
        mapGroup.attr("transform", event.transform);
      });
    
    // Apply zoom to svg
    svg.call(zoom);
  }, [])


  const socialData = {
    labels: ["Facebook", "YouTube", "Google"],
    datasets: [{
      label: "Traffic counts", 
      data: [118, 112, 236],
      backgroundColor: [
        "rgba(59, 130, 246, 0.7)",
        "rgba(141, 110, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)"],
      borderWidth: 0
    }]
  };
  const socialChartOptions = {
    plugins: {
      legend: {
        display: true,
        position: "left",
        reverse: true
      }
    }
  };


  return (
    <>
      <div className="py-2">
        <h1 className="font-bold text-lg mb-2">Sales By Country</h1>
        <div className="w-fit m-auto">
          <svg width={width} height="100%" ref={svgRef}>
            {
              geojson.features.map((geo) => {
                const fillColor = activeCountries.includes(geo.id) 
                  ? "rgba(var(--primary)/11)" : "rgba(209 213 219)/.5)"
                return (
                  <path key={geo.id} d={geoPathGenerator(geo)}
                      stroke="#f5f5f5" strokeWidth={1} 
                      fill={fillColor} fillOpacity={1}
                      className="hover:fill-primary/50 hover:stroke-primary/70" />
                )
              })
            }
          </svg>
        </div>
      </div>
    
      <div className="p-4 bg-secondary rounded-lg">
        <div className="flex justify-between">
          <div>
            <h3 className="font-semibold text-lg">Lead Source</h3> 
            <p className="text-tmuted text-sm">
              Total traffic this month</p> 
            </div>
            <button className="bg-base p-2 rounded-lg">
              <SlidersVertical />
            </button>
        </div>

        <div className="bg-base p-4 rounded-lg mt-8">
          <Doughnut data={socialData} options={socialChartOptions}/>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p>Learn more about traffic</p>
          <a href="#" className="py-2 px-4 bg-primary rounded-lg 
              text-white hover:bg-primary/10 text-sm hover:text-primary 
              inline-block">
            Learn
          </a>
        </div>
      </div>
    </>
  )
}

export default Engagement;