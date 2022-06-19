const welcomeContainer = document.querySelector(".welcome-segment");
const dateAndTimeContainer = document.querySelector(".DateAndTime");
const currentDay = document.createElement("h2");
const currentDate = document.createElement("h4");
const currentTime = document.createElement("h4");
const weatherDiv = document.createElement("div");

currentDay.classList.add("welcome-weekday");
currentDate.classList.add("welcome-date");
currentTime.classList.add("welcome-time");

const d = new Date();
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

currentDay.innerText = weekday[d.getDay()];
currentDate.innerText = new Date().toISOString().slice(0, 10);

function clock() {
  currentTime.innerText = new Date().toLocaleTimeString();
}

setInterval(clock, 1000);

currentTime.innerText = welcomeContainer.appendChild(currentDay);
dateAndTimeContainer.appendChild(currentDate);
dateAndTimeContainer.appendChild(weatherDiv);
dateAndTimeContainer.appendChild(currentTime);

// Wheater stuff
const apiKey = "5ff7192628b7984a48b5001e7291871f";

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
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
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
    `https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?geoit=json`
  )
    .then((response) => response.json())
    .then((data) => {
      fetchWheater(data.city);
    });
}
