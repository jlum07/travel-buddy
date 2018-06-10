
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cities').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cities').insert({
        // id: 1,
        name: 'Paris',
        lat: 48.8567,
        lng: 2.3510,
        food_rank: 10,
        arts_rank: 9,
        nightlife_rank: 8,
        safety: 7,
        price_rank: 6
      })
    .then(()=>{
      return knex('cities').insert({
        name: 'Toronto',
        lat: 43.8163,
        lng: -79.4287,
        food_rank: 10,
        arts_rank: 9,
        nightlife_rank: 8,
        safety: 7,
        price_rank: 6
      })
    })
    .then(()=>{
      return knex('cities').insert({
        name: 'Los Angeles',
        lat: 34.3,
        lng: -118.15,
        food_rank: 10,
        arts_rank: 9,
        nightlife_rank: 8,
        safety: 7,
        price_rank: 6
      })
    })
    .then(()=>{
      return knex('cities').insert({
        name: 'Havana',
        lat: 23,
        lng: -82,
        food_rank: 10,
        arts_rank: 9,
        nightlife_rank: 8,
        safety: 7,
        price_rank: 6
      })
    })
    .then(()=>{
      return knex('cities').insert({
        name: 'Bogotá',
        lat: 4.598056,
        lng: -74.075833,
        food_rank: 10,
        arts_rank: 9,
        nightlife_rank: 8,
        safety: 7,
        price_rank: 6
      })
    })
    .then(()=>{
      return knex('cities').insert({
        name: 'Saint John',
        lat: 45.2796,
        lng: -66.0628,
        food_rank: 10,
        arts_rank: 9,
        nightlife_rank: 8,
        safety: 7,
        price_rank: 6
      })
    })


  });
};
