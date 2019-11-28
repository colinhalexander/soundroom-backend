const querystring = require('querystring')

const endpoints = {
  getCurrentTrack: {
    method: 'GET',
    uri: 'https://api.spotify.com/v1/me/player/currently-playing'
  },
  getRecentlyPlayed: {
    method: 'GET',
    uri: 'https://api.spotify.com/v1/me/player/recently-played'
  },
  getDevices: {
    method: 'GET',
    uri: 'https://api.spotify.com/v1/me/player/devices'
  },
  nextTrack: {
    method: 'POST',
    uri: 'https://api.spotify.com/v1/me/player/next'
  },
  previousTrack: {
    method: 'POST',
    uri: 'https://api.spotify.com/v1/me/player/previous'
  },
  pauseTrack: {
    method: 'PUT',
    uri: 'https://api.spotify.com/v1/me/player/pause'
  },
  playTrack: {
    method: 'PUT',
    uri: 'https://api.spotify.com/v1/me/player/play'
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
  getSavedSongs: {
    method: 'GET',
    uri: 'https://api.spotify.com/v1/me/tracks'
  },
  getTopSongs: {
    method: 'GET',
    uri: 'https://api.spotify.com/v1/me/top/tracks'
  },
  search: (query, types = ['album', 'artist', 'playlist', 'track']) => {
    const qString = querystring.stringify({
      q: query,
      type: types.join(''),
      market: 'from_token'
    })

    return {
      method: 'GET',
      uri: `https://api.spotify.com/v1/search?${qString}`
    } 
  }
}

module.exports = endpoints