const apiKey = "dcee085d9c0744a270db2e349d5f0000";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherContainer = document.querySelector(".weather");
const errorContainer = document.querySelector(".error");

async function fetchWeatherData(city) {
  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

function updateUI(data) {
  if (!data) {
    errorContainer.style.display = "block";
    weatherContainer.style.display = "none";
    return;
  }

  const city = data.name;
  const temp = Math.round(data.main.temp) + "°C";
  const humidity = data.main.humidity + "%";
  const wind = data.wind.speed + " km/h";
  let weatherIconSrc;

  switch (data.weather[0].main) {
    case "Cloud":
      weatherIconSrc = "images/clouds.png";
      break;
    case "Clear":
      weatherIconSrc = "images/clear.png";
      break;
    case "Rain":
      weatherIconSrc = "images/rain.png";
      break;
    case "Drizzle":
      weatherIconSrc = "images/drizzle.png";
      break;
    case "Mist":
      weatherIconSrc = "images/mist.png";
      break;
    default:
      weatherIconSrc = "";
  }

  weatherIcon.src = weatherIconSrc;
  document.querySelector(".city").innerHTML = city;
  document.querySelector(".temp").innerHTML = temp;
  document.querySelector(".humidity").innerHTML = humidity;
  document.querySelector(".wind").innerHTML = wind;

  weatherContainer.style.display = "block";
  errorContainer.style.display = "none";
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (!city) {
    errorContainer.style.display = "block";
    weatherContainer.style.display = "none";
    return;
  }

  fetchWeatherData(city).then(updateUI);
});