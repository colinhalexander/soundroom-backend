const router = require('express').Router()

router.get('/',
  passport.authenticate('spotify', { 
    scope: [
      'streaming',
      'user-read-email',
      'user-read-private',
      'user-library-modify',
      'user-modify-playback',
      'user-library-read',
      'playlist-modify-private'
    ] 
  })
)

router.get('/callback', 
  passport.authenticate('spotify', { failureRedirect: 'http://localhost:3001/' }),
  (req, res) => {
    res.redirect(`http://localhost:3001/users/${req.user.spotify_id}`)
  }
)

module.exports = router;