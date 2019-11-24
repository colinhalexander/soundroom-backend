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

      const _accessToken = encryptor.encrypt(accessToken),
            _refreshToken = encryptor.encrypt(refreshToken)
      
      console.log("profile", profile)
      console.log("accessToken", accessToken)
      console.log("done", done)

      const user = {}
      // const formattedProfile = User.formatProfile(profile, _accessToken, _refreshToken)
      
      // const user = await User.findOrCreate(formattedProfile)

      return done(null, user)
    }
  )
)
