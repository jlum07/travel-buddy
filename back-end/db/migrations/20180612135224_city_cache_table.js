
exports.up = function(knex, Promise) {
  return new Promise((resolve, reject) => {
    knex.schema.createTable('city_data_cache', (table) =>{
      table.increments('id').primary();
      table.string('city_name');
      table.time('time_stamp')
      table.jsonb('data');
    })
    .then(()=>{
      resolve();
    })
    .catch((error)=>{
      reject(error);
    });
  });
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('city_data_cache')
  ]);
};
