var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/status', (req, res) => {
  res.send({
    message: 'hello world!'
  })
})

router.post('/tx', (req, res) => {
  res.send({
    message: `${req.query.bytes} was transmitted!`
  })
})

module.exports = router;
