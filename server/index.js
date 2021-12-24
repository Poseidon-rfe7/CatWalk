const express = require('express')
const app = express()
const port = 3000
const axios = require('axios')
const path = require('path')

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

app.use(express.json())
app.use(express.static("client/public"));


app.get('/api/products', (req, res) => {
    // console.log(req)
  let url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products';
  let header = {
    'User-Agent': 'request',
    'Authorization': process.env.GITHUB_API_KEY
  }

  axios.get(url, header)
  .then(result => console.log(result))
  .catch(err => res.send(err));

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})