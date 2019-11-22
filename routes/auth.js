const router = require('express').Router()

router.get('/', (req, res, next) => {
  // passport.authenticate('spotify'), include scopes, redirect user to Spotify oauth page
})

router.get('/callback', (req, res, next) => {
  // passport.authenticate('spotify'), redirect to 
})

module.exports = router;