var express = require('express');
var router = express.Router();

module.exports = (knex) => {

  router.post('/register', (req, res)=>{
    // console.log(req.body);
    knex('users')
    .insert({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      food_rank: req.body.rank_food,
      arts_rank: req.body.rank_arts,
      nightlife_rank: req.body.rank_nightlife,
      history_rank: req.body.rank_history,
      price_rank: req.body.rank_price,
    })
    .then((result)=>{
      console.log(result.command);
      if (result.command === 'INSERT'){
        res.status(200);
        res.send('Registration Succesful!');
      }
    })
    .catch((error)=>{
      res.status(400);
      res.send(error);
      console.log(error);
    });
  })

  router.delete('/logout', (req, res)=>{
    console.log('Logging out...');
    res.send('Logging out...');
  })


  router.post('/login', (req, res)=>{
    console.log(req.body);

    knex.select('*').from('users')
    .where('email', '=', req.body.email)
    .then((results)=>{
      // console.log('req.body.password = ', req.body.password);
      // console.log('results[0].password = ', results[0].password);

      if (results.length === 0){
        res.status(401);
        res.send('email does not match');
      }
      else if (results[0].password === req.body.password){
        res.status(202);
        res.send(results[0].username);
      }
      else{
        res.status(401);        
        res.send('incorrect password');
      }
    })
    .catch((error)=>{
      console.log(error)
    });
  })





  return router;
}

