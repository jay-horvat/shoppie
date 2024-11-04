const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const { productScraper } = require('../controllers/productScraper');

// Create product route
router.post('/addproduct', async (req, res) => {
    const url = req.body.productURL;
    const userId = req.body.userId;
    const priceLimit = req.body.priceLimit;

//Use scraper on url provided
const result = await productScraper(url);

// add product information to database
if (result.success) {
  try{
    const db = req.app.locals.db;
    const connection = await db.getConnection();
    const [rows] = await connection.query("SELECT * FROM productPriceInfo WHERE product_url = ? AND userId = ?", [url, userId]);

    if (rows.length > 0) {
      console.log(`Product already exists in user's saved products list`);
      connection.release();
      return res.json({ message: "That item is already in your saved products!" });
    } else {
      const formattedPrice = result.productPrice.replace(/[^0-9.]/g, '');
      const now = new Date();
      const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      await connection.query("INSERT INTO productPriceInfo (product_name, product_price, date_scraped, product_url, product_price_limit, userId) VALUES (?, ?, ?, ?, ?, ?)", [result.productName, formattedPrice, formattedDate, url, priceLimit, userId]);
      connection.release();
      console.log(`${result.productName} added to your saved products.`);
      return res.json({ message: "Saved the iterm!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }

} else {
  res.status(500).json(result); 
}
});

  // ARoute for when front end retrieves products data for user
router.get("/getProducts", async (req, res) => {
  console.log("Received request to /getProduct"); 
  const user = req.query.user;
  console.log(`${user} is getting fetched`)

  try {
    //Connect to the DB  
    const db = req.app.locals.db;
    const connection = await db.getConnection();
    console.log("Connected to the database"); 
    const [productRows] = await connection.query("SELECT product_name, product_price, product_url, product_price_limit FROM productPriceInfo WHERE userId = ?", [user]);
    connection.release();
    console.log("Executed SELECT query");
    // Check if the url is already in the table 
    //return product rows as a json
    if (productRows.length === 0) {
      console.log("No products saved");
      return res.json({message: "You have no products saved", productRows: [] });
    //Ad product to the table  
    } else {
      console.log("User's product table returned.");
      return res.json({productRows});
    }
  
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;  
