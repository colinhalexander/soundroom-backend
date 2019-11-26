const knex = require('../config/knex')
const encryptor = require('../config/encryptor')
const axios = require('axios')
const querystring = require('querystring')

class User {
  static async findBySpotifyID(spotifyID) {
    const user = await knex('users')
                        .where('spotify_id', spotifyID)
                        .select('spotify_id', 'access_token')
    return user[0]
  }

  static async create(userObject) {
    const user = await knex('users')
                        .insert(userObject, ['spotify_id', 'access_token'])
    return user[0]
  }

  static async findOrCreate(userObject) {
    let user = await this.findBySpotifyID(userObject.spotify_id) 

    if (!user) {
      user = await this.create(userObject)
    }

    return user
  }

  static async getTokens(spotifyID) {
    const tokenObjects = await knex('users')
                          .where('spotify_id', spotifyID)
                          .select('access_token', 'refresh_token')
    
    return tokenObjects[0]
  }

  static async getNewAccessToken(refreshToken) {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token/', 
      querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: encryptor.decrypt(refreshToken)
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')
        }
      }).catch((response => {
        console.log("error:", response.response.data)
      }))
    
    return response.data.access_token
  }

  static async updateAccessToken(spotifyID, accessToken) {
    await knex('users')
            .where('spotify_id', spotifyID)
            .update({ access_token: encryptor.encrypt(accessToken) })
  }

  static async getProfile(spotifyID) {
    const tokens = await this.getTokens(spotifyID),
          response = await axios.get(
            `https://api.spotify.com/v1/me`, 
            {
              headers: {
                Authorization: 'Bearer ' + encryptor.decrypt(tokens.access_token)
              }
            })
            .catch(async (response) => {
              if (response.response.status === 401) {
                const accessToken = await this.getNewAccessToken(tokens.refresh_token)
                await this.updateAccessToken(spotifyID, accessToken)
                return await this.getProfile(spotifyID)
              } else {
                console.log("error:", response.response.data)
              }
            })
    
    return response.data
  }
}

module.exports = User