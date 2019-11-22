const environment = require('../knexfile').development

module.exports = require('knex')(environment)