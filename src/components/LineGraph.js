import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import {Line} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineGraph = () => {

    const [xAxis, setXAxis] = useState([]);
    const [yAxis, setYAxis] = useState([]);
    
    const lineGraphData = {
         labels : xAxis,
         datasets:[
            {
                label : "Cases per day",
                data: yAxis,
                fill:true,
                backgroundColor:"rgba(255,0,0,.2)",
                borderColor:"rgba(255,0,0,1)"
            }
        ]
    };



    useEffect(() => {
        console.log('linegraph api')
        setUpChart();
    }, []);


    async function setUpChart(){
     //if (!localStorage.getItem('confirmed-cases')){ 
        let url = "https://covid-api.mmediagroup.fr/v1/history?status=confirmed"
        let res = await fetch(url);
        let data = await res.json();
        //localStorage.setItem('confirmed-cases', JSON.stringify(data))
    //}
        //const data = JSON.parse(localStorage.getItem('confirmed-cases'));
        let countries = [];

        for (const country in data) {
            countries.push(data[country].All.country);
        }

        console.log(countries);

        countries = countries.filter((country) => country !== undefined);
        let weeklyCasesByCountry = [];

        for (let i = 0; i < countries.length; i++){
            weeklyCasesByCountry.push([countries[i], Object.entries(data[countries[i]].All.dates).slice(0,10)]);
        }

        let days = [];
        let cases = [];
        let dailyCases = 0;
        
            for (let i = 0; i < 7; i++){
                dailyCases = 0;
                for (let j = 0; j < weeklyCasesByCountry.length; j++){
                    dailyCases += weeklyCasesByCountry[j][1][i][1] - weeklyCasesByCountry[j][1][i+1][1];
                }

                cases.unshift(dailyCases);
                days.unshift(weeklyCasesByCountry[0][1][i][0])

            }

        
            setXAxis(days);
            setYAxis(cases);
    }

    

    return (
         <div className="line-graph">
                <div className="chart-title">7-Day Cases</div>
                <div className="chart-wrapper">
                    <Line className="graph" data={lineGraphData} options={{ maintainAspectRatio: false }}/>
                </div>
        </div>
    )
}


export default LineGraph