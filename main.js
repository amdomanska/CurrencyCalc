'use strict'

const fetch = require('node-fetch')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()

app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}))
.use(express.static('public'))
.use(session({
  secret: 'curr calc secret',
  resave: false,
  saveUninitialized: true
}))

const zeroParams = () => ({value: 0, currA: 0, currB: 0, rate: 0, result: 0})

app.get('/main', function (req, res) {
  if (!req.session.passedParams) {
    req.session.passedParams = zeroParams()
  }
  fetch('https://api.fixer.io/latest')
    .then(response => response.json())
    .then(myJson => {
      let currList = Object.keys(myJson.rates);
      res.render('mainView.ejs',
        Object.assign({currList: currList},req.session.passedParams));
    });
  })

.post('/main/calc', function (req, res) {
  if (req.body.currA != 0 && req.body.currB != 0) { // eslint-disable-line
    fetch(`https://api.fixer.io/latest?symbols=${req.body.currA},${req.body.currB}`)
      .then(response => response.json())
      .then(myJson => {
        console.log(myJson);
        let rateCurrA = myJson.rates[req.body.currA]
        let rateCurrB = myJson.rates[req.body.currB]

        let rate = Math.round((rateCurrB / rateCurrA) * 10000) / 10000
        let result = Math.round((req.body.value * (rateCurrB / rateCurrA)) * 100) / 100

        req.session.passedParams = {value: req.body.value,
          currA: req.body.currA,
          currB: req.body.currB,
          rate: rate,
          result: result}
        res.redirect('/main')
      });
  } else {
    req.session.passedParams = zeroParams()
    res.redirect('/main')
  }
});

app.use(function (req, res, next) {
  res.redirect('/main')
})
.listen(8080)
