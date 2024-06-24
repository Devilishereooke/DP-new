import React from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
//   import faker from 'faker';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );



const HomeMain = ({data}) => {
    const [isData, setIsData] = React.useState(false);
    const [showHist, setShowHist] = React.useState(false);
    const [dataArr, setDataArr] = React.useState(data.readings);

    console.log(showHist);
    React.useEffect(()=>{
        if(dataArr.length > 0) setIsData(true);
    }, [])

    function getDayWithSuffix(day) {
        if (day > 3 && day < 21) return `${day}th`;
        switch (day % 10) {
            case 1: return `${day}st`;
            case 2: return `${day}nd`;
            case 3: return `${day}rd`;
            default: return `${day}th`;
        }
    }
    
    function getMonthName(monthIndex) {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return monthNames[monthIndex];
    }

    function formatDateString(dateString) {
        const date = new Date(dateString);
        
        const day = getDayWithSuffix(date.getDate());
        const month = getMonthName(date.getMonth());
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
    
        return ` ${hours}:${minutes} ${day} ${month}`;
    }

    const getLabels = () => {
        const labels = dataArr?.map((obj) => formatDateString(obj.date));
        return labels;
    }

    const getVals = () => {
        const vals = dataArr.map(obj => obj.value);
        return vals
    }
    
    const sugarLevelsData = {
        labels: !showHist ? getLabels().slice(0,5) : getLabels(),
        datasets: [
            {
                label: 'BGL',
                data: getVals(), // Example sugar levels data
                fill: true,
                backgroundColor :['#9e5533','rgb(197,158,140)', 'rgb(197,158,140)', 'rgb(197,158,140)', 'rgb(197,158,140)', 'rgb(197,158,140)', 'rgb(197,158,140)','rgb(197,158,140)'],
                borderColor: '#f5f5f5',
                borderRadius : 10,
                tension: 0.2
            }
        ]
    };

    const options = {
        scales: {
          x: {
            display: true, 
            grid: {
              display: false 
            }
          },
          y: {
            display: true,
            grid: {
              display: false
            },
            ticks: {
                stepSize: 20
              }
          }
        },
        plugins: {
            legend: {
              display: false 
            }
        },
        barPercentage: 0.8, 
        categoryPercentage: 0.9, 
        maintainAspectRatio: false, 
        responsive: true
    };

    const handleShowHistory = () => {

        setShowHist(prev => !prev)
    }

    return (
        <section className="main-container">
            <div className="welcome">
                Welcome ,
            </div>
            <div className="question">
                Did you get your Gluco-sensed today ?
            </div>
            {!showHist &&
            <div className="latest--container">
                <div className="latest--title">
                    {isData ? 'Latest Record' : 'No record Found'}
                </div>
                <div className="latest--reading--box">
                    <span className="num--reading">{(dataArr.length > 0) ? dataArr[0].value : 'X'}</span>
                    <span className="reading--unit">mg/dl</span>
                </div>
            </div>
            }
            <div className={`history--graph--container ${showHist ? 'expanded-width' : 'normal-width'}`}>
                <div className="graph--top">
                    <div className="graph--title">
                        BGL Statistics
                    </div>
                    {isData ?
                        <button className="full--history" onClick={handleShowHistory}>
                            {!showHist ? 'Check Full History' : 'Back'}
                        </button> :
                        <div className="no--history">
                            No Readings Found
                        </div>
                    }
                </div>
                <div className="graph">
                {isData ? 
                        <Bar options={options} data={sugarLevelsData} />
                        : 'No Data Found'
                    }
                </div>
            </div>
        </section>
    )
};

export default HomeMain;
