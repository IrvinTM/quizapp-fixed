
import NavBar from './NavBar'
import axios from "axios";
import React, { useRef, useEffect, useState } from 'react';


import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
   CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend 
);


export default function Analytics(){
    const chartRef = useRef(null);

    const options = {};
    const data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "Dataset 1",
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: true,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    };

    const getScores = () => {
        return axios
          .get('https://quizapp-backend-974768286444.us-central1.run.app/scores')
          .then((response) => {
            const chart = chartRef.current;
            data.datasets[0].data = response.data.map(data => data.score)
            chart.update();
            return response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      getScores()


    return (
        <>
        <NavBar/>
        <div className= "chart w-256 h-96">
        <Line options={options} data={data} />
        </div>
        </>
    )
}