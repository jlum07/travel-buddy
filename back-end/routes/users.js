var express = require('express');
var router = express.Router();
var uuid = require('uuid');
var bcrypt = require('bcryptjs');

module.exports = (knex) => {
  router.post('/register', (req, res)=>{
    // console.log(req.body);
    knex('users')
    .insert({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 6),
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
    // console.log(req.body);
    knex.select('*').from('users')
    .where('email', '=', req.body.email)
    .then((results)=>{
      // console.log('req.body.password = ', req.body.password);
      // console.log('results[0].password = ', results[0].password);

      if (results.length === 0){
        res.status(401);
        res.send('email does not match');
      }

      else if (bcrypt.compareSync(req.body.password, results[0].password)){
        // add a session token to database for that user:
        let user = results[0];
        let new_session_token = uuid();

        knex.select('*').from('users')
        .where('email', '=', req.body.email)
        .update({
          session_token: new_session_token
        })
        .then(()=>{
          knex.select('*').from('users')
          .where('email', '=', req.body.email)
          .then((updatedResults)=>{
            // send the user data (with the new session_token) back to the client 
            res.status(202);
            let login_data = {
              username: updatedResults[0].username,
              session_token: updatedResults[0].session_token
            }
            res.send(updatedResults[0]); // MODIFY TO ONLY SEND USERNAME AND SESSION_TOKEN
          })
        })
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

  router.get('/profile_data', (req, res)=>{
    // console.log(req.headers.session_token);
    knex.select('*').from('users')
    .where('session_token', '=', req.headers.session_token)
    .then((results)=>{
      if (results.length === 0){
        // Token is invalid
        res.status(401);
        res.send('Token is invalid');
      }
      else {
        res.status(200);
        res.send(results[0]);
      }
    })
    .catch((error)=>{
      console.log(error);
      res.status(500);
      res.send('Error Querying Database');
    });
  })

  router.get('/basic_data', (req, res)=>{
    // console.log(req);
    knex.select('*').from('users')
    .where('session_token', '=', req.headers.session_token)
    .then((results)=>{
      if (results.length === 0){
        // Token is invalid
        res.status(401);
        res.send('Token is invalid');
      }
      else {
        res.status(200);
        let basic_data = { username: results[0].username, id: results[0].id }
        res.send(basic_data);
      }
    })
    .catch((error)=>{
      console.log(error);
      res.status(500);
      res.send('Error Querying Database');
    });
  })



  return router;
}

