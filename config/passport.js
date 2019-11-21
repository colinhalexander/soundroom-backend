const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: '/auth/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      // create user, save tokens
    }
  )
)