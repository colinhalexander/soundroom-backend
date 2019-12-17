const router = require('express').Router()
const User = require('../models/user')

router.get('/:spotifyID', async (req, res) => {
  const profile = await User.getProfile(req.params.spotifyID)

  profile.id
    ? res.json(profile)
    : res.json({ error: "Unable to retrieve user information" })
})

router.get('/:spotifyID/token', async (req, res) => {
  const token = await User.getAccessToken(req.params.spotifyID)

  token
    ? res.json(token)
    : res.json({error: "User authentication failed"})
})

module.exports = router;