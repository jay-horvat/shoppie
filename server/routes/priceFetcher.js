const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');


// Create product route
router.get('/api/product', async (req, res) => {
    const url = 'https://www.yeti.ca/drinkware/bottles/70000003125.html';
  
    try {
        const response = await axios.get(url, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
              'Accept-Language': 'en-US,en;q=0.9',
              'Accept-Encoding': 'gzip, deflate, br',
              'Connection': 'keep-alive',
              'DNT': '1',
              'Upgrade-Insecure-Requests': '1',
            },
          });
          
  
      const html = response.data;
      const $ = cheerio.load(html);
  
      const productName = $('div.js-product-name__variation.product-name__variation.h-bold').text();
      const productPrice = $('div.prices span.value').text();
  
      res.json({
        productName,
        productPrice,
        productUrl: url,
      });
    } catch (error) {
      console.error('Error fetching the product page:', error);
      res.status(500).json({ message: 'Failed to fetch product data' });
    }
  });

module.exports = router;  // Export the router
