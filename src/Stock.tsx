import { FunctionComponent, useEffect, useState } from "react";
import Plot from 'react-plotly.js';
import Select, { SingleValue } from 'react-select'

const Stock: FunctionComponent = () => {
    let [xChartValues, setXChartValues] = useState(['']);
    const [yChartOpenValues, setYChartOpenValues] = useState(['']);
    const [yChartCloseValues, setYChartCloseValues] = useState(['']);
    const [company, setCompany] =useState({ value: 'IBM', label: 'IBM' });
 
    const options = [
         { value: 'IBM', label: 'IBM' },
         { value: 'FACEBOOK', label: 'Facebook' },
         { value: 'BSE:50785', label: 'WIPRO' }
       ]

    useEffect(() => {
        fetchStockData();
    },[company]);

    function fetchStockData() {
        console.log("====fetchData calledm====company "+`${company}`);
        let xValues: string[]=[];
        let yValuesOpen: string[]=[];
        let yValuesClose: string[]=[];
        const API_KEY='P2BP0GVO1LQAPSF2';//demo test key
        // const API_KEY='demo';//demo test key 
        const interval = `5min`;
        let API_Call=`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${company}&interval=${interval}&apikey=${API_KEY}`
        fetch(API_Call)
        .then(
            function(response){
                return response.json();
            } 
        )
        .then(
            function(data){
              console.log(data)
                for(var key in data['Time Series (5min)']){
                    xValues.push(key);
                    yValuesOpen.push(data['Time Series (5min)'][key]['1. open']);
                    yValuesClose.push(data['Time Series (5min)'][key]['4. close']);
                }
                setXChartValues(xValues);
                setYChartOpenValues(yValuesOpen);
                setYChartCloseValues(yValuesClose);

            }
        )
    }
        
  
  function handleAddrTypeChange(e:any): void {
    console.log("ccc "+e.value)
    setCompany(e.value);
  }
 
    return (
        <div>
           <Select
              placeholder="Select company"
              options={options}
              onChange={e => handleAddrTypeChange(e)}
      />
         <Plot
        data={[
          {
            x: xChartValues,
            y: yChartOpenValues,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
            name: 'Time'
          }
        ]}
        layout={ {width: 720, height: 440, title: 'Intraday stock 5min data[open]'} }
      />
        <Plot
              data={[
                {
                  x: xChartValues,
                  y: yChartCloseValues,
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: {color: 'red'},
                  name: 'Time'
                }
              ]}
              layout={ {width: 720, height: 440, title: 'Intraday stock 5min data[close]'} }
            />
        </div>
    )
    
}
export default Stock;

