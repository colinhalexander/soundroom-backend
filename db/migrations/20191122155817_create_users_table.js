exports.up = function(knex) {
  return knex.schema.createTable('users', (t) => {
    t.increments()

    t.string('spotify_id')
    t.string('access_token')
    t.string('token_expiration')
    t.string('refresh_token')

    t.timestamps()
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
