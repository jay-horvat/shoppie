const puppeteer = require('puppeteer');
const axios = require('axios');


//For product in producttable execute this thing.


async function productScraper(url) {   
    try {
        // Launch Puppeteer browser
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Set user-agent and other headers
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36');
        await page.setExtraHTTPHeaders({
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'DNT': '1',
            'Referer': 'https://www2.hm.com/',
            'Upgrade-Insecure-Requests': '1'
        });

        // Navigate to the product URL
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Extract product name and price using Puppeteer
        const productData = await page.evaluate(() => {
            const productName = document.querySelector('h1.fa226d') ? document.querySelector('h1.fa226d').textContent.trim() : null;
            const productPrice = document.querySelector('span.edbe20') ? document.querySelector('span.edbe20').textContent.trim() : null;
            
            return {
                success: true,
                productName,
                productPrice
            };
        });

            // Close the browser
            await browser.close();

            // Return product data as JSON
            return productData;
        } catch (error) {
            console.error('Error fetching the product page:', error);
            return { success: false, message: error.message }
        }
    }

    module.exports = { productScraper };
