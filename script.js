const btn = document.getElementById("btn");
const mapContainer = document.getElementById("map");
const weatherContainer = document.getElementById("weather-data");

function getWeather() {
  // getting users location
  const position = getCurrentPosition();

  //displaying map with current latitude and longitude
  displayMap(position.coords.latitude, position.coords.longitude);

  const weatherData = getWeatherData(
    position.coords.latitude,
    position.coords.longitude
  );

  displayWeatherData(weatherData);
}

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// displaying map
function displayMap(latitude, longitude) {
  const apiKey = AIzaSyBUdjYdcxGOdTb6afRKvhNdLSINk7jAPQ4;

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x300
  &key=${apiKey}`;
  const mapImage = document.createElement("img");
  mapImage.setAttribute("src", mapUrl);
  mapContainer.appendChild(mapImage);
}

//getting weather data
function getWeatherData(latitude, longitude) {
  const apiKey = "2835d45a0a4b470e5201c360f14ea8ed";
  const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${apiKey}`;
  const response = fetch(apiUrl);
  const data = response.json();
  return data;
}

//displaying weather data
function displayWeatherData(weatherData) {
  const latitude = weatherData.lat;
  const longitude = weatherData.lon;
  const timeZone = weatherData.timezone;
  const windSpeed = weatherData.current.wind_speed;
  const pressure = weatherData.current.pressure;
  const humidity = weatherData.current.humidity;
  const windDirection = weatherData.current.wind_deg;
  const uvIndex = weatherData.current.uvi;
  const feels_like = weatherData.current.feels_like;

  const weatherDetails = `
      <h2>Location:</h2>
      <p>Lat: ${latitude}</p>
      <p>Long: ${longitude}</p>
      <p>TimeZone: ${timeZone}</p>
      <p>Wind Speed: ${windSpeed}</p>
      <p>Pressure: ${pressure}</p>
      <p>Humidity: ${humidity}</p>
      <p>windDirection: ${windDirection}</p>
      <p>uvIndex: ${uvIndex}</p>
      <p>feels_like: ${feels_like}</p>
    `;

  weatherSection.innerHTML = weatherDetails;
}


//adding the event listner to the fetch data button
btn.addEventListener("click", getWeather);
