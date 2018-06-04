
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          username: 'jlum',
          email: 'jlum@gmail.com',
          password: 'password',
          first_name: 'Justin',
          last_name: 'Lum',
          food_rank: 10,
          arts_rank: 5,
          nightlife_rank: 7,
          history_rank: 4,
          price_rank: 8
        },
        {
          id: 2,
          username: 'ry_guy',
          email: 'rolejnik@gmail.com',
          password: 'password',
          first_name: 'Ryan',
          last_name: 'Olejnik',
          food_rank: 2,
          arts_rank: 5,
          nightlife_rank: 8,
          history_rank: 8,
          price_rank: 9
        },
        {
          id: 3,
          username: 'imack',
          email: 'imack@gmail.com',
          password: 'password',
          first_name: 'Iain',
          last_name: 'MackKenzie',
          food_rank: 7,
          arts_rank: 6,
          nightlife_rank: 9,
          history_rank: 7,
          price_rank: 7}
      ]);
    });
};
