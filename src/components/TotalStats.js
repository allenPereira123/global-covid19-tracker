import React, { Fragment, useState, useEffect } from 'react';
import{ FaSkullCrossbones } from "react-icons/fa";
import {FaHeart} from "react-icons/fa"
import {FaGlobeAmericas} from "react-icons/fa"


const TotalStats = () => {

    const [totalConfirmed, setTotalConfirmed] = useState(0);
    const [dailyConfirmed, setDailyConfirmed] = useState(0);
    const [totalDeaths, setTotalDeaths] =useState(0);
    const [dailyDeaths, setDailyDeaths] = useState(0);
    const [totalRecovered, setTotalRecovered] = useState(0);
    const [dailyRecovered, setDailyRecovered] = useState(0);
    
    useEffect(() => {
        loadData();
    }, [])



   async function loadData(){
       let url = 'https://disease.sh/v3/covid-19/all';
       let res = await fetch(url);
       let data = await res.json();

       setTotalConfirmed(data.cases);
       setDailyConfirmed(data.todayCases);
       setTotalDeaths(data.deaths);
       setDailyDeaths(data.todayDeaths);
       setTotalRecovered(data.recovered);
       setDailyRecovered(data.todayRecovered);
   }

   return (
       <Fragment>
            <div className='total-cases'>
                <div className="header-img">       
                    <div>Total Cases</div>
                    <FaGlobeAmericas style={{fill: 'gray'}}/>
                </div>
                <div className="stat-container">
                    <div className="stat-count">{totalConfirmed.toLocaleString("en-US")}</div>
                    <div className='weekly-change stat-red'>+{dailyConfirmed.toLocaleString("en-US")} today</div>
                </div>
            </div>
            <div className='total-cases'>
                <div className="header-img">       
                    <div>Recovered Count</div>
                    <FaHeart style={{fill: 'green'}}/>
                </div>
                <div className="stat-container">
                    <div className="stat-count">{totalRecovered.toLocaleString("en-US")}</div>
                    <div className='weekly-change stat-green'>+{dailyRecovered.toLocaleString("en-US")} today</div>
                </div>
            </div>
            
            <div className='total-cases'>
                <div className="header-img">       
                    <div>Death Count</div>
                    <FaSkullCrossbones style={{ fill: 'red' }}/>
                </div>
                <div className="stat-container">
                    <div className="stat-count">{totalDeaths.toLocaleString("en-US")}</div>
                    <div className='weekly-change stat-red'>+{dailyDeaths.toLocaleString("en-US")} today</div>
                </div>
            </div>

        </Fragment>
   )
}

export default TotalStats;