//Takes in a city, auto completes the place id
//then returns the place details

const apikey = require('./apikey.js');
const fetch = require("node-fetch");

module.exports = async function(searchInput) {

    let placeAutoURL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchInput}&types=(cities)&key=${apikey.API_KEY}`
    let response = await fetch(placeAutoURL)
    let json = await response.json()

    console.log(json)
    let placeDescriptionURL = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${json.predictions[0].place_id}&key=${apikey.API_KEY}`
    response = await fetch(placeDescriptionURL);
    let placeDescription = await response.json();

    return placeDescription
}
