import NavBar from "./NavBar";
import React from 'react';
import { useEffect, useState } from 'react';
import axios from "axios";

export default function Questions(){
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        getQuestions().then((data) => setQuestions(data));
      }, []);
  
    const getQuestions = () => {
        return axios
          .get('https://quizapp-backend-974768286444.us-central1.run.app/limit/253')
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }


    return(
        <>
        <NavBar/>
        {questions.map((question, index) => (
          <div key={index} className="border border-primary p-3 m-3 mt-2">
          <p className="mt-2 mb-2 px-2 py-2">{question.questions}</p>
          <p className="mt-2 mb-2 px-2 py-2">{question.opt_a}</p>
          <p className="mt-2 mb-2 px-2 py-2">{question.opt_b}</p>
          <p className="mt-2 mb-2 px-2 py-2">{question.opt_c}</p>
          <p className="mt-2 mb-2 px-2 py-2">{question.opt_d}</p>
          <p className="mt-2 mb-2 px-2 py-2 border-2 border-green-300 ">{question.answer}</p>
          </div>
        ))}

        </>
    );
}