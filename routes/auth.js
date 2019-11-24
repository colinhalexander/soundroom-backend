const router = require('express').Router()
const passport = require('../config/passport')

router.get('/',
  passport.authenticate('spotify', { 
    scope: [
      'streaming',
      'user-read-email',
      'user-read-private'
      // 'user-library-modify',
      // 'user-library-read',
      // 'user-modify-playback',
      // 'playlist-modify-private'
    ] 
  })
)

router.get('/callback', 
  passport.authenticate('spotify', {
    failureRedirect: 'http://localhost:3001/',
    session: false
  }),
  (req, res) => {
    console.log("/callback request:", req)
    res.redirect(`http://localhost:3001/users/${req.user.spotify_id}`)
  }
)

module.exports = router;