import Chart from "react-google-charts";
import React, { useState, useEffect } from "react";
import TotalStats from './TotalStats'
import CountryList from './CountryList'
import List from './List'
import LineGraph from './LineGraph'

let width = window.innerWidth * 0.9;
let height = window.innerHeight * 0.9;
width = window.innerWidth * 0.5;
height = window.innerHeight * 0.7;

width = width + "px";
height = height + "px";


const HomePage = () => {

    const [chartData, setChartData] = useState([])
  
    

    const [isLoading, setLoading] = useState(true);

    useEffect( () => {
        loadData();    
    }, [])

    async function loadData(){

        let url = "https://covid-api.mmediagroup.fr/v1/history?status=confirmed";
        let res = await fetch(url);
        let data = await res.json();

        let array = [];
        array.push(["Country", "30-Day Cases"]);

        for (const country in data) {
         const recentCases = Object.entries(data[country].All.dates).slice(0,30);
        
         let sum = 0;

        for (let i = 0; i < 29; i++){
            let totalCases = recentCases[i][1];
            let dayBeforeCases = recentCases[i+1][1];
            let currentDayCases = totalCases - dayBeforeCases;
            sum += currentDayCases;
        }

        array.push([country, sum]);
      }
      array.pop();
      setLoading(false);
      setChartData(array);
    }

    if (isLoading) {
        return (
        <div>
            <div className="covid-total">
                <h1>Global Covid-19 Count</h1>
            </div>
            <div className="map">Loading...</div>
        </div>
        );
    }
    
    return (
        <div className="outer-container">
            <h1 className="title">Global Covid-19 Tracker</h1>
            <div className="container">
                <CountryList/>
                <div className="middle">
                <div className="total-recovered">
                    <TotalStats/>
                </div>
                <div className="map">
                    <Chart
                    width={width}
                    height={height}
                    chartType="GeoChart"
                    data={chartData}

                    options={{
                        colorAxis: { colors: ["rgb(241, 223, 225)", "rgb(139,0,0)"] },
                        backgroundColor: "rgb(30, 30, 30)",
                    }}
                    mapsApiKey=""
                    rootProps={{ "data-testid": "1" }}
                    />
                </div>
                </div>
                <div className="right">
                  <List/>
                  <LineGraph/>
                </div>
            </div>
        </div>
    );
   
}





export default HomePage