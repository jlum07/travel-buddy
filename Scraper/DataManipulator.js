const data = require("../back-end/cityChatRaw");

let citiesData = {};

//Top food place data
var re = /\.\s([\w\s]*),/;
const totalFoodCities = data.food.length;
data.food.forEach((element, index) => {
  let match = element.match(re)[1];
  let foodScore = 4 + (index / (totalFoodCities - 1)) * 6;
  if (!citiesData[match]) {
    citiesData[match] = {
      food: foodScore,
      culture: null,
      nightlife: null,
      safety: null,
      cost: null
    };
  }
});

//Top culture place data
let re2 = /\.\s([\w\s]*),/;
const totalCultureCities = data.culture.length;

data.culture.forEach((element, index) => {
  let match = element.match(re2)[1];
  //console.log(match)

  let cultureScore = 5 + (index / (totalCultureCities - 1)) * 5;
  if (!citiesData[match]) {
    citiesData[match] = {
      food: null,
      culture: cultureScore,
      nightlife: null,
      safety: null,
      cost: null
    };
  } else {
    citiesData[match].culture = cultureScore;
  }
});

//Nightlife

let totalNightlifeCities = data.nightlife.length;

data.nightlife.forEach((element, index) => {
  let nightlifeScore =
    5 + ((totalNightlifeCities - index) / totalNightlifeCities) * 5;
  if (!citiesData[element]) {
    citiesData[element] = {
      food: null,
      culture: null,
      nightlife: nightlifeScore,
      safety: null,
      cost: null
    };
  } else {
    citiesData[element].nightlife = nightlifeScore;
  }
});

//Safety
let totalSafetyCities = data.safety.length;

data.safety.forEach((element, index) => {
  let SafetyScore = 6 + ((totalSafetyCities - index) / totalSafetyCities) * 4;
  if (!citiesData[element]) {
    citiesData[element] = {
      food: null,
      culture: null,
      nightlife: null,
      safety: SafetyScore,
      cost: null
    };
  } else {
    citiesData[element].safety = SafetyScore;
  }
});

//Cost
let filteredCost = [];
let re3 = /^([\w-\(\)\s']*),/;
data.cost.forEach((element, index) => {
  filteredCost.push({
    name: element.name.match(re3)[1],
    costScore: (element.index / 136.83) * 10
  });
});

//Updating city data with cost
for (let city in citiesData) {
  let matchedElement = filteredCost.find(e => {
    return e.name == city;
  });
  if (matchedElement) {
    citiesData[city].cost = matchedElement.costScore;
  }
}

for (let city in citiesData){
  for(let attr in citiesData[city]){
    if(citiesData[city][attr] === null){
      citiesData[city][attr] = Math.random() * 6
    }
    citiesData[city][attr] = Math.round(citiesData[city][attr] * 100) / 100
  }
}



console.log(citiesData)
// let test = [];
// for (let city in citiesData) {
//   console.log(
//     `${city} ${citiesData[city].food} ${citiesData[city].culture} ${
//       citiesData[city].nightlife
//     } ${citiesData[city].safety} ${citiesData[city].cost}`
//   );
// }
//console.log(test.sort())
