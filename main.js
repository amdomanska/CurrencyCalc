"use strict"

const fetch = require('node-fetch');
const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');

const app = express();

let passedParams = {value: 0,currA: 0, currB: 0, rate: 0, result: 0};

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}))
.use(function(req, res, next){
    next();
})

app.get('/main', function(req, res) {
  res.render('mainView.ejs',{value: passedParams.value,
                            currA: passedParams.currA,
                            currB: passedParams.currB,
                            rate: passedParams.rate,
                            result: passedParams.result});
})

.post('/main/calc', function(req, res) {

  if (req.body.currA != '' && req.body.currB != '') {

    passedParams= {value: req.body.value, currA: req.body.currA, currB: req.body.currB, rate: 1, result: 1};

  /*fetch('https://api.fixer.io/latest?symbols='+'currA'+'currB')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });*/

}
  res.redirect('/main');
})



.use(function(req, res, next){
    res.redirect('/main');
})
.listen(8080);
