const router = require('express').Router()
const Soundroom = require('../models/soundroom')

router.post('/', async (req, res, next) => {
  const soundroomAndPlaylist = await Soundroom.create(req.body)
  res.json(soundroomAndPlaylist)
})

module.exports = router