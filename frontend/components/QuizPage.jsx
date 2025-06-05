import NavBar from "./NavBar"
import { useNavigate } from 'react-router-dom';

import { MDBContainer, MDBRadio, MDBRow,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,} from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import axios from 'axios';


let indexesOfIncorrect = []


export default function QuizPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [basicModal, setBasicModal] = useState(false);
    const [answers, setAnswers] = useState({});
    const [questions, setQuestions] = useState([]);
    const [formData, setFormData] = useState({ quantity: '', answers: '' }); // State to hold form data
    const [storeQuestions, setStoreQuestions] = useState([]);
    const [showAnswers, setShowAnswers] = useState(false);
    const [showButton, setShowbutton] = useState(true);
    const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
    let [correctAnswers, setCorrectAnswers] = useState(0)

    const loadingMessages = [
      "Loading Questions...",
      "Fetching the Latest Quiz Questions...",
      "Building Your Exam...",
      "Jeez this is taking longer than expected huh...",
      "Maybe Julio wrote some buggy code like always...",
      "Reading Packages lists...done",

    ];


    const toggleOpen = () => setBasicModal(!basicModal);

    const reviewExam = () => {
      setShowAnswers(true);
      setShowbutton(false)
      setBasicModal(!basicModal);
    } 


    useEffect(() => {
      setLoading(true);
    
        getQuestions().then((data) => setQuestions(data)).finally(()=> setLoading(false));

    }, []);


    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
    
    const handleAnswerChange = (questionIndex, q_id, selectedOption) => {
      setAnswers(prevAnswers => ({
        ...prevAnswers,
        [questionIndex]: { q_id, answer: selectedOption }
      }));
    };
    
    const returnHomePage = () => {
      navigate('/');

    }
    
    const resetPage = () => {
      window.location.reload();
    }

    const submit = async (e) => {
      e.preventDefault();

      if( formData.answers === "true" && parseInt(formData.quantity) >= 1 ){
        try {
           return await axios.get(`https://quizapp-backend-974768286444.us-central1.run.app/randomized/${parseInt(formData.quantity)}`).then((randomized) => {
            let answers = randomized.data.map((values) => ({
              q_id: values.q_id,
              answers: values.answer
            }));; // Extract the question IDs from the randomized data
            setStoreQuestions(answers)
            console.log(answers)
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




    const send = async () => {
      let regex = /:\s(\w)/
      let count = 0
      try {
        for(let i = 0; i <= storeQuestions.length-1; i++){
            if(storeQuestions[i].q_id === answers[i].q_id && storeQuestions[i].answers.match(regex)[1] === answers[i].answer){
              count++
            }else{
              indexesOfIncorrect.push(i)
            }
          }
          console.log(indexesOfIncorrect)

          setCorrectAnswers(count)
          toggleOpen();
        }
       catch (error) {
          console.error("Error getting data:", error);
          if (error.response) {
              console.error('Server responded with:', error.response.data);
          }
      }
    };

    const getQuestions = () => {
      return axios
        .get('https://quizapp-backend-974768286444.us-central1.run.app/limit/25')
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    return (
      <>
    < NavBar/>
    { loading ? (
       <div className='flex w-full h-screen items-center justify-center'>
       <div className='container bg-gray-800 w-1/3 h-1/2'>
       <div className='w-full flex h-10 border-2 border-gray-700'>
       <li className='text-2xl ml-2 text-green-300'></li>
       <li className='text-2xl  text-yellow-300'></li>
       <li className='text-2xl  text-red-300'></li>
       </div>
       <div className='flex items-center justify-center text-green-300 mt-10 animate-pulse'>
       {loadingMessages[loadingMessageIndex-1]}       

       </div>
       <div className='flex items-center justify-center text-green-300 mt-10 animate-pulse'>
       {loadingMessages[loadingMessageIndex]}       
       </div>
       <div className='flex items-center justify-center text-green-300 mt-10 animate-pulse'>
   
       {loadingMessages[loadingMessageIndex+1]}       
 
       </div>
       </div>
    </div>
    ) : (
     <div className="bg-black screen full">
      <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex='-1' staticBackdrop >
          <MDBModalDialog centered className="fixed left-0 top-0 bg-white bg-opacity-50 w-screen h-screen">
            <MDBModalContent className="flex flex-col items-center justify-center h-screen">
              <MDBModalHeader>
                <MDBModalTitle className="bg-black flex items-center justify-center text-2xl h-10 w-30 border-2 px-2 py-2 rounded-2xl">Scorecard</MDBModalTitle>
                </MDBModalHeader>
                <MDBModalBody className="flex flex-col items-center justify-center">
                <h2 className="text-black text-3xl mt-10 mb-10 border-3 px-2 py-2 rounded-2xl">Correct Answers: {correctAnswers} / Total Questions: {storeQuestions.length}  = {(correctAnswers/ storeQuestions.length) * 100 } % </h2>
                { (correctAnswers/ storeQuestions.length) * 100  >= 80 ? <h2 className="text-black text-3xl mt-10 mb-10 border-3 px-2 py-2 rounded-2xl">You Passed!</h2> :
                 <>
                 <h2 className="text-black text-3xl mt-10 mb-10 border-3 px-2 py-2 rounded-2xl">You Failed!</h2> 
                </> }
               </MDBModalBody>
                <MDBModalFooter>
                <MDBBtn color='secondary' onClick={returnHomePage}>
                Return to Main Page
                </MDBBtn>
                <MDBBtn className="ml-10" onClick={reviewExam}>
                  Review Exam
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
      </MDBModal>
  

         <form onSubmit={submit} className="  flex items-center justify-center "> 
          <label className="ml-4 mt-2">
            Reduce / Increase Questions To:
            <input
              type="number"
              name="quantity"
              min = "0"
              value={formData.quantity} 
              onChange={handleInputChange} 
              className=" ml-2 border-2 w-[5vw] rounded-md items-center text-center"
            />
           </label>
           <label className="ml-4 mt-2">
            Randomize Questions:
            <select value={formData.answers} name="answers" onChange={handleInputChange} className="ml-2 w-[5vw] border-2 border-white text-white bg-gray rounded-md items-center text-center">
            <option value="false"></option>
             <option value="true" className="text-black">Yes</option >
            </select>
            </label>
          <button type="submit" className="ml-4 bg-blue mt-4 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Generate</button> 
          <button type="submit" className="ml-4 bg-blue mt-4 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={resetPage}>New Exam</button> 
        </form>
  
  <div className="flex items-center justify-center w-[100vw]">
        <MDBContainer className="mt-2 ">
          <MDBRow className="justify-content-center border-solid">
            <form action="POST">
              {questions.map((question, index) => (
                <div key={index} className="border border-primary p-3 m-3">
                  <p className="mb-4">{question.questions}</p>
                  <MDBRadio
                    name={`flexRadioDefault-${index}`}
                    id={`flexRadioDefault1-${index}`}
                    label={question.opt_a}
                    className='mb-2 mt-2 ml-2 mr-2'
                    onChange={() => handleAnswerChange(index, question.q_id ,'A')}
                  />
                  <MDBRadio
                    name={`flexRadioDefault-${index}`}
                    id={`flexRadioDefault2-${index}`}
                    label={question.opt_b}
                     className='mb-4 mt-4 ml-2 mr-2'
                    onChange={() => handleAnswerChange(index, question.q_id ,'B')}
                  />
                  <MDBRadio
                    name={`flexRadioDefault-${index}`}
                    id={`flexRadioDefault3-${index}`}
                    label={question.opt_c}
                    className='mb-4 mt-2 ml-2 mr-2'
                    onChange={() => handleAnswerChange(index, question.q_id ,'C')}
                  />
                  <MDBRadio
                    name={`flexRadioDefault-${index}`}
                    id={`flexRadioDefault4-${index}`}
                    label={question.opt_d}
                    className='mb-2 mt-2 ml-2 mr-2'
                    onChange={() => handleAnswerChange(index, question.q_id ,'D')}
                  />
                
                {showAnswers && (
                <h2
                  className={`px-2 py-2 mt-2 mb-2 border-2 rounded-md w-fit ${
                    indexesOfIncorrect.includes(index)
                      ? 'border-red-500 text-red-300'
                      : 'border-green-500 text-green-300'
                  }`}
                >
                  Correct Answer: {storeQuestions[index]?.answers}
                </h2>
                )}

                </div>  
              ))}   
            </form>
          </MDBRow>
          {showButton && <input type="submit" value="Submit" className=" position:relative ml-2 mb-2 bg-blue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center border-2 w-[10vw] h-[5vh]" onClick={send} /> }
        </MDBContainer>
        </div>
        </div>
    )}
      </>
    );
  
}


