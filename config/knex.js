const environment = require('../knexfile').production

module.exports = require('knex')(environment)