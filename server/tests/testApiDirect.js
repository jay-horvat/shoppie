const axios = require('axios');

async function testApi() {
  try {
    const response = await axios.get('https://www.uniqlo.com/ca/api/commerce/v3/en/products/E471233-000', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
        'Accept': 'application/json',
        'Referer': 'https://www.uniqlo.com',
        'Cookie': '<your-cookie-here>'
      },
      timeout: 10000
    });
    console.log('API Response:', response.data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testApi();

