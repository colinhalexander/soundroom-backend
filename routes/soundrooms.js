const router = require('express').Router()
const Soundroom = require('../models/soundroom')

router.post('/', async (req, res, next) => {
  const soundroom = await Soundroom.create(req.body)
  res.json(soundroom)
})

module.exports = router