const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken'); 
require('dotenv').config();  
const sendMail = require('../controllers/sendMail');


const JWT_SECRET = process.env.JWT_SECRET;

// Create User Route
router.post("/createUser", async (req, res) => {
  const user = req.body.name;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const email = req.body.email;

  try {
    const db = req.app.locals.db;  
    const connection = await db.getConnection();
    const [rows] = await connection.query("SELECT * FROM userTable WHERE user = ?", [user]);

    if (rows.length > 0) {
      console.log(`User already exists: ${user}`);
      res.sendStatus(409);  
    } else {
      await connection.query("INSERT INTO userTable VALUES (0,?,?,?)", [user, hashedPassword, email]);
      console.log(`Created new user: ${user}`);
      sendMail(email, 'welcome','thanks for signing up');
      res.sendStatus(201);  
    }

    connection.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Login Routes
router.post("/login", async (req, res) => {
  const user = req.body.name;
  const password = req.body.password;

  try {
    const db = req.app.locals.db;  
    const connection = await db.getConnection();
    const [rows] = await connection.query("SELECT * FROM userTable WHERE user = ?", [user]);

    connection.release();

    if (rows.length === 0) {
      console.log(`${user} does not exist`);
      res.sendStatus(404);  
    } else {
      const hashedPassword = rows[0].password;
      if (await bcrypt.compare(password, hashedPassword)) {
        
        const token = jwt.sign({ userId: rows[0].userId }, JWT_SECRET, { expiresIn: '1h' });
        const username = rows[0].user;
        console.log(`${user} is logged in.`);
        return res.json({ message: `${user} is logged in!`, token, username });  // Login successful and return the token and user
      } else {
        console.log(`Wrong password`);
        return res.json({ message: "Wrong password" });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//Get user details route
  // ARoute for when front end retrieves products data for user
  router.get("/getUserDetails", async (req, res) => {
    console.log("Received request to /getUserDetails"); 
    const user = req.query.user;
  
    try {
      //Connect to the DB  
      const db = req.app.locals.db;
      const connection = await db.getConnection();
      const [userDetails] = await connection.query("SELECT user, email FROM userTable WHERE userId = ?", [user]);
      connection.release();
      // Check if the url is already in the table 
      //return product rows as a json
      if (userDetails.length === 0) {
        console.log("no user data");
        return res.json({message: "You have no user deets"});
      //Ad product to the table  
      } else {
        console.log("User's product table returned.");
        return res.json({userDetails});
      }
    
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });

  //Delete a user
  router.post("/deleteUser", async (req, res) => {
    console.log("Received request to /deleteUser"); 
    const user = req.body.user;
  
    try {
      //Connect to the DB  
      const db = req.app.locals.db;
      const connection = await db.getConnection();
      await connection.query("DELETE FROM userTable WHERE userId = ?", [user]);
      connection.release();
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });

module.exports = router;  
