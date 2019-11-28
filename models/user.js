const knex = require('../config/knex')
const encryptor = require('../config/encryptor')
const axios = require('axios')
const querystring = require('querystring')

class User {
  static async find(spotifyID) {
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

  static async update(userObject) {
    const user = await knex('users')
                        .where('spotify_id', userObject.spotify_id)
                        .update(userObject, ['spotify_id', 'access_token'])
    return user[0]
  }

  static async updateOrCreate(userObject) {
    let user = await this.find(userObject.spotify_id) 

    user = user ? await this.update(userObject) : await this.create(userObject)

    return user
  }

  static async getAccessToken(spotifyID) {
    const tokensArray = await knex('users')
                                .where('spotify_id', spotifyID)
                                .select('access_token', 'refresh_token')
    
    let tokens = tokensArray[0]

    if ( !(await this.checkAccessToken(tokens.access_token)) ) {
      tokens = await this.refreshAccessToken(spotifyID, tokens.refresh_token)
    }
    
    return tokens.access_token
  }

  static async checkAccessToken(access_token) {
    const response = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: 'Bearer ' + encryptor.decrypt(access_token)
        }
      }).catch(() => null)
    
    return response ? true : false
  }

  static async refreshAccessToken(spotifyID, refreshToken) {
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
        console.log("refreshAccessToken error:", response.response.data)
      }))

    const tokens = await this.updateAccessToken(spotifyID, response.data.access_token)
    return tokens
  }

  static async updateAccessToken(spotifyID, accessToken) {
    const tokensArray = await knex('users')
            .where('spotify_id', spotifyID)
            .update(
              { access_token: encryptor.encrypt(accessToken) },
              ['access_token', 'refresh_token']
            )
    
    return tokensArray[0]
  }

  static async getProfile(spotifyID) {
    const accessToken = await this.getAccessToken(spotifyID),
          response = await axios.get(`https://api.spotify.com/v1/me`, {
              headers: {
                Authorization: 'Bearer ' + encryptor.decrypt(accessToken)
              }
            }
          )
    
    return response.data
  }
}

module.exports = User