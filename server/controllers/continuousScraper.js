const puppeteer = require('puppeteer-extra'); // Use puppeteer-extra instead of puppeteer
const StealthPlugin = require('puppeteer-extra-plugin-stealth'); // Import the stealth plugin
const axios = require('axios');
const { urlChecker } = require('../controllers/urlChecker');

// Add the stealth plugin to Puppeteer Extra
puppeteer.use(StealthPlugin());

async function continuousScraper(db) {
    console.log("Starting to scrape saved products...");
    // Connect to the database
    const connection = await db.getConnection();
    const [rows] = await connection.query("SELECT * FROM productPriceInfo");

    console.log("Rows retrieved from database:", rows.length);
    console.log("Starting to scrape");

    // List of user agents to rotate sequentially
    const userAgents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
        'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:104.0) Gecko/20100101 Firefox/104.0',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15A372 Safari/604.1'
    ];
    let userAgentIndex = 0; // Index to track the current user-agent

    for (let row = 0; row < rows.length; row++) {
        try {
            // Launch Puppeteer browser with Stealth Plugin
            const browser = await puppeteer.launch({ headless: true }); // Set headless to false for debugging
            const page = await browser.newPage();
            
            // Check URL to find the right website headers and setup
            const urlDetails = await urlChecker(rows[row].product_url);

            // Clear cookies and session data before navigating to the new URL
            await page.deleteCookie(...await page.cookies());

            // Select the next user-agent in the list
            const selectedUserAgent = userAgents[userAgentIndex];
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
            console.log(`Going to ${rows[row].product_url} row #: ${row}`);
            await page.goto(rows[row].product_url, { waitUntil: 'networkidle2' });

            // Extract product price
            const productData = await page.evaluate((productPriceLocation) => {
                const productPrice = document.querySelector(productPriceLocation) ? document.querySelector(productPriceLocation).textContent.trim() : null;
                return {
                    success: true,
                    productPrice
                };
            }, urlDetails.productPriceLocation);

            console.log(productData.productPrice);

            // Parse the price as a number (ensure proper format)
            if (productData.productPrice) {
                const scrapedPrice = parseFloat(productData.productPrice.replace(/[^0-9.]/g, ''));
                const dbPrice = parseFloat(rows[row].product_price);
                const priceLimit = parseFloat(rows[row].product_price_limit);

                // Update the price if different from the database
                if (scrapedPrice !== dbPrice) {
                    const now = new Date();
                    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
                    await connection.query("UPDATE productPriceInfo SET product_price = ?, date_scraped = ? WHERE product_url = ?", [scrapedPrice, formattedDate, rows[row].product_url]);
                    if (scrapedPrice <= priceLimit) {
                        console.log(`Emailing user: Price drop detected for ${rows[row].product_url}`);
                    }
                }
            } else {
                console.log("Failed to retrieve product price.");
            }

            // Close the browser
            await browser.close();
        } catch (error) {
            console.error('Error iterating through table and scraping', error);
        }
    }
}

function startScraping(db) {
    continuousScraper(db);
    setInterval(() => continuousScraper(db), 3600000); // Run every hour
}

module.exports = startScraping;
