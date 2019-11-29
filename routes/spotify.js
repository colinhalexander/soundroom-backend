const router = require('express').Router()
const { endpoints, makeSpotifyRequest } = require('../spotify')

router.get('/:spotifyID/top/songs', async (req, res, next) => {
  const response = await makeSpotifyRequest(
    req.params.spotifyID,
    endpoints.getTopSongs,
    null
  ).catch(error => console.log(error))
  res.json(response.data)
})

module.exports = router