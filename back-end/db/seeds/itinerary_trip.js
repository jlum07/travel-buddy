
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('itinerary_trip').truncate()
    .then( () => {
      return knex('itinerary_trip').insert({
        // id: 1,
        type: "city",
        name: "Toronto",
        description: "Pitstop at home.",
        lat: 43.8163,
        lng: -79.4287,
        start_date: "2018-07-11",
        end_date: "2018-07-17",
        trip_id: 1,
        user_id: 1
      })
    })
    .then( () => {
      return knex('itinerary_trip').insert({
        // id: 1,
        type: "city",
        name: 'Los Angeles',
        description: "City of angles?",
        lat: 34.3,
        lng: -118.15,
        start_date: "2018-07-22",
        end_date: "2018-07-25",
        trip_id: 1,
        user_id: 1
        })
      })
    .then( () => {
      return knex('itinerary_trip').insert({
        // id: 1,
        type: "city",
        name: 'Havana',
        description: "Cubanos!",
        lat: 23,
        lng: -82,
        start_date: "2018-08-01",
        end_date: "2018-08-05",
        trip_id: 1,
        user_id: 1
      })
    })
    .then( () => {
      return knex('itinerary_trip').insert({
        // id: 1,
        type: "city",
        name: 'Bogotá',
        description: "Research things to do here.",
        lat: 4.598056,
        lng: -74.075833,
        start_date: "2018-08-07",
        end_date: "2018-08-15",
        trip_id: 1,
        user_id: 1
      })
    .then( () => {
      // Inserts seed entries
      return knex('itinerary_trip').insert({
        // id: 1,
        type: "city",
        name: "Paris",
        description: "French food!!",
        lat: 48.8567,
        lng: 2.3510,
        start_date: "2018-08-16",
        end_date: "2018-08-20",
        trip_id: 1,
        user_id: 1
      })
    })
  });
};
