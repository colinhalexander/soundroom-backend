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
      'user-top-read',
      'playlist-modify-public',
      'playlist-modify-private',
    ]
  })
)

router.get('/callback', 
  passport.authenticate('spotify', {
    failureRedirect: 'https://soundroom-1.firebaseapp.com/?login=failed',
    session: false
  }),
  (req, res) => {
    res.redirect(`https://soundroom-1.firebaseapp.com/users/${req.user.spotify_id}`)
  }
)

module.exports = router;