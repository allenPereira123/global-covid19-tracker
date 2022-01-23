import React, { useState, useEffect } from 'react';


const List = () => {

    const [tableData, setTableData] = useState([]);

    useEffect(()=>{
        console.log('lists api');
        setTable();
    }, [])

    async function setTable(){
        //if (!localStorage.getItem("data")) {
            let url = "https://covid-api.mmediagroup.fr/v1/cases";
            let res = await fetch(url);
            let data = await res.json();
            //localStorage.setItem("data", JSON.stringify(data));
       // }

        //const data = JSON.parse(localStorage.getItem('data'));
        let casesPerCountry = [];
        casesPerCountry.push(["Country", "Cases"]);

        for (const country in data) {
            casesPerCountry.push([data[country].All.country, data[country].All.confirmed]);
        }

        casesPerCountry.pop();

        let tempData = makeCopy(casesPerCountry)

        let top10 = [];

        console.log(tempData);
        for (let i = 0; i < 10; i++){
            let max = -1;
            let maxIndex = -1;

            for (let j = 0; j < tempData.length; j++){
                if (tempData[j][1] > max){
                    max = tempData[j][1];
                    maxIndex = j;
                }
            }

            top10.push([tempData[maxIndex][0], tempData[maxIndex][1]]);
            tempData[maxIndex][1] = -1;
        }
        setTableData(top10);

    }

    function makeCopy(casesPerCountry){
        let array = [];
        for (let i = 0; i < casesPerCountry.length; i++){
            array.push([casesPerCountry[i][0], casesPerCountry[i][1]]);
        }

        return array;
    }

        
        return (  
        <div className="upper">
            <div className="headers">
                <div>Country</div>
                <div>Cases</div>
            </div>
            <table className="table">
              <tbody>
                {tableData.map((element,index) => <tr key={index} className="table-row"><td className="table-data">{element[0]}</td><td className="table-data">{element[1].toLocaleString("en-US")}</td></tr>)}
                       
              </tbody>
            </table>
        
       </div>
    )

}


export default List;