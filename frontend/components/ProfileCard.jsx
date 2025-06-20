

//TODO add the NASA API key in the fetch URL
import { useState, useEffect } from "react";

async function getNasaData() {
  try {
    const response = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=uYJ46jxeIdTFApzvF3uuCjc69G1HyNAYC7uvpmWr"
    );

    if (response.status === 429) {
      console.warn("NASA API rate limit exceeded.");
      let data = {
        hdurl: "https://hips.hearstapps.com/wdy.h-cdn.co/assets/17/39/1600x1066/gallery-1506709524-cola-0247.jpg?resize=1024:*",
        title: "Fallback Image",
        explanation: "NASA API rate limit exceeded, showing fallback image."
      };
      return data;
    }

       if (response.status === 403) {
      console.warn("NASA API rate limit exceeded.");
      let data = {
        hdurl: "https://hips.hearstapps.com/wdy.h-cdn.co/assets/17/39/1600x1066/gallery-1506709524-cola-0247.jpg?resize=1024:*",
        title: "Fallback Image",
        explanation: "NASA API rate limit exceeded, showing fallback image."
      };
      return data;
    }

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return { hdurl: fallbackImage, title: "Fallback Image", explanation: "An error occurred." };
  }
}



    export default function ProfileCard() {
      const [nasaData, setNasaData] = useState(null);

      useEffect(() => {
        getNasaData().then(data => setNasaData(data));
      }, []);

      

      if (!nasaData) return <div>Loading NASA image...</div>;

    const token = localStorage.getItem("accessToken");
    const payload = JSON.parse(atob(token.split('.')[1])); 
    const userId = payload.userId; 
    const username = payload.username; 
    const email = payload.email; 

      return (
            <div className="flex flex-col text-center p-4 h-screen bg-black border-gray-800 border-4 drop-shadow-md rounded-lg">
                <img
                    className="w-[14vw] h-[14vw] rounded-full object-cover"
                    src={nasaData.hdurl}
                    alt="https://hips.hearstapps.com/wdy.h-cdn.co/assets/17/39/1600x1066/gallery-1506709524-cola-0247.jpg?resize=1024:*"
                />
                <h2 className="font-bold text-2xl mt-4">{username}</h2>
                <h3 className="text-lg font-medium text-gray-600 mb-2 mt-2">Cloud Support Engineer</h3>
                <hr/>
                <p className='text-gray-600 text-left self-start mt-5'>User Id</p>
                <p className='text-gray-750 text-left self-start'>{userId}</p>
                <p className='text-gray-600 text-left self-start mt-5'>Email:</p>
                <a className='text-blue-600 text-left self-start '>{email}</a>
                <p className='text-gray-600 text-left self-start mt-5'>Office</p>
                <p className='text-blue-600 text-left self-start'>TELUS Digital El Salvador | Cascadas</p>

            </div>
        );
    }