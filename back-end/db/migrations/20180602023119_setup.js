
exports.up = function(knex, Promise) {
  return new Promise( (resolve, reject) => {
    knex.schema.createTable('users', function (table) {
      table.increments('id').primary();
      table.string('username').notNullable();
      table.string('email').notNullable();
      table.string('password').notNullable();
      table.string('first_name');
      table.string('last_name');
      table.string('profile_pic');
      table.integer('food_rank');
      table.integer('arts_rank');
      table.integer('nightlife_rank');
      table.integer('history_rank');
      table.integer('price_rank');
    })
    .then(() => {
      return knex.schema.createTable('trips', function (table) {
        table.increments('id').primary();
        table.string('name');
        table.dateTime('start_date');
        table.dateTime('end_date');
        table.integer('user_id').references('id').inTable('users');
      });
    })
    .then(() => {
      return knex.schema.createTable('cities', function (table) {
        table.increments('id').primary();
        table.string('name');
        table.integer('food_rank');
        table.integer('arts_rank');
        table.integer('nightlife_rank');
        table.integer('history_rank');
        table.integer('price_rank');
      });
    })
    .then(() => {
      return knex.schema.createTable('city_trip', function (table) {
        table.increments('id').primary();
        table.integer('city_id').references('id').inTable('cities');
        table.integer('trip_id').references('id').inTable('trips');
        table.integer('order');
        table.time('duration');
      });
    })
    .then( () => {
      resolve();
    })
    .then(() => {
      return knex.schema.createTable('favorite_cities', function (table) {
        table.increments('id').primary();
        table.integer('user_id').references('id').inTable('users');
        table.integer('city_id').references('id').inTable('cities');
      });
    })
    .catch( (error) => {
      reject(error);
    });
  });
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('favorite_cities'),
    knex.schema.dropTable('city_trip'),
    knex.schema.dropTable('cities'),
    knex.schema.dropTable('trips'),
    knex.schema.dropTable('users')
  ]);
};
