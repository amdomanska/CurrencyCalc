'use strict'

const fetch = require('node-fetch')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = express()

app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}))
app.use(session({
  secret: 'currency calc secret',
  resave: false,
  saveUninitialized: true
}))
app.use(express.static('public'))

const zeroParams = () => ({value: 0, currA: 0, currB: 0, rate: 0, result: 0})

app.get('/main', (req, res) => {
  if (!req.session.passedParams) {
    req.session.passedParams = zeroParams()
  }
  fetch('https://api.fixer.io/latest')
    .then(response => response.json())
    .then(myJson => {
      let currList = Object.keys(myJson.rates)
      res.render('mainView.ejs', {
        currList: currList,
        ...req.session.passedParams
      }
      )
    })
})

app.post('/main/calc', (req, res) => {
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

        req.session.passedParams = {
          value: req.body.value,
          currA: req.body.currA,
          currB: req.body.currB,
          rate: rate,
          result: result
        }
        res.redirect('/main')
      })
  } else {
    req.session.passedParams = zeroParams()
    res.redirect('/main')
  }
})

app.use((req, res, next) => {
  res.redirect('/main')
})

app.listen(8080)
