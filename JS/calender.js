document.addEventListener("DOMContentLoaded", main);

const currentDate2 = new Date();
let selectedDate = currentDate2;

const getNumberOfDays = () => {
  return new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();
};

function main() {
  update();
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
