import NavBar from './NavBar';
import axios from "axios";
import React, { useRef, useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement
);


export default function Analytics() {
    // Real data from database
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "Scores",
                data: [],
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    });
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await axios.get('https://quizapp-backend-974768286444.us-central1.run.app/scores');
                const scoresData = response.data;
                console.log(scoresData);
                
                 // Generates an array from the labels of the object that was returned from the API call
                const labelsFromApi = scoresData.map(item => item.date.replace(/\.\d\d+\d[Z]/ , ""));
                
                // Generates an array from the scores of the object that was returned from the API call
                const dataFromApi = scoresData.map(item => item.score);

                setChartData({
                    labels: labelsFromApi,
                    datasets: [
                        {
                            label: "Scores",
                            data: dataFromApi,
                            fill: false,
                            borderColor: "rgb(75, 192, 192)",
                            tension: 0.1,
                        },
                    ],
                });

            } catch (error) {
                console.error("Error fetching scores:", error);
            }
        };

        fetchScores();
    }, []); // Empty dependency array ensures this runs only once after the initial render



    // mock data
    const doughnutData = {
        labels: ['Serverless', 'Kubernetes', 'Security', 'Networking', 'GCE', 'Data Analytics'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
    }


    const doughnutOptions = {
        scales:{
            x:{
                title: {
                    display: true, 
                    text: 'Aptitude', 
                    color: "white"
                }

            }
        }

    }


    return (
        <>
            <NavBar />
            <div className='flex-wrap flex items-center justify-center w-[100vw]'>
            <h2>This is curently just mock data to test the database connections</h2>
            </div>
            <div className='flex-wrap flex items-center justify-center w-[100vw]'>
            <h2>Still have to set up users to be able to track on form submit</h2>
            </div>

            <div className="chart w-[100vw] h-[50vh] flex">
                {chartData.labels.length > 0 && (
                    <Line ref={chartRef}  data={chartData} className='ml-20' />
                )}
                {chartData.labels.length === 0 && (
                    <div>Loading data...</div>
                )}
                    {chartData.labels.length > 0 && (
                    <Doughnut ref={chartRef}  options= {doughnutOptions} data={doughnutData} className='ml-40' />
                )}
                {chartData.labels.length === 0 && (
                    <div>Loading data...</div>
                )}
            </div>
        </>
    );
}