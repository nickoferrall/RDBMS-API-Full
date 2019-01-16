exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', function(tbl) {
    tbl.increments('id');
    tbl.string('name', 255);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts');
};
