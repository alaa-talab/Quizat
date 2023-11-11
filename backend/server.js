const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
});

app.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const sql = "INSERT INTO users (`username`, `email`, `password`) VALUES (?, ?, ?)";
        db.query(sql, [req.body.username, req.body.email, hashedPassword], (err, data) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "Internal Server Error" });
            }
           
        });
    } catch (error) {
        console.error("Hashing error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users WHERE `email` = ?";
    db.query(sql, [req.body.email], async (err, data) => {
      
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        if (data.length > 0) {
            const user = data[0];

            // Debugging logs
            console.log("Received plaintext password:", req.body.password);
            console.log("Stored hashed password:", user.password);

            bcrypt.compare(req.body.password, user.password)
                .then(match => {
                    console.log("Password match result:", match); // Log the result of the comparison
                    if (match) {
                        const { username, email } = user;
                        return res.json({ message: "Success", username, email });
                    } else {
                        return res.status(401).json({ message: "Login failed, check credentials"});
                    }
                })
                .catch(err => {
                    console.error("bcrypt comparison error:", err);
                    return res.status(500).json({ message: "Internal Server Error" });
                });
        } else {
            return res.status(401).json({ message: "Login failed, check credentials" });
        }
    });
});

app.listen(8081, () => {
    console.log("Server listening on port 8081");
});
