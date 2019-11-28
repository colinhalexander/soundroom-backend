const knex = require('../config/knex')
const axios = require('axios')
const User = require('./user')
const { endpoints, makeSpotifyRequest } = require('../spotify')

class Soundroom {
  static async create(soundroomObj) {
    const soundroom = await knex('soundrooms').insert(soundroomObj, '*')

    if (soundroom[0]) {
      const playlist = await this.createPlaylist(
        soundroom[0].owner_id,
        soundroom[0].name
      )
    }

    return soundroom[0]
  }

  static async createPlaylist(spotifyID, name) {
    const playlist = await makeSpotifyRequest(
      spotifyID,
      endpoints.createPlaylist(spotifyID),
      { name }
    ).catch(error => console.log(error))

    return playlist 
  }
}

module.exports = Soundroom