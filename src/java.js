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

// Form search city
function citySearch(event) {
  event.preventDefault();

  let userCity = document.querySelector("#user_city");

  let city = document.querySelector(".city");
  let cityName = userCity.value;
  cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();
  city.innerHTML = cityName;
}

// Convertion Celsius to Fahrenheit / Fahrenheit to Celsius
let currentTemp = document.querySelector(".current_temp");

function convertToFahrenheit() {
  currentTemp.textContent = "72";
}

function convertToCelsius() {
  currentTemp.textContent = "22";
}

// Date
currentDate(new Date());

// Form event with enter
let form = document.getElementById("city_form");
form.addEventListener("submit", handleSubmit);
// Form event with pencil button
let pencil = document.getElementById("pencil");
pencil.addEventListener("click", citySearch);

// Buttons event (Cº e Fº)
let btnCelsius = document.querySelector("#convert_F_C");
btnCelsius.addEventListener("click", convertToCelsius);

let btnFahrenheit = document.querySelector("#convert_C_F");
btnFahrenheit.addEventListener("click", convertToFahrenheit);

function searchCity(city) {
  // Api and real data
  let urlBegin = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  let apiKey = "6cbe98b15c1974d096f69842696bcf5b";
  let api = `${urlBegin}q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(api).then(showRealTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let userCity = document.querySelector("#user_city");
  searchCity(userCity.value);
}

function showRealTemp(response) {
  let description = response.data.weather[0].description;
  let descriptionUpper =
    description.charAt(0).toUpperCase() + description.slice(1).toLowerCase();

  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector(".current_temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector(
    ".humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(".weather_day").innerHTML = descriptionUpper;
}

// Current Position
function showPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationDot = document.getElementById("loc_dot");
locationDot.addEventListener("click", getCurrentPosition);

searchCity("Porto");
