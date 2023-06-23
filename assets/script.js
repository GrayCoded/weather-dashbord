var cityInputEl = document.querySelector('#username');
var languageButtonsEl = document.querySelector('#language-buttons');
var currentWeatherEl = document.querySelector('#repos-container');
var listedCity = document.querySelector('#repo-search-term');
var cityApi = "api.openweathermap.org/data/2.5/forecast?q={" + city + "}&appid={" + badge + "}";
var testApi = "https://api.openweathermap.org/data/2.5/weather?q=London&mode=xml";
// var badge ="790f2a5c3dfdcfcb9ddef25ebad1b9d7"

var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var city = nameInputEl.value.trim();
  
    if (city) {
      getWeather(city);
  
      repoContainerEl.textContent = '';
      nameInputEl.value = '';
    } else {
      alert('Please enter a GitHub username');
    }
  };



var buttonClickHandler = function (event) {
    var language = event.target.getAttribute('data-language');
  
    if (language) {
      getFeaturedRepos(language);
  
      repoContainerEl.textContent = '';
    }
  };



var getWeather = function (weather) {
    var cityApi = "api.openweathermap.org/data/2.5/forecast?q={" + city + "}&appid={" + badge + "}";
}

function getCity (requestApi) 
    fetch(requestApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (var i=0; i < data.length; i++) {
                console.log(data);
            }
        });
     

test();