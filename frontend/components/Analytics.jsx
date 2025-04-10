import NavBar from './NavBar';
import axios from "axios";
import React, { useRef, useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
);

export default function Analytics() {
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

    return (
        <>
            <NavBar />
            <div className="chart w-256 h-96 flex">
                {chartData.labels.length > 0 && (
                    <Line ref={chartRef}  data={chartData} className='ml-20' />
                )}
                {chartData.labels.length === 0 && (
                    <div>Loading data...</div>
                )}
                    {chartData.labels.length > 0 && (
                    <Line ref={chartRef}  data={chartData} className='ml-20' />
                )}
                {chartData.labels.length === 0 && (
                    <div>Loading data...</div>
                )}
            </div>
        </>
    );
}