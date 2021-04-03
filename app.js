const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const shorten = require('./src/routes/shorten')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = process.env.PORT || 8000

app.use(shorten)

app.listen(port, () => {
  console.log(`Listen on ${port}`)
})
