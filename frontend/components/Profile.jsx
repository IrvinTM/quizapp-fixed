import NavBar from "./NavBar"
import axios from "axios"



export default function Profile(){
 

    const getUsers = () => {
        return axios.get('https://quizapp-backend-662eso3pfa-uc.a.run.app/users').then((response) => {
        console.log(response.data)
        }).catch((error) =>{
        console.log(error)
        })
    }

    getUsers()
    

    return (
        <>
        <NavBar/>
        
        </>
    )
}