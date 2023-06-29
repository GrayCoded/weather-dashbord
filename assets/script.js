var searchHistory = [];
var weatherApiRootUrl = 'https://api.openweathermap.org';
var apiKey = '790f2a5c3dfdcfcb9ddef25ebad1b9d7'; 
var searchInput = document.querySelector('#search-input');
var todayContainer = document.querySelector('.weather-card');
var searchForm = document.querySelector('#search-form')
var searchHistoryContainer = document.querySelector('#history-container');

function renderSearchHistory() {
  searchHistoryContainer.innerHTML = '';

  for (var i = searchHistory.length - 1; i >= 0; i--) {
    var btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-controls', 'today forecast')
    btn.classList.add('sCity', 'btn-sCity');
    btn.setAttribute('data-search', searchHistory[i]);
    btn.textContent = searchHistory[i];
    searchHistoryContainer.appendChild(btn);
  }
}

function appendToHistory(search) {
  if (searchHistory.indexOf(search) !== -1) {
    return;
  }
  searchHistory.push(search);

  localStorage.setItem('search-history', JSON.stringify(searchHistory));
  renderSearchHistory();
}

function initSearchHistory() {
  var storedHistory = localStorage.getItem('search-history');
  if (storedHistory) {
    searchHistory = JSON.parse(storedHistory);
  }
  renderSearchHistory();
}

function renderCurrentWeather(city, weather) {
  var date = dayjs().format('M/D/YYYY');
  var tempF = weather.main.temp;
  var windMph = weather.wind.speed;
  var humidity = weather.main.humidity;
  var iconUrl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
  var iconDescription = weather.weather[0].description || weather.weather[0].main;

  var card = document.createElement('div');
  var cardBody = document.createElement('div');
  var heading = document.createElement('h2');
  var weatherIcon = document.createElement('img');
  var tempEl = document.createElement('p');
  var windEl = document.createElement('p');
  var humidityEl = document.createElement('p');

  card.setAttribute('class', 'card');
  cardBody.setAttribute('class', 'card-body');
  card.append(cardBody);

  heading.setAttribute('class', 'h3 card-title');
  tempEl.setAttribute('class', 'card-text temp');
  windEl.setAttribute('class', 'card-text wind');
  humidityEl.setAttribute('class', 'card-text humidity');

  heading.textContent = `${city} (${date})`;
  weatherIcon.setAttribute('src', iconUrl);
  weatherIcon.setAttribute('alt', iconDescription);
  weatherIcon.setAttribute('class', 'weather-img');
  heading.append(weatherIcon);
  tempEl.textContent = `Temp: ${tempF}°C`;
  windEl.textContent = `Wind: ${windMph} MPH`;
  humidityEl.textContent = `Humidity: ${humidity} %`;
  cardBody.append(heading, tempEl, windEl, humidityEl);

  todayContainer.innerHTML = '';
  todayContainer.append(card);
}

function renderForecast(forecastData) {
  var forecastCards = document.querySelectorAll('.forecast-cards .card');

  forecastCards.forEach(function(card, index) {
    var forecast = forecastData[index];
    var date = dayjs.unix(forecast.dt).format('M/D/YYYY');
    var tempF = forecast.temp.day;
    var windMph = forecast.wind_speed;
    var humidity = forecast.humidity;
    var iconUrl = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
    var iconDescription = forecast.weather[0].description || forecast.weather[0].main;

    var dateEl = card.querySelector('.date');
    var tempEl = card.querySelector('.temp');
    var windEl = card.querySelector('.wind');
    var humidityEl = card.querySelector('.humidity');
    var iconEl = card.querySelector('.icon');

    dateEl.textContent = date;
    tempEl.textContent = `Temp: ${tempF}°C`;
    windEl.textContent = `Wind: ${windMph} MPH`;
    humidityEl.textContent = `Humidity: ${humidity} %`;
    iconEl.src = iconUrl;
    iconEl.alt = iconDescription;
  });
}

function handleSearchFormSubmit(event) {
  event.preventDefault();
  var searchValue = searchInput.value.trim();
  if (searchValue) {
    appendToHistory(searchValue);
    getWeather(searchValue);
    searchInput.value = '';
  }
}

function handleSearchFormSubmitClick(event) {
  var target = event.target;
  if (target.matches('.btn-sCity')) {
    var searchValue = target.getAttribute('data-search');
    if (searchValue) {
      getWeather(searchValue);
    }
  }
}

function getWeather(location) {
  var apiUrl = `${weatherApiRootUrl}/data/2.5/weather?q=${location}&appid=${apiKey}`;

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderCurrentWeather(data.name, data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

initSearchHistory();
searchForm.addEventListener('click', handleSearchFormSubmit);
searchHistoryContainer.addEventListener('click', handleSearchFormSubmitClick);