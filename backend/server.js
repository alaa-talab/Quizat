const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const UpdateValidation = require('../src/Pages/Home/UpdateValidation');


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
                        const { username, email, id } = user;
                        return res.json({ message: "Success", username, email, id });
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

// Endpoint to submit score and category
app.post('/submitScore', (req, res) => {
    const { userId, score, category } = req.body;

    const sql = "INSERT INTO user_scores (userId, score, category) VALUES (?, ?, ?)";
    db.query(sql, [userId, score, category], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send("Internal Server Error");
        }
        res.json({ message: "Score submitted successfully" });
    });
});

app.get('/userProfile/:userId', async (req, res) => {
    const userId = req.params.userId;
    // Query to join users and user_scores tables
    const sql = 'SELECT users.username, users.email, user_scores.score, user_scores.category FROM users LEFT JOIN user_scores ON users.id = user_scores.userId WHERE users.id = ?';
    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send("Internal Server Error");
        }
        res.json(result);
    });
});

app.post('/updateUserProfile', async (req, res) => {
    const { userId, username, email, currentPassword, newPassword, confirmPassword } = req.body;

    // Validate new data
    const errors = UpdateValidation(currentPassword, newPassword, confirmPassword);
    if (Object.keys(errors).length > 0) {
        console.log("Validation Errors:", errors);
        return res.status(400).json({ errors });
    }

    // Fetch the current user data from the database
    const userSql = "SELECT * FROM users WHERE id = ?";
    db.query(userSql, [userId], async (err, users) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send("Internal Server Error");
        }
    
        if (users.length === 0) {
            return res.status(404).send("User not found");
        }
    
        const user = users[0];
    
        let updateSql = "UPDATE users SET username = ?, email = ? WHERE id = ?";
        let updateValues = [username, email, userId];
    
        // Check if a password change is attempted
        if (currentPassword && newPassword && confirmPassword) {
            // Verify the current password
            const match = await bcrypt.compare(currentPassword, user.password);
            if (!match) {
                return res.status(401).send("Current password is incorrect");
            }
    
            // Check if the new password is different from the current one and matches the confirmation
            if (newPassword !== currentPassword && newPassword === confirmPassword) {
                const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
                updateSql = "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?";
                updateValues = [username, email, hashedPassword, userId];
            } else {
                // Handle the scenario where the new password doesn't meet your criteria
                return res.status(400).send("New password must be different from the current one and match the confirmation");
            }
        }
    
        // Execute the update query
        db.query(updateSql, updateValues, (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).send("Failed to update user information");
            }
            res.send("User information updated successfully");
        });
    });
});


app.listen(8081, () => {
    console.log("Server listening on port 8081");
});