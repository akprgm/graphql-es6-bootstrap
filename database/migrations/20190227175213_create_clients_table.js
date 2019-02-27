exports.up = function (knex) {
  return knex.schema.createTable('clients', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('email').unique().index().notNullable();
    table.string('password').notNullable();
    table.string('refresh_token').notNullable();
    table.timestamps(false, true);
    table.dateTime('deleted_at');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('clients');
};
