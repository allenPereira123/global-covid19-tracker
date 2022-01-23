import React, { Fragment, useState, useEffect } from 'react';

const CountryList = () => {
    
    const [countryStats, setCountryStats] = useState([])

        useEffect(async () => {
                let url = "https://covid-api.mmediagroup.fr/v1/cases";
                let res = await fetch(url);
                let data = await res.json();

                let vaccineUrl = "https://covid-api.mmediagroup.fr/v1/vaccines";
                let vaccineRes = await fetch(vaccineUrl);
                let vaccineData = await vaccineRes.json();

            setCountryStats(populateArray(data,vaccineData))
        }, [])
    
    

    function populateArray(data, vaccineData){

        let countries = [];

        for (const country in data){
            const currentCountry = data[country];
            const currentCountryVaccine = vaccineData[country];

            if (!currentCountryVaccine){
                continue;
            }
            let obj = {
                name: country,
                confirmed: currentCountry.All.confirmed,
                deaths: currentCountry.All.deaths,
                vaccinations: currentCountryVaccine.All.people_vaccinated
            }

            countries.push(obj)
        }

        countries.pop();
        return countries;
    }

        

    return (
        <div className="left">
            <div className='header'>Statistics By Country</div>
            <div className="country-list-body">

                {countryStats.map((element,index) => {
                    return (
                        <div key={index} className='country-stats'>
                            <div>{element.name}</div>
                            <div>Cases: {element.confirmed.toLocaleString("en-US")}</div>
                            <div>Deaths:{element.deaths.toLocaleString("en-US")}</div>
                            <div>People Vaccinated: {element.vaccinations.toLocaleString("en-US")}</div>
                        </div>
                    )
                })}
                
            </div>
        </div>
    )
}


export default CountryList;