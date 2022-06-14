document.addEventListener("DOMContentLoaded", main);

const currentDate2 = new Date();
const prvBtn = document.querySelector(".prv-btn");
const nxtBtn = document.querySelector(".nxt-btn");

let selectedDate = currentDate2;

const getNumberOfDays = () => {
  return new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();
};

function main() {
  addEventListeners();
  update();
}

function addEventListeners() {
  prvBtn.addEventListener("click", () => {
    selectedDate.setMonth(selectedDate.getMonth() - 1);
    update();
  });

  nxtBtn.addEventListener("click", () => {
    selectedDate.setMonth(selectedDate.getMonth() + 1);
    update();
  });
}

function update() {
  const calendarContainer = document.querySelector(".calendar-container");
  calendarContainer.innerHTML = "";

  for (let i = 0; i < getNumberOfDays(); i++) {
    const day = document.createElement("div");
    day.classList.add("day");
    day.innerHTML = i + 1;
    calendarContainer.appendChild(day);
  }
}

// controls
