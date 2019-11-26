const knex = require('../config/knex')

class Soundroom {
  static async create(soundroomObj) {
    const soundroom = await knex('soundrooms').insert(soundroomObj, '*')
    return soundroom[0]
  }
}

module.exports = Soundroom