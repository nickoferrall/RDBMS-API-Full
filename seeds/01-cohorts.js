exports.seed = function(knex, Promise) {
  return knex('cohorts')
    .truncate()
    .then(function() {
      return knex('cohorts').insert([
        { name: 'web15' },
        { name: 'web14' },
        { name: 'web19' }
      ]);
    });
};
