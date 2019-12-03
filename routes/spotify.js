const router = require('express').Router()
const { endpoints, makeSpotifyRequest } = require('../spotify')

router.get('/:spotifyID/top/songs', async (req, res, next) => {
  const response = await makeSpotifyRequest(
    req.params.spotifyID,
    endpoints.getTopSongs,
    null
  ).catch(error => console.log(error.response.data))

  response
    ? res.json(response.data)
    : res.json({ error: "Unable to access top songs" })
})

router.post('/:spotifyID/search', async (req, res, next) => {
  const response = await makeSpotifyRequest(
    req.params.spotifyID,
    endpoints.search(req.body.query),
    null,
  ).catch(error => console.log(error.response.data))
 
  response
    ? res.json(response.data)
    : res.json({ error: "Unable to retrieve search results" })
})

router.post('/:spotifyID/:playlistID/songs', async (req, res, next) => {
  const response = await makeSpotifyRequest(
    req.params.spotifyID,
    endpoints.addSongsToPlaylist(req.params.playlistID),
    req.body
  ).catch(error => console.log(error.response.data))

  response
    ? res.json(response.data)
    : res.json({ error: "Unable to add song to playlist" })
})

router.delete('/:spotifyID/:playlistID/songs', async (req, res, next) => {
  const response = await makeSpotifyRequest(
    req.params.spotifyID,
    endpoints.removeSongsFromPlaylist(req.params.playlistID),
    req.body
  ).catch(error => console.log(error.response.data))

  response
    ? res.json(response.data)
    : res.json({ error: "Unable to remove song from playlist" })
})

module.exports = router