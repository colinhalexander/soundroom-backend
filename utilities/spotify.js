const endpoints = {
  getCurrentTrack: {
    method: 'GET',
    uri: '/v1/me/player/currently-playing'
  },
  getRecentlyPlayed: {
    method: 'GET',
    uri: '/v1/me/player/recently-played'
  },
  getDevices: {
    method: 'GET',
    uri: '/v1/me/player/devices'
  },
  nextTrack: {
    method: 'POST',
    uri: '/v1/me/player/next'
  },
  previousTrack: {
    method: 'POST',
    uri: '/v1/me/player/previous'
  },
  pauseTrack: {
    method: 'PUT',
    uri: '/v1/me/player/pause'
  },
  playTrack: {
    method: 'PUT',
    uri: '/v1/me/player/play'
  }
}

module.exports = {
  endpoints
}