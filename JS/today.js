const welcomeContainer = document.querySelector(".welcome-segment");
const dateAndTimeContainer = document.querySelector(".DateAndTime");
const currentDay = document.createElement("h2");
const currentDateH4 = document.createElement("h4");
const currentTime = document.createElement("h4");
const weatherDiv = document.createElement("div");

currentDay.classList.add("welcome-weekday");
currentDateH4.classList.add("welcome-date");
currentTime.classList.add("welcome-time");

currentDay.innerHTML = new Date().toLocaleString("en-us", { weekday: "long" });
currentDateH4.innerText = new Date().toISOString().slice(0, 10);

function clock() {
  currentTime.innerText = new Date().toLocaleTimeString();
}

setInterval(clock, 1000);

currentTime.innerText = welcomeContainer.appendChild(currentDay);
dateAndTimeContainer.appendChild(currentDateH4);
dateAndTimeContainer.appendChild(weatherDiv);
dateAndTimeContainer.appendChild(currentTime);

// Wheater stuff
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

function fetchWheater(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeyWeather}&units=metric`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      weatherDiv.innerHTML = `${data.main.temp} °C`;
    });
}

function fetchCity(position) {
  fetch(
    `https://eu1.locationiq.com/v1/reverse.php?key=${apiKeyLocation}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.address.town) {
        fetchWheater(data.address.town);
      } else if (data.address.city) {
        fetchWheater(data.address.city);
      }
    });
}
