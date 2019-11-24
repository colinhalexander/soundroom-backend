const knex = require('../config/knex')

class User {
  static async findBySpotifyID(spotifyID) {
    const user = await knex('users').where('spotify_id', spotifyID)
    return user[0]
  }

  static async create(userObject) {
    const returnVars = ['id', 'spotify_id'],
          user = await knex('users').insert(userObject, returnVars)
    
    return user[0]
  }

  static async findOrCreate(userObject) {
    let user = await this.findBySpotifyID(userObject.spotify_id) 

    if (!user) {
      user = await this.create(userObject)
    }

    return user
  }
}

module.exports = User