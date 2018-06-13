
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(() => {
      return knex('users').insert({
        // id: 1
          username: 'jlum',
          email: 'jlum@gmail.com',
          password: '$2a$06$WWyLPzAWkgx6gCVHMcxl9uyFsPJyR3HIrWD80mYjX64uaU2oitqtG', // 'password'
          first_name: 'Justin',
          last_name: 'Lum',
          food_rank: 10,
          arts_rank: 5,
          nightlife_rank: 7,
          safety_rank: 4,
          price_rank: 8,
          profile_pic: 'https://nwtgroup.com/wp-content/uploads/2016/10/LumBlueB-480x600.jpg'
      })
    })
    .then(()=>{
        return knex('users').insert({
        // id: 2
        username: 'ry_guy',
        email: 'rolejnik@gmail.com',
        password: '$2a$06$WWyLPzAWkgx6gCVHMcxl9uyFsPJyR3HIrWD80mYjX64uaU2oitqtG', // 'password'
        first_name: 'Ryan',
        last_name: 'Olejnik',
        food_rank: 2,
        arts_rank: 5,
        nightlife_rank: 8,
        safety_rank: 8,
        price_rank: 9,
        profile_pic: 'https://postmediatorontosun.files.wordpress.com/2018/02/trudeau-1-e1518282562267.jpg'
      })
    })
    .then(()=>{
      return knex('users').insert({
          // id: 3
          username: 'imack',
          email: 'imack@gmail.com',
          password: '$2a$06$WWyLPzAWkgx6gCVHMcxl9uyFsPJyR3HIrWD80mYjX64uaU2oitqtG', // 'password'
          first_name: 'Iain',
          last_name: 'MackKenzie',
          food_rank: 7,
          arts_rank: 6,
          nightlife_rank: 9,
          safety_rank: 7,
          price_rank: 7,
          profile_pic: 'https://media.apnarm.net.au/media/images/2017/05/23/b88763293z1_20170523150232_000gefkndiq2-0-krnajiz22q0xfy3cao2_fct1588x1179x446x105_ct677x380.jpg'
        })
    })
};
