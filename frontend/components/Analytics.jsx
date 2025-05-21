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
    }, []); 



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
            <div className='bg-black h-screen'>
            <div className='flex-wrap flex items-center justify-center w-[100vw] '>
            </div>
            <div className='flex-wrap flex items-center justify-center w-[100vw]'>
            </div>

            <div className="chart w-[100vw] h-[50vh] flex ">
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
                    <div className='flex w-full items-center justify-center'>
                        <div className='container bg-gray-800 w-1/3 h-1/2'>
                        <div className='w-full flex h-10 border-2 border-gray-700'>
                        <li className='text-2xl ml-2 text-green-300'></li>
                        <li className='text-2xl  text-yellow-300'></li>
                        <li className='text-2xl  text-red-300'></li>
                        </div>
                        <div className='flex items-center justify-center text-green-300 mt-10 animate-pulse'>
                        Loading data...
                        </div>
                        </div>
                    </div>
                 )} 
            </div>
            </div>
        </>
    );
}