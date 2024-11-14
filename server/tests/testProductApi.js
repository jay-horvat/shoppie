// testProductApi.js
const { productApi } = require('../controllers/productAPI'); 

const test = async () => {
  try {
    const url = 'https://www2.hm.com/en_ca/productpage.1264629001.html'; // Example product URL
    const result = await productApi(url);
    console.log('Test Result:', result);
  } catch (error) {
    console.error('Test Error:', error.message);
  }
};

test();
