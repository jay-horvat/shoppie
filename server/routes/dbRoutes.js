const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken'); 
require('dotenv').config();  

const JWT_SECRET = process.env.JWT_SECRET;

// Create User Route
router.post("/createUser", async (req, res) => {
  const user = req.body.name;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const email = req.body.email;

  try {
    const db = req.app.locals.db;  // Access the db from app.locals
    const connection = await db.getConnection();
    const [rows] = await connection.query("SELECT * FROM userTable WHERE user = ?", [user]);

    if (rows.length > 0) {
      console.log(`User already exists: ${user}`);
      res.sendStatus(409);  // User already exists
    } else {
      await connection.query("INSERT INTO userTable VALUES (0,?,?,?)", [user, hashedPassword, email]);
      console.log(`Created new user: ${user}`);
      res.sendStatus(201);  // Created new user
    }

    connection.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const user = req.body.name;
  const password = req.body.password;

  try {
    const db = req.app.locals.db;  // Access the db from app.locals
    const connection = await db.getConnection();
    const [rows] = await connection.query("SELECT * FROM userTable WHERE user = ?", [user]);


    connection.release();

    if (rows.length === 0) {
      console.log(`${user} does not exist`);
      res.sendStatus(404);  // User does not exist
    } else {
      const hashedPassword = rows[0].password;
      if (await bcrypt.compare(password, hashedPassword)) {
        //Do I add the JWT variable here?
        const token = jwt.sign({ userId: rows[0].userId }, JWT_SECRET, { expiresIn: '1h' });
        const username = rows[0].user;
        console.log(`${user} is logged in.`);
        return res.json({ message: `${user} is logged in!`, token, username });  // Login successful and return the token and user
      } else {
        console.log(`Wrong password`);
        res.send("Password incorrect!");
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;  // Export the router
