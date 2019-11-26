const knex = require('../config/knex')

class Soundroom {
  static async create(soundroomObj) {
    console.log("Soundroom POST body:", req.body)
    // const soundroom = await knex('soundrooms').insert(req.body)[0]
    // console.log(soundroom)
  }
}

module.exports = Soundroom