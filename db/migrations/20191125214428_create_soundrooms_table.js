exports.up = function(knex) {
  return knex.schema.createTable('soundrooms', (t) => {
    t.increments()

    t.string('name')
    t.string('owner_id')
      t.foreign('owner_id').references('users.spotify_id')

    t.timestamps()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('soundrooms')
};
