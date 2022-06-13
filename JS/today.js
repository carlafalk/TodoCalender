const welcomeContainer = document.querySelector(".welcome-segment");
const dateAndTimeContainer = document.querySelector(".DateAndTime");
const currentDay = document.createElement("h2");
const currentDate = document.createElement("h4");
const currentTime = document.createElement("h4");

currentDay.classList.add("welcome-weekday");
currentDate.classList.add("welcome-date");
currentTime.classList.add("welcome-time");

const d = new Date();
const weekday = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

currentDay.innerText = weekday[d.getDay() - 1];
currentDate.innerText = new Date().toISOString().slice(0, 10);

function clock() {
  currentTime.innerText = new Date().toLocaleTimeString();
}

setInterval(clock, 1000);

currentTime.innerText = welcomeContainer.appendChild(currentDay);
dateAndTimeContainer.appendChild(currentDate);
dateAndTimeContainer.appendChild(currentTime);

// add-todo-item-button----------------------------------

const btn = document.querySelector(".add-todo-btn");
const expandedContent = document.querySelector(".expanded-content");

function toggleContent() {
  btn.classList.toggle("add-todo-btn--active");

  if (btn.classList.contains("add-todo-btn--active")) {
    expandedContent.style.maxHeight = expandedContent.scrollHeight + "px";
  } else {
    expandedContent.style.maxHeight = 0;
  }
}

btn.addEventListener("click", toggleContent);
