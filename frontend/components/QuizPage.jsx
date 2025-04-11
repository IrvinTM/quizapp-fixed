import NavBar from "./NavBar"
import { MDBContainer, MDBRadio, MDBRow } from 'mdb-react-ui-kit';
import { useEffect, useState, ReactNode } from 'react';
import axios from 'axios';

export default function QuizPage() {


    const [questions, setQuestions] = useState([]);
    const [formData, setFormData] = useState({ quantity: '', answers: '' }); // State to hold form data
  
    useEffect(() => {
      getQuestions().then((data) => setQuestions(data));
    }, []);


    const handleInputChange = (event) => {
      // Update form data as input changes
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
  

    const submit = async (e) => {
      // Add conditionals based on form inputs
      e.preventDefault();
      if( formData.answers === "true" && parseInt(formData.quantity) >= 1 ){
        try {
          console.log(parseInt(formData.quantity))
           return await axios.get(`https://quizapp-backend-974768286444.us-central1.run.app/randomized/${parseInt(formData.quantity)}`).then((randomized) => {

            console.log("Data retrieved successfully", randomized.data); 
    
            setQuestions(randomized.data); // Update the questions state with the new data
  
        })
        } catch (error) {
            console.error("Error getting data:", error);
            if (error.response) {
                console.error('Server responded with:', error.response.data);
            }
        }
      }
      try {
        console.log(parseInt(formData.quantity))
         return await axios.get(`https://quizapp-backend-974768286444.us-central1.run.app/limit/${parseInt(formData.quantity)}`).then((response) => {
          console.log("Data retrieved successfully", response.data); 
          setQuestions(response.data); // Update the questions state with the new data

      })
      } catch (error) {
          console.error("Error getting data:", error);
          if (error.response) {
              console.error('Server responded with:', error.response.data);
          }
      }
    };


    const getQuestions = () => {
      return axios
        .get('https://acostajulio-dev.wl.r.appspot.com')
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            let test  = response.data[i].q_id
            // first extraction
            console.log(test)
            // console.log(test.match(/\:\s([A-Z])/g).join("").match(/[A-Z]/g))
          }
          
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    };
  

  
    return (
      <>
      < NavBar/>
         <form onSubmit={submit} className="mt-2"> 
          <label className="ml-4">
            Reduce Questions To:
            <input
              type="number"
              name="quantity"
              value={formData.quantity} 
              onChange={handleInputChange} 
              className=" ml-2 border-2 w-[5vw] rounded-md items-center text-center"
            />
           </label>
           <label className="ml-4">
            Randomize Questions:
            <select value={formData.answers} name="answers" onChange={handleInputChange} className="ml-2 w-[5vw] border-2 border-white text-white bg-gray rounded-md items-center text-center">
            <option value="false"></option>
             <option value="true" className="text-black" >Yes</option >
            </select>
            </label>
          <button type="submit" className="ml-4 text-white bg-blue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Generate</button> 
        </form>
  
  
        <MDBContainer>
          <MDBRow className="justify-content-center border-solid">
            <form action="POST">
              {questions.map((question, index) => (
                <div key={index} className="border border-primary p-3 m-3">
                  <p>{question.questions}</p>
                  <MDBRadio
                    name={`flexRadioDefault-${index}`}
                    id={`flexRadioDefault1-${index}`}
                    label={question.opt_a}
                    className='mb-2 mt-2 ml-2 mr-2'
                  />
                  <MDBRadio
                    name={`flexRadioDefault-${index}`}
                    id={`flexRadioDefault2-${index}`}
                    label={question.opt_b}
                    className='mb-2 mt-2 ml-2 mr-2'
                  />
                  <MDBRadio
                    name={`flexRadioDefault-${index}`}
                    id={`flexRadioDefault3-${index}`}
                    label={question.opt_c}
                    className='mb-2 mt-2 ml-2 mr-2'
                  />
                  <MDBRadio
                    name={`flexRadioDefault-${index}`}
                    id={`flexRadioDefault4-${index}`}
                    label={question.opt_d}
                    className='mb-2 mt-2 ml-2 mr-2'
                  />
                </div>
              ))}
            </form>
          </MDBRow>
  
          <input type="submit" value="submit" className="btn btn-primary" onClick={submit} />
        </MDBContainer>
      </>
    );
  
}

