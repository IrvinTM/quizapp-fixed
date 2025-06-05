import express from "express";
import { addScore, getData as data , getQuestions, getUsers, getScores, getReducedData, getRandomData} from "./functions/database.js";
import bcrypt from 'bcrypt';
import { addUser } from './functions/database.js';
import { findSingleUser } from './functions/database.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json())


app.get("/", async (req, res) => { 
    const questions = await data();
    res.send(questions);
 });

 app.get("/limit/:limit", async (req, res) => { 
  const limit = req.params.limit;
  const questions = await getReducedData(limit);
  res.send(questions);
});

app.get("/randomized/:randomized", async (req, res) => { 
  const randomized = req.params.randomized;
  console.log(randomized)
  const questions = await getRandomData(randomized);
  res.send(questions);
});


 app.get("/questions/:contains", async (req, res) => {
    const contains = req.params.contains;
    const questions = await getQuestions(`%${contains}%`);
    console.log(contains)
    res.send(questions);
 });  
 
 app.get("/users" , async(req, res)=>{
   const users = await getUsers();
   res.send(users);
 })
 

 app.get("/scores" , async(req, res)=>{
  const users = await getScores();
  res.send(users);
})


 app.post("/scores" , async(req, res)=>{
   const {quantity, answers} = req.body;
   const addscore = await addScore(quantity,answers);
   res.status(201).send(addscore);
 })


 app.post("/signup" , async (req, res)=>{
  const {username, name, email, password} = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await addUser(username,name, email, hashedPassword);
  res.status(201).send(user);
})


app.post("/login" , async (req, res)=>{
   const {username, password} = req.body;
   const hashedPassword = await bcrypt.hash(password, 10);
   const user = await findSingleUser(username);
   if(!user || user.length === 0){
     return res.status(404).send("User not found");
   }else{
       const isPasswordValid = await bcrypt.compare(password, user[0].password);
       if(isPasswordValid){
        // TO DO PAYLOAD
        const accessToken = jwt.sign({username: "username", name: "name", email: "email", password: "password"} , process.env.ACCESS_TOKEN_SECRET)
           return res.status(200).json({accessToken: accessToken});
       }else{
           return res.status(401).send("Invalid password");
       }
   }   
 })


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log("Server is running on port 8080");
    }); 