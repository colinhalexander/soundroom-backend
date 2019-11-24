const knex = require('../config/knex')

class User {
  static async findBySpotifyID(spotifyID) {
    const user = await knex('users').where('spotify_id', spotifyID)
    return user[0]
  }

  static async create(userObject) {
    const user = await knex('users').insert(userObject, ['id', 'spotify_id'])
    
    return user[0]
  }

  static async findOrCreate(userObject) {
    let user = await this.findBySpotifyID(userObject.spotify_id) 

    if (!user) {
      user = await this.create(userObject)
    }

    return user
  }

  static formatProfile(profile, accessToken, refreshToken) {
    return {
      spotify_id: profile.id,
      access_token: accessToken,
      token_expiration: null, // check out spotify response data and come back to this
      refresh_token: refreshToken
    }
  }
}

module.exports = User