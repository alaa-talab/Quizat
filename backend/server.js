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
        console.error("Database error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (data.length > 0) {
        const { username, email } = data[0];
        return res.json({ message: "Success", username, email });
      } else {
        // Provide a meaningful message here
        return res.status(401).json({ message: "Login failed, check credentials" });
      }
    });
  });
  
  

app.listen(8081, ()=> {
    console.log("listening");
})