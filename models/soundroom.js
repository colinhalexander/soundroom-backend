const knex = require('../config/knex')
const axios = require('axios')
const User = require('./user')
const { endpoints, makeSpotifyRequest } = require('../spotify')

class Soundroom {
  static async create(soundroomObj) {
    const playlist = await this.createPlaylist(soundroomObj.owner_id, soundroomObj.name)
    const soundroom = playlist
      ? (await knex('soundrooms').insert({
          ...soundroomObj,
          playlist_id: playlist.id
        }, '*'))[0]
      : null

    return soundroom
      ? { soundroom, playlist }
      : { error: "Unable to create SoundRoom" }
  }

  static async createPlaylist(spotifyID, name) {
    const response = await makeSpotifyRequest(
      spotifyID,
      endpoints.createPlaylist(spotifyID),
      { name }
    ).catch(error => console.log(error))

    return response.data 
  }
}

module.exports = Soundroom