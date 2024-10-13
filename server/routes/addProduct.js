const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const { productScraper } = require('../controllers/productScraper');

// Create product route
router.post('/addproduct', async (req, res) => {
    const url = req.body.productURL;
    const userId = req.body.userId;
    const priceLimit = req.body.priceLimit;

//Use scraper
const result = await productScraper(url);

if (result.success) {
  try{
    const db = req.app.locals.db;
    const connection = await db.getConnection();
    const [rows] = await connection.query("SELECT * FROM productPriceInfo WHERE product_url = ?", [url]);

    if (rows.length > 0) {
      console.log(`Product already exists in user's saved products list`);
      connection.release();
      return res.status(409).send(`${result.productName} is already in the saved list`);
    } else {
      const formattedPrice = result.productPrice.replace(/[^0-9.]/g, '');
      const now = new Date();
      const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      await connection.query("INSERT INTO productPriceInfo (product_name, product_price, date_scraped, product_url, product_price_limit, userId) VALUES (?, ?, ?, ?, ?, ?)", [result.productName, formattedPrice, formattedDate, url, priceLimit, userId]);
      console.log(`${result.productName} added to your saved products.`);
    }

    connection.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }

} else {
  res.status(500).json(result);  // Handle error
}
});

module.exports = router;  // Export the router
