'use strict'

const fetch = require('node-fetch')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

let passedParams = {value: 0, currA: 0, currB: 0, rate: 0, result: 0}

app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}))
  .use((req, res, next) => {
    next()
  })
  .use(express.static('public'))
  .get('/main', (req, res) => {
    fetch('https://api.fixer.io/latest')
      .then(response => response.json())
      .then(myJson => {
        let currList = Object.keys(myJson.rates)
        res.render('mainView.ejs', {
          currList: currList,
          value: passedParams.value,
          currA: passedParams.currA,
          currB: passedParams.currB,
          rate: passedParams.rate,
          result: passedParams.result
        })
      })
  })
  .post('/main/calc', (req, res) => {
    if (req.body.currA != 0 && req.body.currB != 0) { // eslint-disable-line
      fetch(`https://api.fixer.io/latest?symbols=${req.body.currA},${req.body.currB}`)
        .then(response => response.json())
        .then(myJson => {
          console.log(myJson)
          let rateCurrA = myJson.rates[req.body.currA]
          let rateCurrB = myJson.rates[req.body.currB]
          console.log(rateCurrA, rateCurrB)

          let rate = Math.round((rateCurrB / rateCurrA) * 10000) / 10000
          let result = Math.round((req.body.value * (rateCurrB / rateCurrA)) * 100) / 100

          passedParams = {
            value: req.body.value,
            currA: req.body.currA,
            currB: req.body.currB,
            rate: rate,
            result: result
          }
          res.redirect('/main')
        })
    } else {
      passedParams = {
        value: 0,
        currA: 0,
        currB: 0,
        rate: 0,
        result: 0}
      res.redirect('/main')
    }
  })
  .use((req, res, next) => {
    res.redirect('/main')
  })
  .listen(8080)
