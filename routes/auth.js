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

router.get('/callback', (req, res, next) => {
  // passport.authenticate('spotify'), redirect to 
})

module.exports = router;