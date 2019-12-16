const passport = require('passport')
const encryptor = require('./encryptor')
const SpotifyStrategy = require('passport-spotify').Strategy
const User = require('../models/user')

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      const _accessToken = encryptor.encrypt(accessToken),
            _refreshToken = encryptor.encrypt(refreshToken)
            
      const user = await User.updateOrCreate({
        spotify_id: profile.id,
        access_token: _accessToken,
        refresh_token: _refreshToken
      })

      return done(null, user)
    }
  )
)

module.exports = passport