document.addEventListener("DOMContentLoaded", main);

const prvBtn = document.querySelector(".prv-btn");
const nxtBtn = document.querySelector(".nxt-btn");

let selectedDate = new Date();

const getNumberOfDays = () => {
  return new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();
};

function main() {
  addEventListeners();
  renderCalendar();
}

function addEventListeners() {
  prvBtn.addEventListener("click", () => {
    selectedDate.setMonth(selectedDate.getMonth() - 1);
    renderCalendar();
  });

  nxtBtn.addEventListener("click", () => {
    selectedDate.setMonth(selectedDate.getMonth() + 1);
    renderCalendar();
  });
}

function renderCalendar() {

  const numberOfDaysBefore = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0).getDay();
  
  const calendarContainer = document.querySelector(".calendar-container");

  calendarContainer.innerHTML="";

  const numberOfDaysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();

  const daysToRender = 42;

  const startPrevMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0).getDate() - numberOfDaysBefore + 1;
    
  for (let i = 0; i < daysToRender; i++) {
    
    const dayDiv = document.createElement('div');

    if(i < numberOfDaysBefore) {
      dayDiv.classList.add('prev-month-day');
      dayDiv.id = `${new Date(selectedDate.getFullYear(),selectedDate.getMonth(), i - 1).toLocaleDateString("sv-SE", {year: "numeric", month: "numeric", day: "numeric"})}`
      dayDiv.innerHTML = startPrevMonth + i;
    }
    else if(i >= numberOfDaysBefore + numberOfDaysInMonth) {
      dayDiv.classList.add('next-month-day');
      dayDiv.id = `${new Date(selectedDate.getFullYear(),selectedDate.getMonth(), i - 1).toLocaleDateString("sv-SE", {year: "numeric", month: "numeric", day: "numeric"})}`
      dayDiv.innerHTML = i - (numberOfDaysBefore + numberOfDaysInMonth) + 1;
    }
    else {
      dayDiv.classList.add('day');
      dayDiv.id = `${new Date(selectedDate.getFullYear(),selectedDate.getMonth(), i + 1 - numberOfDaysBefore).toLocaleDateString("sv-SE", {year: "numeric", month: "numeric", day: "numeric"})}`;
      dayDiv.innerHTML = i-numberOfDaysBefore + 1;
    }
    calendarContainer.appendChild(dayDiv);
  }
}

