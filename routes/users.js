const router = require('express').Router()
const User = require('../models/user')

router.get('/:spotifyID', async (req, res, next) => {
  const profile = await User.getProfile(req.params.spotifyID)
  res.json(profile)
})

module.exports = router;