const axios = require('axios')
const encryptor = require('../config/encryptor')
const User = require('../models/user')

module.exports = async function makeSpotifyRequest(spotifyID, endpoint, requestBody) {
  const config = { 
    headers: {
      Authorization: 'Bearer ' +
        encryptor.decrypt((await User.getAccessToken(spotifyID)))
    }
  }

  switch(endpoint.method) {
    case 'GET':
      return await axios.get(endpoint.uri, config)
    case 'POST':
      return await axios.post(endpoint.uri, requestBody, config)
    case 'PUT':
      return await axios.put(endpoint.uri, requestBody, config)
    case 'DELETE':
      return await axios.delete(endpoint.uri, { data: requestBody, ...config})
    default:
      return null
  }
}