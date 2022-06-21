const welcomeContainer = document.querySelector(".welcome-segment");
const dateAndTimeContainer = document.querySelector(".DateAndTime");
const dayInfoDiv = document.querySelector(".today-info");
const currentDayH2 = document.createElement("h2");
const currentDateH4 = document.createElement("h4");
const currentTimeH4 = document.createElement("h4");
const currentWeatherH4 = document.createElement("h4");
const weatherLocationH4 = document.createElement("h4");
const weatherContainerDiv = document.createElement("div");
const iconTempDiv = document.createElement("div");
const iconI = document.createElement("i");
const tempSpan = document.createElement("span");

currentDayH2.classList.add("welcome-weekday");
currentDateH4.classList.add("welcome-date");
currentTimeH4.classList.add("welcome-time");
currentWeatherH4.classList.add("welcome-weather");
weatherContainerDiv.classList.add("weather-container");
iconTempDiv.classList.add("icon-temp");

currentDayH2.innerHTML = new Date().toLocaleString("en-us", {
  weekday: "long",
});
currentDateH4.innerText = new Date().toISOString().slice(0, 10);

function clock() {
  currentTimeH4.innerText = new Date().toLocaleTimeString();
}

setInterval(clock, 1000);

currentTimeH4.innerText = welcomeContainer.appendChild(currentDayH2);
dateAndTimeContainer.appendChild(currentDateH4);
dateAndTimeContainer.appendChild(currentTimeH4);
iconTempDiv.appendChild(iconI);
iconTempDiv.appendChild(tempSpan);
weatherContainerDiv.appendChild(weatherLocationH4);
weatherContainerDiv.appendChild(iconTempDiv);
dayInfoDiv.appendChild(weatherContainerDiv);

// Weather stuff
const apiKeyWeather = "5ff7192628b7984a48b5001e7291871f";
const apiKeyLocation = "pk.47dfd2e322a8290e5b985e428e6e8cbe";

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  const crd = pos.coords;

  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
  lat = crd.latitude;
  lon = crd.longitude;
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

function fetchWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeyWeather}&units=metric`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      currentWeatherH4.innerHTML = `${data.main.temp}°C`;
      weatherLocationH4.innerHTML = `${data.name}`;
      iconI.classList.add("fa-solid", `${weatherIcon[data.weather[0].icon]}`);
      tempSpan.innerHTML = `${Math.round(parseFloat(data.main.temp))}°C`;
    });
}

function fetchCity(position, success, options) {
  fetch(
    `https://eu1.locationiq.com/v1/reverse.php?key=${apiKeyLocation}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.address.town) {
        fetchWeather(data.address.town);
      } else if (data.address.city) {
        fetchWeather(data.address.city);
      }
    });
}
