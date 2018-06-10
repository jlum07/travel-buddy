
exports.up = function(knex, Promise) {
  return new Promise( (resolve, reject) => {
    knex.schema.createTable('itinerary_trip', function (table) {
      table.increments('id').primary();
      // table.integer('city_id').references('id').inTable('cities').onDelete('CASCADE');
      table.string('name');
      table.string('type');
      table.integer('city_id');
      // table.integer('trip_id').references('id').inTable('trips').onDelete('CASCADE');
      table.integer('trip_id');
      table.time('duration');
      table.date('start_date');
      table.date('end_date');
      table.decimal('lat');
      table.decimal('lng');
      table.jsonb('data');
    })
    .then( () => {
      resolve();
    })
    .catch( (error) => {
      reject(error);
    });
  });
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('itinerary_trip')
  ]);
};
