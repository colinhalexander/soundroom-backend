exports.up = function(knex) {
  return knex.schema.createTable('users', (t) => {
    t.string('spotify_id')
      t.primary('spotify_id')
    t.text('access_token')
    t.text('refresh_token')

    t.timestamps()
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
