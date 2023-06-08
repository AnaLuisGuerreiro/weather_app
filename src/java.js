// Display Date
function currentDate(date) {
  let days = [
    "Monday",
    "Tuesday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let dateTime = document.querySelector("#date_time");
  dateTime.innerHTML = `${day}, ${hour}:${minutes}`;
}

function formatDays(time) {
  let date = new Date(time * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[day];
}

function displayForecast(response) {
  let forecastElements = document.querySelectorAll(".forecast");

  forecastElements.forEach((element, index) => {
    let data = response.data.daily[index];
    let forecastHTML = `
          <span class="days">${formatDays(data.time)}</span>
          <span class="weather_max"> 
          ${Math.round(data.temperature.maximum)}º 
          |</span>
          <span class="weather_min">
           ${Math.round(data.temperature.minimum)}º
          </span>
          <br />
          <img 
          src="${data.condition.icon_url}" 
          alt="cloud_sun" 
          width="60"
          class="days_icon"
          >
        </div>
      `;

    element.innerHTML = forecastHTML;
  });
}

function getForecast(coordinates) {
  let apiKey = "37ao80323cfe0b171ed40af823227b0t";
  let apiUrl = `
  https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric
  `;

  axios.get(apiUrl).then(displayForecast);
}

function showRealTemp(response) {
  let description = response.data.condition.description;
  let descriptionUpper =
    description.charAt(0).toUpperCase() + description.slice(1).toLowerCase();
  document.querySelector(".weather_day").innerHTML = descriptionUpper;
  celsiusTemperature = response.data.temperature.current;

  document.querySelector(".city").innerHTML = response.data.city;
  document.querySelector(".current_temp").innerHTML =
    Math.round(celsiusTemperature);

  document.querySelector(".wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector(
    ".humidity"
  ).innerHTML = `Humidity: ${response.data.temperature.humidity}%`;

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}

// Form search city
function citySearch(event) {
  event.preventDefault();

  let userCity = document.querySelector("#user_city");

  let city = document.querySelector(".city");
  let cityName = userCity.value;
  cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();
  city.innerHTML = cityName;
}

function searchCity(city) {
  // Api and real data
  let urlBegin = "https://api.shecodes.io/weather/v1/current?";
  let units = "metric";
  let apiKey = "37ao80323cfe0b171ed40af823227b0t";
  let api = `${urlBegin}query=${city}&units=${units}&key=${apiKey}`;
  axios.get(api).then(showRealTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let userCity = document.querySelector("#user_city");
  searchCity(userCity.value);
}

// Current Position
function showPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

// Convertion Celsius to Fahrenheit / Fahrenheit to Celsius
let currentTemp = document.querySelector("#current_temp");

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (currentTemp.innerHTML * 9) / 5 + 32;

  currentTemp.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();

  currentTemp.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

// Date
currentDate(new Date());

// Form event with enter
let form = document.getElementById("city_form");
form.addEventListener("submit", handleSubmit);
// Form event with pencil button
let pencil = document.getElementById("pencil");
pencil.addEventListener("click", citySearch);

// Buttons event (Cº e Fº)
let btnFahrenheit = document.querySelector("#convert_C_F");
btnFahrenheit.addEventListener("click", convertToFahrenheit);

let btnCelsius = document.querySelector("#convert_F_C");
btnCelsius.addEventListener("click", convertToCelsius);

// Dot button
let locationDot = document.getElementById("loc_dot");
locationDot.addEventListener("click", getCurrentPosition);

searchCity("Porto");
