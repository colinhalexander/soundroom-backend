const querystring = require('querystring')

const endpoints = {
  getCurrentTrack: {
    method: 'GET',
    uri: 'https://api.spotify.com/v1/me/player/currently-playing'
  },
  getDevices: {
    method: 'GET',
    uri: 'https://api.spotify.com/v1/me/player/devices'
  },
  createPlaylist: (spotifyID) => {
    return {
      method: 'POST',
      uri: `https://api.spotify.com/v1/users/${spotifyID}/playlists`
    }
  },
  addSongsToPlaylist: (playlistID) => {
    return {
      method: 'POST',
      uri: `https://api.spotify.com/v1/playlists/${playlistID}/tracks`
    }
  },
  removeSongsFromPlaylist: (playlistID) => {
    return {
      method: 'DELETE',
      uri: `https://api.spotify.com/v1/playlists/${playlistID}/tracks`
    }
  },
  getTopSongs: {
    method: 'GET',
    uri: 'https://api.spotify.com/v1/me/top/tracks?limit=50'
  },
  search: (query, types = ['track']) => {
    const qString = querystring.stringify({
      q: query,
      limit: 50,
      type: types.join(','),
      market: 'from_token'
    })

    return {
      method: 'GET',
      uri: `https://api.spotify.com/v1/search?${qString}`
    } 
  }
}

module.exports = endpoints