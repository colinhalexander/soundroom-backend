require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')

const authRouter = require('./routes/auth')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(passport.initialize())

app.use(authRouter)

const PORT = process.env.PORT || '3000'

app.listen(PORT, (req, res, next) => {
  console.log(`Listening on port ${PORT}`)
})