const puppeteer = require('puppeteer-extra'); // Use puppeteer-extra instead of puppeteer
const StealthPlugin = require('puppeteer-extra-plugin-stealth'); // Import the stealth plugin
const axios = require('axios');
const { urlChecker } = require('../controllers/urlChecker');

// Add the stealth plugin to Puppeteer Extra
puppeteer.use(StealthPlugin());

// List of user agents to rotate sequentially
const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:104.0) Gecko/20100101 Firefox/104.0',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15A372 Safari/604.1'
];
let userAgentIndex = 0; // Index to track the current user-agent

async function productScraper(url) {   
    try {
        // Launch Puppeteer Extra browser with Stealth Plugin
        const browser = await puppeteer.launch({ headless: true }); // You can set headless to false for debugging
        const page = await browser.newPage();

        // Check URL to find the right website headers and setup
        const urlDetails = await urlChecker(url);

        // Select the next user-agent in the list
        const selectedUserAgent = userAgents[userAgentIndex];

        // Increment the userAgentIndex, and wrap around if it exceeds the length of the array
        userAgentIndex = (userAgentIndex + 1) % userAgents.length;

        // Set user-agent and other headers
        await page.setUserAgent(selectedUserAgent);
        await page.setExtraHTTPHeaders({
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'DNT': '1',
            'Referer': urlDetails.referer,
            'Upgrade-Insecure-Requests': '1'
        });

        // Navigate to the product URL
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Extract product name and price using Puppeteer
        const productData = await page.evaluate((productNameLocation, productPriceLocation) => {
            const productName = document.querySelector(productNameLocation) ? document.querySelector(productNameLocation).textContent.trim() : null;
            const productPrice = document.querySelector(productPriceLocation) ? document.querySelector(productPriceLocation).textContent.trim() : null;
            
            return {
                success: true,
                productName,
                productPrice
            };
        }, urlDetails.productNameLocation, urlDetails.productPriceLocation);
          
        // Close the browser
        await browser.close();

        // Return product data as JSON
        return productData;
    } catch (error) {
        console.error('Error fetching the product page:', error);
        return { success: false, message: error.message };
    }
}

module.exports = { productScraper };
