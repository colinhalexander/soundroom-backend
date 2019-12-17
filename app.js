require('dotenv').config()
const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const bodyParser = require('body-parser')
const passport = require('passport')
const WebSocket = require('./request-manager')

const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')
const spotifyRouter = require('./routes/spotify')
const soundroomsRouter = require('./routes/soundrooms')

const app = express()
const PORT = process.env.PORT || '3000'

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(logger('common'))
app.use(bodyParser.json())
app.use(passport.initialize())

app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/spotify', spotifyRouter)
app.use('/soundrooms', soundroomsRouter)

app.get('/encryption', (req, res) => {
  res.json({ key: process.env.ENCRYPTION_KEY })
})

const server = app.listen(PORT, (req, res, next) => {
  console.log(`Listening on port ${PORT}`)
})

WebSocket.config(server)