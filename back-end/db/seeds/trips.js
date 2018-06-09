
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('trips').truncate()
    .then( () => {
      // Inserts seed entries
      return knex('trips').insert({
        // id: 1,
        name: "Japan",
        start_date: "2018-07-07",
        end_date: "2018-07-22",
        user_id: 1
      })
    .then( () => {
      return knex('trips').insert({
        // id: 1,
        name: "Europe",
        start_date: "2018-08-07",
        end_date: "2018-09-07",
        user_id: 1
      })
    })
    .then( () => {
      return knex('trips').insert({
        // id: 1,
        name: "Mexico",
        start_date: "2018-10-07",
        end_date: "2018-11-07",
        user_id: 1
      })
    })
  });
};
