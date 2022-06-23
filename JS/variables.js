let currentDate = new Date();

const daysToRender = 42;
const apiKeyWeather = "5ff7192628b7984a48b5001e7291871f";
const apiKeyLocation = "pk.47dfd2e322a8290e5b985e428e6e8cbe";

const weatherIcon = {
  "01d": "fa-sun",
  "02d": "fa-cloud-sun",
  "03d": "fa-cloud",
  "04d": "fa-cloud",
  "09d": "fa-cloud-showers-heavy",
  "10d": "fa-cloud-sun-rain",
  "11d": "fa-cloud-bolt",
  "13d": "fa-snowflake",
  "50d": "fa-smog",
  "01n": "fa-moon",
  "02n": "fa-cloud-moon",
  "03n": "fa-cloud",
  "04n": "fa-cloud",
  "09n": "fa-cloud-showers-heavy",
  "10n": "fa-cloud-moon-rain",
  "11n": "fa-cloud-bolt",
  "13n": "fa-snowflake",
  "50n": "fa-smog",
};

// Element creation ----------------------------- //

const calendarContainer = document.querySelector(".calendar-container");
const todoListDiv = document.querySelector(".todo-list");
const prevBtn = document.createElement("i");
const nextBtn = document.createElement("i");
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

