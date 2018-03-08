"use strict"

let express = require('express');
let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}))
.use(function(req, res, next){
    next();
})

app.get('/main', function(req, res) {
  res.render('main.ejs');
})

.post('/main', function(req, res) {
  if (req.body.currA != '' && req.body.currB != '') {
    let currA = req.body.currA;
    let currB = req.body.currB;

  fetch('https://api.fixer.io/latest?symbols='+'currA'+'currB')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });

  }
  res.redirect('/main',{currA: req.body.currA,
                        currB: req.body.currB,
                        rate: 0,
                        result: 0});
})



.use(function(req, res, next){
    res.redirect('/main');
})
.listen(8080);
