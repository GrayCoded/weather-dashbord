

var searchHistory = [];
var weatherApiRootUrl = 'https://api.openweathermap.org';
var Badge = "f2a5c3dfdcfcb9ddef25ebad1b9d7";

var searchForm = document.querySelector('#search-form')
var searchCity = document.querySelector('#search-input')
var todayContainer = document.querySelector('#weather-card')
var searchHistoryContainer = document.querySelector('#history-container')

function displaySearchHistory() {
  searchHistoryContainer.innerHTML = '';

  for (var i = searchHistory.length - 1; i >= 0; i--) {
    var btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('today forecast');
    btn.classList.add('sCity', 'btn-sCity');
    btn.setAttribute('data-search', searchHistory[i]);
    btn.textContext = searchHistory[i];
    searchHistoryContainer.append(btn);
  }
}

function addCity(search) {
  if (searchHistory.indexOf(search) !==-1) {
    return;
  }
  searchHistory.push(search);

  localStorage.setItem('search-history',JSON.stringify(searchHistory));
  displaySearchHistory();
}

function getCities() {
  var storedCities = localStorage.getItem('search-history');
  if (storedCities) {
    searchHistory = JSON.parse(storedCities);
  }
  displaySearchHistory();
}