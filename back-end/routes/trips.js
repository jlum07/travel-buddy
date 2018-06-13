const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");
const API_KEY = require("../apikey.js");
const cityToCoordinates = require('../public/javascripts/cityToCoordinates.js');

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

  // Edit trip
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

  // Delete Trip
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

  // Get itinerary from trip: VIEW TRIP
  router.get('/:id', (req, res)=>{
    console.log("get trip id", Number(req.params.id));
    console.log('req.headers = ', req.headers);
    knex.select('*').from('itinerary_trip')
    .where('trip_id', '=', Number(req.params.id))
    // .andWhere('user_id', '=', req.query.user_id)
    .orderBy('start_date', 'asc')
    .then( rows => {

      // console.log(rows);
      res.send(rows);
    })
    .catch( error => {
      console.log(error)
    });
  })

  // Add a city/place to a trip
  router.post('/:trip_id/addplace', (req, res)=>{
    let incomingData = {
      tripId: req.params.trip_id,
      cityName: req.body.cityName,
      description: req.body.description,
      userId: req.body.userId,
      type: req.body.type,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    };
    // First, check if cityName is a legitiment city name:
    // Ideally this should call the internal endpoint: GET /autocorrect/:name, but the response
    //    doesnt seem to contain the corrected cityname, so I have copy and pasted the code
    //    from /routes/city.js


    let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${incomingData.cityName}&types=(cities)&key=${process.env.GOOGLE_MAPS_API_KEY || API_KEY.API_KEY}`

    fetch(url)
    .catch((googleAutocorrectError)=>{
      console.log('Error checking googlemaps autocorrect', googleAutocorrectError);
      res.status(500).send('Error checking googlemaps autocorrect');
    })
    .then(autocorrectResponse => autocorrectResponse.json())
    .then(json => {
      // console.log(json);
      if (json.status === 'REQUEST_DENIED'){
      console.log('Google Autocorrect API request DENIED (API KEY EXPIRED??)');
      res.status(500).send('Google API request Denied');
      }
      else if (json.predictions.length === 0){
        console.log('No cities found');
        res.status(206);
        res.send('City Name invalid, cannot add City');
      }
      else {
        // If city name is recognizable, add to database:
        var correctedCityName = json.predictions[0].description.split(',')[0];
        cityToCoordinates(correctedCityName)
        .then((results)=>{
          return knex('itinerary_trip').returning(['id', 'name'])
          .insert({
            name: correctedCityName,
            type: incomingData.type,
            description: incomingData.description,
            lat: results.lat, // find these
            lng: results.lng, // find these
            start_date: incomingData.startDate,
            end_date: incomingData.endDate,
            user_id: incomingData.userId,
            trip_id: incomingData.tripId
          })
        })
        .then((knexResponse)=>{
          console.log('knexResponse = ', knexResponse[0]);
          res.send(`sucessfully added ${knexResponse[0].name} to itinerary_trip`);
        })
        .catch((error)=>{
          console.log('Error inserting into Database (feilds missing??)');
          res.status(500).send('Error inserting into Database');
        })
      }
    })
  })

  // Edit itinerary event
  router.post('/editItinerary', (req, res)=>{
    console.log(req.body);
    knex('itinerary_trip')
    .where('id', '=', req.body.id)
    // .andWhere('trip_id', '=', req.params.trip_id)
    .update({
      name: req.body.name,
      description: req.body.description,
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


  router.delete('/:id', (req, res)=>{
    knex('itinerary_trip')
    .where('id', '=', req.body.itinerary_id)
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

  return router;
}