import { useState, useEffect } from 'react';
import * as d3 from 'd3';
import Charts from './Charts/Charts.js';


const App = () => {
  const [loading, setLoading] = useState(true);
  
  // Declare a state variable named data, and set its initial value to an 
  // empty array
  const [data, setData] = useState([]);

  useEffect(() => {
    const dataURL = location.origin + "/datasets/front_end_frameworks.json";
    // const dataURL = "https://d3js-in-action-third-edition.github.io/hosted-data/apis/front_end_frameworks.json";
    d3.json(dataURL).then(data => {
      setData(data);
      setLoading(false);
    });

  }, []);  // Pass an empty array as the second argument of useEffect().
           // This will ensure that the function runs only once--after 
           // the component is mounted


  return (
    <div className="container">
      {loading && <div className="loading">Loading...</div>}
      {!loading && <Charts data={data}/>}
    </div>
  );
};

export default App;