var searchFormEl = document.querySelector('#search-form')
var nameInputEl = document.querySelector('#city');
var currentWeatherEl = document.querySelector('#weather-container');
var listedCity = document.querySelector('#city-container');
var newBadge = "f2a5c3dfdcfcb9ddef25ebad1b9d7";





fetch('https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15&appid=f2a5c3dfdcfcb9ddef25ebad1b9d7&units=metric', {
  method: 'GET',
  credentials: 'same-origin',
  redirect: 'follow', //
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
