let currentDate = new Date();

const daysToRender = 42;

const nextYear = new Date(currentDate.getFullYear() + 1);

const prevMonth = currentDate.getMonth() - 1;

const nextMonth = () => {
  return currentDate.getMonth() + 1;
};

const monthLength = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth() + 1,
  0
).getDate();

const paddingDays = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  0
).getDay();

const paddingDaysStartDate =
  new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate() -
  paddingDays +
  1;

function setNextMonth() {
  currentDate.setMonth(nextMonth);
}

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

// does all of these need to be globals? ⬇
const calendarContainer = document.querySelector(".calendar-container");
const todoListDiv = document.querySelector(".todo-list");
const prevBtn = document.createElement("i");
const nextBtn = document.createElement("i");
