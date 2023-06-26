var cityInputEl = document.querySelector('#username');
var languageButtonsEl = document.querySelector('#language-buttons');
var currentWeatherEl = document.querySelector('#repos-container');
var listedCity = document.querySelector('#repo-search-term');
var city = ('Edmonton')
var badge = process.env.API_KEY;
var cityApi ='https:/api.openweathermap.org/data/2.5/forecast?q=' + city +'&appid=' + badge;
require('dotenv').config();

  fetch(cityApi)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

 