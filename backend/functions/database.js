    import mysql from 'mysql2'
    import dotenv from 'dotenv'
    import {Connector} from '@google-cloud/cloud-sql-connector'
    dotenv.config();

    const connector = new Connector();
    const clientOptions = await connector.getOptions({
        instanceConnectionName: 'acostajulio-dev:us-central1:gpc-test-db',
        ipType: 'PUBLIC',
    });

    const pool = mysql.createPool({
        ...clientOptions,
        user: 'root',
        password: 'Javascript1997!',
        database: 'gcp_testzilla_db'
    }).promise();
 
    export async function findSingleUser(username) {
      const [rows] = await pool.query(
        "SELECT username, password, email, userid FROM users where username = ?",
        [username]
      );
      return rows;
    }


    export async function addUser(username, email, password) {
      const result = await pool.query(
        `INSERT INTO users (username, email, password) VALUES (?,?,? )`,
        [username, email, password]
      );
      return result;
    }

    export async function getData() {
      const [rows] = await pool.query("SELECT * FROM questions");
      return rows;
    }


     export async function getReducedData(quantity) {
       const [rows] = await pool.query("SELECT * FROM questions LIMIT ?", [
         parseInt(quantity),
       ]);
       return rows;
     }


        export async function getRandomData(randomized){
            try {
                const [rows] = await pool.query(
                  `SELECT * FROM questions ORDER BY RAND() LIMIT ?`,
                  [parseInt(randomized)]
                );
                return rows;
              } catch (error) {
                console.error("Error fetching random data:", error);
                throw error; 
              }
        }

     export async function getQuestions(contains){
        const [rows] =  await pool.query('SELECT * FROM questions WHERE questions LIKE ?', [contains]);
        return rows;
    }


    export async function getUsers(){
        const [rows] =  await pool.query('SELECT * FROM users');
        return rows;
    }

    export async function getScores(userId){
        const [rows] =  await pool.query('SELECT * FROM scores WHERE userid = ?', [userId]);
        return rows;
    }

    export async function addScore(userId, quantity, answers) {
      const result = await pool.query(
        `INSERT INTO scores (userid, amount_of_questions, correct_answers, score) VALUES (?, ?, ? ,?)`,
        [ userId, quantity, answers, answers / quantity]
      );
      return result;
    }

    
    export async function sendData(test){
        const [rows] = await pool.query(
        'INSERT INTO questions (questions, opt_a, opt_b, opt_c, opt_d, answer) VALUES ?',
        [test]
        );
        return rows;    
    }