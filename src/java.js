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

function displayForecast() {
  let forecastElements = document.querySelectorAll(".forecast");

  let days = ["Thu", "Mon", "Sat", "Sun", "Wed"];

  forecastElements.forEach((element, index) => {
    let forecastHTML = `
          <span class="days">${days[index]}</span>
          <br />
          <span class="weather_max"> 19ºC </span>
          <span class="weather_min"> 13ºC </span>
          <br />
          <img src="img/cloud_sun.png" alt="cloud_sun" width="50">
        </div>
      `;

    element.innerHTML = forecastHTML;
  });
}

function showRealTemp(response) {
  let description = response.data.condition.description;
  let descriptionUpper =
    description.charAt(0).toUpperCase() + description.slice(1).toLowerCase();
  document.querySelector(".weather_day").innerHTML = descriptionUpper;
  let celsiusTemperature = response.data.temperature.current;

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
let currentTemp = document.querySelector(".current_temp");

function convertToFahrenheit(event) {
  event.preventDefault();
  let formula = (celsiusTemperature * 9) / 5 + 32;

  document.querySelector("#current_temp").innerHTML = Math.round(formula);
}

function convertToCelsius(event) {
  event.preventDefault();

  document.querySelector("#current_temp").innerHTML =
    Math.round(celsiusTemperature);
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
displayForecast();
