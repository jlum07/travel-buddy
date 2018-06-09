var express = require('express');
var router = express.Router();

module.exports = (knex) => {

  // Get list of trip for logged in user
  router.get('/', (req, res)=>{
    knex.select('*').from('trips')
    .where('user_id', '=', req.query.user_id)
    .orderBy('start_date', 'asc')
    .then( rows => {
      // console.log(rows);
      res.send(rows);
    })
   .catch( error => {
      console.log(error)
    });
  })

  // Create new trip
  router.put('/', (req, res)=>{
    knex('trips').returning('id')
    .insert({
      name: req.body.name,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      user_id: req.body.user_id
      // user_id: req.body
    })
    .then((result)=>{
      console.log(result[0]);
      // if (result.command === 'INSERT'){
        res.sendStatus(201).send(result[0]);
        // res.send(result[0]);
        // res.send('New Trip Added!');
      // }
    })
    .catch((error)=>{
      res.status(400).send(error);
      console.log(error);
    });

  })

  router.post('/', (req, res)=>{
    console.log(req.body);
    knex('trips')
    .where('id', '=', req.body.trip_id)
    .andWhere('user_id', '=', req.body.user_id)
    .update({
      name: req.body.name,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
    })
    .then((result)=>{
      console.log(result);
      // if (result.command === 'INSERT'){
        res.sendStatus(201).send(result);
        // res.send(result[0]);
        // res.send('New Trip Added!');
      // }
    })
    .catch((error)=>{
      res.status(400).send(error);
      console.log(error);
    });



  })

  router.delete('/', (req, res)=>{
    knex('trips')
    .where('id', '=', req.body.trip_id)
    .del()
    .then( (result ) => {
      console.log(result);
      // res.send(rows);
      if (result === 1) {
        res.status(200).send("Success");
      } else {
        res.status(404).send("Failed");
      }
    })
   .catch( error => {
      console.log("Catche", error)
      res.status(405).send(error);
    });
  })


  router.get('/:id', (req, res)=>{



    knex.select('*').from('trips')
    .where('user_id', '=', req.query.user_id)
    .orderBy('start_date', 'asc')
    .then( rows => {
      // console.log(rows);
      res.send(rows);
    })
    .catch( error => {
      console.log(error)
    });




  })

  return router;
}