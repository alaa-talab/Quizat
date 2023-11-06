const express = require("express");
const mysql = require('mysql');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({

host: "localhost",
user: "root",
password: "",
database: "signup"


})

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO users (`username`, `email`, `password`) VALUES (?)";
    const values = [req.body.username, req.body.email, req.body.password];
  
    db.query(sql, [values], (err, data) => {
      if (err) {
        console.error("Database error:", err); // Log the error for debugging
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.json(data);
    });
  });

  app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users WHERE `email` = ? AND `password` = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
      if (err) {
        console.error("Database error:", err); // Log the error for debugging
        return res.status(500).json({ error: "Internal Server Error" });
      }
     if (data.length > 0){

      return res.json("Success");
      
     }else{
      return res.json("faile");
     }
    });
  });
  

app.listen(8081, ()=> {
    console.log("listening");
})