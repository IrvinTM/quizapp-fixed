import express from "express";
import { addScore, getData as data , getQuestions, getUsers, getScores} from "./functions/database.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json())

app.get("/", async (req, res) => { 
    const questions = await data();
    res.send(questions);
 });


app.get("/wait",  (req, res) => { 
  setTimeout(()=>{
    res.send("Slow")
  }, 5000)
  
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

 

 app.post("/testDatabase" , async(req, res)=>{
  const msg = req.body
  const users = await scorecard();
  res.status(201).send(users);
})



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Server is running on port 8080");
    }); 