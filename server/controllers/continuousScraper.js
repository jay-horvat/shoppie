const puppeteer = require('puppeteer');
const axios = require('axios');

async function continuousScraper(db) {
    console.log("Starting to scrape saved products...");
    //For product in product table
    //Connect to db
    const connection = await db.getConnection();
    const [rows] = await connection.query("SELECT * FROM productPriceInfo");

    //iterate through rows and scrape for each row
    console.log("Rows retrieved from database:", rows.length);
    console.log("Starting to scrape");
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
    
    for (let row = 0; row < rows.length; row++) {
        try {

            // Navigate to the product URL
            console.log(`going to ${rows[row].product_url} row #: ${row}`);
            await page.goto(rows[row].product_url, { waitUntil: 'networkidle2' });
            

            // Extract product price
            const productData = await page.evaluate(() => {
                const productPrice = document.querySelector('span.edbe20') ? document.querySelector('span.edbe20').textContent.trim() : null;
                
                return {
                    success: true,
                    productPrice
                };
            });

                // Parse the price as a number (ensure proper format)
                const scrapedPrice = parseFloat(productData.productPrice.replace(/[^0-9.]/g, ''));  // Remove non-numeric characters
                const dbPrice = parseFloat(rows[row].product_price);
                const priceLimit = parseFloat(rows[row].product_price_limit);

                // Return product data as JSON
                //return productData;

                //compare the product price to the one in the DB and reset if different for all products with that URL.
                if (scrapedPrice !== dbPrice) {
                    const now = new Date();
                    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
                    await connection.query("UPDATE productPriceInfo SET product_price = ?, date_scraped = ? WHERE product_url = ?", [scrapedPrice, formattedDate, rows[row].product_url]);
                    if (scrapedPrice <= priceLimit) {
                        //email user to alert
                        console.log(`Emailing user: Price drop detected for ${rows[row].product_url}`);
                    } 
                }
                await page.goto('about:blank');
            } catch (error) {
                console.error('Error iterating through table and scraping', error);
            }
        }
        // Close the browser
        await browser.close();
    }

    function startScraping (db) {
        continuousScraper(db);
        setInterval(() => continuousScraper(db), 3600000);
    }

    module.exports = startScraping;
