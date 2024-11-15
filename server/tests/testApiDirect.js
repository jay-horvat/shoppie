const axios = require('axios');

async function testApi() {
  try {
    const response = await axios.get('https://www.uniqlo.com/uk/en/products/E470077-000/00?colorDisplayCode=57&sizeDisplayCode=004', {
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

