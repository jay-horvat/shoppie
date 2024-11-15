// testProductApi.js
const { productApi } = require('../controllers/productAPI'); 

const test = async () => {
  try {
    const url = 'https://www.uniqlo.com/us/en/products/E470150-000/00?colorDisplayCode=57&sizeDisplayCode=003'; // Example product URL
    const result = await productApi(url);
    console.log('Test Result:', result);
  } catch (error) {
    console.error('Test Error:', error.message);
  }
};

test();
