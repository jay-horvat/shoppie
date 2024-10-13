const express = require("express");
const cors = require("cors");  
const mysql = require("mysql2/promise");
require("dotenv").config();

const app = express();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_PORT = process.env.DB_PORT;

const db = mysql.createPool({
  connectionLimit: 100,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT
});

const port = 5001;
app.listen(port, () =>
  console.log(`Product Server Started on port ${port}...`)
);

app.use(cors());
app.use(express.json());

// Add your routes here, for example:
app.post("/addProduct", async (req, res) => {
    console.log("Received request to /addProduct"); 
    const productURL = req.body.name;
  
    try {
      //Connect to the DB  
      const connection = await db.getConnection();
      console.log("Connected to the database"); 
      const [productRows] = await connection.query("SELECT * FROM productPriceInfo WHERE url = ?", [productURL]);
      console.log("Executed SELECT query");
      // Check if the url is already in the table  
      if (productRows.length > 0) {
        console.log("------> User already exists");
        res.sendStatus(409);
      //Ad product to the table  
      } else {
        await connection.query("INSERT INTO productPriceInfo VALUES (0,?,?)", [user, hashedPassword]);
        
        // Here is where I will more question marks in the statement above and create value for them that 
        // resemble the price etc etc. Probably need the query statememnt at the end tbh
        
        //Also. This is just adding it to the product table. This aint the actual price history table.

        //Probably just make this the price history table for now though. 
        console.log("--------> Created new User");
        res.sendStatus(201);
      }
  
      connection.release();
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });
