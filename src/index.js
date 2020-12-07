function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function searchCity(event) {
  event.preventDefault();
  //let cityElement = document.querySelector("#current-city");
  let city = document.querySelector("#city-input").value;
  //cityElement.innerHTML = cityInput.value;
  let apiKey = "a1ad43712be7807b2c4a5b2e56a8bd34";
  let units = "imperial";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showTemp);

  url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(displayForecast);
}

let Form = document.querySelector("#search-form");
Form.addEventListener("submit", searchCity);

function showTemp(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  //document.querySelector("#current-temp").innerHTML = Math.round(
  //response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let message = `${temperature}°F`;
  let update = "Currently: " + response.data.weather[0].description;
  document.querySelector("#weather-now").innerHTML = update;
  document.querySelector("#current-temp").innerHTML = message;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  //let h3 = document.querySelector("h3");
  //h3.innerHTML = message;s
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 4; index++) {
    let forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-3">
      <div class="card">
        <div class="card-body"><br/>
         <h6 class="card-subtitle">${formatHours(forecast.dt * 1000)}</h6>
         <br/>
       <p><strong>High:
      ${Math.round(forecast.main.temp_max)}°F
      <p>Feels like:
      ${Math.round(forecast.main.feels_like)}°F</strong></p>
      <img 
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png" />
      </div>
    </div>
  </div>`;
  }
}
