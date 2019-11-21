require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')

const app = express()

app.use(cors())
app.use(bodyParser.json())

const PORT = process.env.PORT || '3000'

app.listen(PORT, (req, res, next) => {
  console.log(`Listening on port ${PORT}`)
})