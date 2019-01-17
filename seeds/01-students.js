exports.seed = function(knex, Promise) {
  return knex('students')
    .truncate()
    .then(function() {
      return knex('students').insert([
        { name: 'steve', cohort_id: 1 },
        { name: 'stevo', cohort_id: 2 },
        { name: 'stephen', cohort_id: 3 }
      ]);
    });
};
