document.addEventListener("DOMContentLoaded", main);

const calendarContainer = document.querySelector(".calendar-container");
const todoListDiv = document.querySelector(".todo-list");

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
  showAllTodos();
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
  
  calendarContainer.innerHTML="";

  const numberOfDaysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();

  const daysToRender = 42;

  const startPrevMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0).getDate() - numberOfDaysBefore + 1;
    
  for (let i = 0; i < daysToRender; i++) {
    
    const dayDiv = document.createElement('div');
    
    dayDiv.addEventListener("click", () => {
      console.log(dayDiv.id),
      showDayInfo(dayDiv.id);
      dayDiv.classList.toggle("selected-Day")
      
      //TODO: Create separate toggle function later
      if(!dayDiv.classList.contains('selected-Day')) {
        showAllTodos();
      }
    });

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

function showDayInfo(dayDivId) {

  todoListDiv.innerHTML = "";

  const dayInfo = document.createElement('div');

  for (let i = 0; i < todoItems.length; i++) {

    if(todoItems[i].date === dayDivId) {
      const todoDiv = document.createElement('div');
      const textNode = document.createTextNode(`${todoItems[i].date} ${todoItems[i].description}` );
      todoDiv.appendChild(textNode);
      dayInfo.appendChild(todoDiv);
    }
  }

  todoListDiv.appendChild(dayInfo);
}

