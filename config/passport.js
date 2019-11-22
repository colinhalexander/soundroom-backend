const passport = require('passport')
const encryptor = require('./encryptor')
const SpotifyStrategy = require('passport-spotify').Strategy

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: '/auth/callback'
    },
    async (accessToken, refreshToken, profile, done) => {

      const encryptedAccessToken = encryptor.encrypt(accessToken),
            encryptedRefreshToken = encryptor.encrypt(refreshToken)
      
      // write User.formatProfile(profile) in user model
        // store only spotify user_id and tokens so user data will refresh with profile updates
      
      // insert formatted profile into database
    }
  )
)
