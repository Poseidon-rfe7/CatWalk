const express = require('express')
const app = express()
const port = 3000
const axios = require('axios')
const path = require('path')

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

app.use(express.json())
app.use(express.static("client/public"));

const serverCache = {}

app.get('/api/*', (req, res) => {
  var sub = req.url.substring(5)

  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/${sub}`;

  if (serverCache[sub] !== undefined) {
    res.send(serverCache[sub])
  } else {
    axios.get(url, {
      headers: {
        'User-Agent': 'request',
        'Authorization': process.env.GITHUB_API_KEY
      }
    })
    .then(result => {
      serverCache[sub] = result.data
      res.send(result.data)
      console.log(serverCache)
    })
    .catch(err => {
      res.status(400).send(err)});

  }
})

app.put('/api/*', (req, res) => {
  var sub = req.url.substring(5)
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/${sub}`;

  axios.put(url, null, {
    headers: {
      'User-Agent': 'request',
      'Authorization': process.env.GITHUB_API_KEY
    }
  })
  .then(result => {
    res.send(result.data)
  })
  .catch(err => {
    res.status(400).send(err)});
})

app.post('/api/*', (req, res) => {
  var sub = req.url.substring(5)
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/${sub}`;
  let params = req.body

  axios.post(url, params, {
    headers: {
      'User-Agent': 'request',
      'Authorization': process.env.GITHUB_API_KEY
    }
  })
  .then(result => {
    res.send(result.data)
  })
  .catch(err => {
    res.status(400).send(err)});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})