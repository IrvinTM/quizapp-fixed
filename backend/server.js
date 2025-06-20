import express from "express";

import {
  addScore,
  getData as data,
  getQuestions,
  getUsers,
  getScores,
  getReducedData,
  getRandomData,
} from "./functions/database.js";

import bcrypt from "bcrypt";
import { addUser } from "./functions/database.js";
import { findSingleUser } from "./functions/database.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
import { authenticateToken } from "./functions/middleware.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  const questions = await getUsers();
  res.send(questions);
});

app.get("/limit/:limit", async (req, res) => {
  const limit = req.params.limit;
  const questions = await getReducedData(limit);
  res.send(questions);
});

app.get("/randomized/:randomized", async (req, res) => {
  const randomized = req.params.randomized;
  console.log(randomized);
  const questions = await getRandomData(randomized);
  res.send(questions);
});

app.get("/questions/:contains", async (req, res) => {
  const contains = req.params.contains;
  const questions = await getQuestions(`%${contains}%`);
  console.log(contains);
  res.send(questions);
});

app.get("/users", async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

app.get("/scores", authenticateToken, async (req, res) => {
  console.log(req.user.userId);
  const users = await getScores(req.user.userId);
  if (!users || users.length === 0) {
    return res.status(404).send("No scores found for this user");
  }
  res.send(users);
});

app.post("/scores", async (req, res) => {
  const { userid ,quantity, answers } = req.body;
  const addscore = await addScore(userid, quantity, answers);
  res.status(201).send(addscore);
});

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await addUser(username, email, hashedPassword);
  if(user === "User already exists"){
   res.status(409).send("User already exists" );
  }
  else{
  res.status(201).send(user);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await findSingleUser(username);
  console.log(user[0].password);
  if (!user || user.length === 0) {
    return res.status(404).send("User not found");
  } else {
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (isPasswordValid) {
      const accessToken = jwt.sign(
        {
          username: user[0].username,
          email: user[0].email,
          password: user[0].password,
          userId: user[0].userid,
        },
        process.env.ACCESS_TOKEN_SECRET
      );
      return res.status(200).json({ accessToken: accessToken });
    } else {
      return res.status(401).send("Invalid password");
    }
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server is running on port 8080");
});
