exports.up = function(knex, Promise) {
  return new Promise( (resolve, reject) => {
    knex.schema.createTable('users', function (table) {
      table.increments('id').primary();
      table.string('username').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.string('first_name');
      table.string('last_name');
      table.string('profile_pic');
      table.integer('food_rank');
      table.integer('arts_rank');
      table.integer('nightlife_rank');
      table.integer('safety_rank');
      table.integer('price_rank');
      table.string('session_token').unique();
    })
    .then(() => {
      return knex.schema.createTable('trips', function (table) {
        table.increments('id').primary();
        table.string('name');
        table.date('start_date');
        table.date('end_date');
        // table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
        table.integer('user_id');
      });
    })
    .then(() => {
      return knex.schema.createTable('cities', function (table) {
        table.increments('id').primary();
        table.string('name').unique();
        table.decimal('lat');
        table.decimal('lng');
        table.integer('food_rank');
        table.integer('arts_rank');
        table.integer('nightlife_rank');
        table.integer('safety');
        table.integer('price_rank');
        table.jsonb('cache');
      });
    })
    .then(() => {
      return knex.schema.createTable('city_trip', function (table) {
        table.increments('id').primary();
        // table.integer('city_id').references('id').inTable('cities').onDelete('CASCADE');
        table.integer('city_id');
        // table.integer('trip_id').references('id').inTable('trips').onDelete('CASCADE');
        table.integer('trip_id');
        table.integer('order');
        table.time('duration');
        table.date('start_date');
        table.date('end_date');
      });
    })
    .then(() => {
      return knex.schema.createTable('favorite_cities', function (table) {
        table.increments('id').primary();
        // table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
        table.integer('user_id');
        // table.integer('city_id').references('id').inTable('cities').onDelete('CASCADE');
        table.integer('city_id');
      });
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
    knex.schema.dropTable('favorite_cities'),
    knex.schema.dropTable('city_trip'),
    knex.schema.dropTable('cities'),
    knex.schema.dropTable('trips'),
    knex.schema.dropTable('users')
  ]);
};
