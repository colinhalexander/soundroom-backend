const router = require('express').Router()
const passport = require('../config/passport')

router.get('/',
  passport.authenticate('spotify', { 
    scope: [
      'streaming',
      'user-read-email',
      'user-read-private',
      'user-read-playback-state',
      'user-modify-playback-state',
      'user-read-currently-playing',
      'user-read-recently-played',
      'user-library-modify',
      'user-library-read',
      'playlist-modify-public',
      'playlist-modify-private',
    ]
  })
)

router.get('/callback', 
  passport.authenticate('spotify', {
    failureRedirect: 'http://localhost:3001/?login=failed',
    session: false
  }),
  (req, res) => {
    res.redirect(`http://localhost:3001/users/${req.user.spotify_id}`)
  }
)

module.exports = router;