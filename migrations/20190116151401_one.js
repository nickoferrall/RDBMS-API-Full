exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', function(tbl) {
    // primary key
    tbl.increments('id');
    // other fields
    tbl.string('name', 255);
    // timestamps
  });
};

exports.down = function(knex, Promise) {
  return;
};
