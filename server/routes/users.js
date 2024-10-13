var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Adding on an about extension
router.get('/about', function(req, res, next) {
  res.send('about users');
});


//Register route with POST
router.post('/register', function(req, res, next) { 
    res.send('hello user'); 
  }); 

module.exports = router;
