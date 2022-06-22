// add css classes
currentDayH2.classList.add("welcome-weekday");
currentDateH4.classList.add("welcome-date");
currentTimeH4.classList.add("welcome-time");
currentWeatherH4.classList.add("welcome-weather");
weatherContainerDiv.classList.add("weather-container");
iconTempDiv.classList.add("icon-temp");

// welcome segment ----------------------------- //
// weekday in welcome segment
currentDayH2.innerHTML = new Date().toLocaleString("en-us", {
  weekday: "long",
});
// date
currentDateH4.innerText = new Date().toISOString().slice(0, 10);

// clock
setInterval(clock, 1000);

currentTimeH4.innerText = welcomeContainer.appendChild(currentDayH2);
dateAndTimeContainer.appendChild(currentDateH4);
dateAndTimeContainer.appendChild(currentTimeH4);
iconTempDiv.appendChild(iconI);
iconTempDiv.appendChild(tempSpan);
weatherContainerDiv.appendChild(weatherLocationH4);
weatherContainerDiv.appendChild(iconTempDiv);
dayInfoDiv.appendChild(weatherContainerDiv);

// fetch location and local weather
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

function clock() {
  currentTimeH4.innerText = new Date().toLocaleTimeString();
}

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
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
