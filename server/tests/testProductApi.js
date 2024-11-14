// testProductApi.js
const { productApi } = require('../controllers/productAPI'); 

const test = async () => {
  try {
    const url = 'https://www.uniqlo.com/ca/en/products/E471233-000?colorCode=COL08&sizeCode=SMA004'; // Example product URL
    const result = await productApi(url);
    console.log('Test Result:', result);
  } catch (error) {
    console.error('Test Error:', error.message);
  }
};

test();
