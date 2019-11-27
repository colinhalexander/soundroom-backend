const router = require('express').Router()
const User = require('../models/user')

router.get('/:spotifyID', async (req, res, next) => {
  const profile = await User.getProfile(req.params.spotifyID)

  profile.id
    ? res.json(profile)
    : res.json({ error: "try again" })
})

router.get('/:spotifyID/tokens', async (req, res, next) => {
  const tokens = await User.getTokens(req.params.spotifyID)
  
  tokens
    ? res.json(tokens)
    : res.json({error: "message"})
})

module.exports = router;