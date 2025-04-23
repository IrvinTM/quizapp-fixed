import NavBar from "./NavBar"
import axios from "axios"
import {useState, useEffect} from 'react'
import profilePic from '../src/assets/profileImageTest.png'
import { MDBContainer } from "mdb-react-ui-kit"
import backgroundImage from '../src/assets/background.png'
import Footer from "./Footer"

export default function Profile(){
    const [user, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then((data) => setUsers(data));
      }, []);


    const getUsers = () => {
        return axios.get('https://quizapp-backend-662eso3pfa-uc.a.run.app/users').then((response) => {
        return response.data
        }).catch((error) =>{
        console.log(error)
        })
    }

    console.log(user)

    return (
        <>
        <NavBar/>
        {user.length > 0 ? (
        <>
        <div className="flex  mt-10 space-x-8 h-[83vh]">

  <div className="relative h-[300px] w-[600px] overflow-hidden ml-6  rounded-2xl">
  {/* Background image */}
  <div
    className="absolute inset-0 z-0 bg-repeat rounded-2xl"
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: `550px 550px`, // repeated smaller tiles
      backgroundPosition: 'center',
      opacity: 0.5,
    }}
  />

  {/* Foreground content in flex row */}
  <div className="relative z-10 flex items-center h-full px-6">
    {/* Profile image */}
    <img
      className="h-[150px] w-[150px] rounded-full object-cover mr-6"
      alt="Profile"
      src={profilePic}
    />

    {/* Text content to the right of the image */}
    <div className="text-left">
      <p className="text-2xl font-bold mb-2">Julio Armando Quintanilla Acosta</p>
      <h2 className="text-lg font-semibold">Serverless</h2>
      <p className="mt-4 text-md">Last logged in on: {/* Add actual date here if available */}</p>
    </div>
  </div>
</div>

 <div className="w-[200px] p-6 rounded-2xl shadow-md">
    <h3 className="text-xl font-semibold mb-4">Additional Info</h3>
    <p className="text-sm mb-2">Email: julio@example.com</p>
    <p className="text-sm mb-2">Role: Admin</p>
    <p className="text-sm mb-2">Account Created: 2025-04-15</p>
  </div>
  </div>
        <Footer/>

                </>
                ) : (
                    <p>Loading...</p>
                )}
        </>
    )
}
