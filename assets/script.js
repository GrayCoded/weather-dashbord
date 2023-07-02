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
  var temp = weather.main.temp;
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
  tempEl.textContent = `Temp: ${temp}°C`;
  windEl.textContent = `Wind: ${windMph} MPH`;
  humidityEl.textContent = `Humidity: ${humidity} %`;
  cardBody.append(heading, tempEl, windEl, humidityEl);

  todayContainer.innerHTML = '';
  todayContainer.append(card);
}

function renderForecast(forecastData) {
  var forecastContainer = document.querySelector('.forecast');

  forecastContainer.innerHTML = '';


  for (var i = 0; i < forecastData.length; i++) {
    var forecast = forecastData[i];
    var card = document.createElement('div');
    card.setAttribute('class', 'forecast-card');

 
    var dateEl = document.createElement('p');
    dateEl.setAttribute('class', 'date');
    dateEl.textContent = forecast.date;
    card.appendChild(dateEl);

    var iconEl = document.createElement('img');
    iconEl.setAttribute('class', 'icon');
    iconEl.setAttribute('src', forecast.iconUrl);
    card.appendChild(iconEl);

    var windEl = document.createElement('p');
    windEl.setAttribute('class', 'wind');
    windEl.textContent = 'Wind: ' + forecast.wind + ' MPH';
    card.appendChild(windEl);

    var tempEl = document.createElement('p');
    tempEl.setAttribute('class', 'temp');
    tempEl.textContent = 'Temp: ' + forecast.temp + '°C';
    card.appendChild(tempEl);

    var humidityEl = document.createElement('p');
    humidityEl.setAttribute('class', 'humidity');
    humidityEl.textContent = 'Humidity: ' + forecast.humidity + '%';
    card.appendChild(humidityEl);

    forecastContainer.appendChild(card);
  }
}

function getWeather(location) {
  var apiUrl = `${weatherApiRootUrl}/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderCurrentWeather(data.name, data);
      getForecast(location);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getForecast(location) {
  var forecastUrl = `${weatherApiRootUrl}/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

  fetch(forecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var forecastData = [];
      var forecasts = data.list;

    
      for (var i = 0; i < forecasts.length; i += 8) {
        var forecast = forecasts[i];
        var date = dayjs(forecast.dt_txt).format('M/D/YYYY');
        var temp = forecast.main.temp;
        var wind = forecast.wind.speed;
        var humidity = forecast.main.humidity;
        var iconUrl = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;

        forecastData.push({
          date: date,
          temp: temp,
          wind: wind,
          humidity: humidity,
          iconUrl: iconUrl
        });
      }

      renderForecast(forecastData);
    })
    .catch(function (error) {
      console.log(error);
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


initSearchHistory();
searchForm.addEventListener('submit', handleSearchFormSubmit);
searchHistoryContainer.addEventListener('submit', handleSearchFormSubmitClick);