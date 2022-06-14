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
  const numberOfDaysBefore = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    0
  ).getDay();

  calendarContainer.innerHTML = "";

  const numberOfDaysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();

  const daysToRender = 42;

  const startPrevMonth =
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0).getDate() -
    numberOfDaysBefore +
    1;

  for (let i = 0; i < daysToRender; i++) {
    const dayDiv = document.createElement("div");

    dayDiv.addEventListener("click", () => {
      // console.log(dayDiv.id);
      showDayInfo(dayDiv.id);
      dayDiv.classList.toggle("selected-Day");

      //TODO: Create separate toggle function later
      if (!dayDiv.classList.contains("selected-Day")) {
        showAllTodos();
      }
    });

    if (i < numberOfDaysBefore) {
      dayDiv.classList.add("prev-month-day");
      dayDiv.id = `${new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        i - 1
      ).toLocaleDateString("sv-SE", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })}`;
      dayDiv.innerHTML = startPrevMonth + i;
    } else if (i >= numberOfDaysBefore + numberOfDaysInMonth) {
      dayDiv.classList.add("next-month-day");
      dayDiv.id = `${new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        i - 1
      ).toLocaleDateString("sv-SE", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })}`;
      dayDiv.innerHTML = i - (numberOfDaysBefore + numberOfDaysInMonth) + 1;
    } else {
      dayDiv.classList.add("day");
      dayDiv.id = `${new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        i + 1 - numberOfDaysBefore
      ).toLocaleDateString("sv-SE", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })}`;

      const dayDate = document.createElement("div");
      const nrOfTodos = document.createElement("div");

      dayDate.innerHTML = `${i - numberOfDaysBefore + 1}`;
      nrOfTodos.innerHTML = `Todos: ${getNumberOfTodos(dayDiv.id)}`;

      dayDiv.appendChild(dayDate);
      if (getNumberOfTodos(dayDiv.id)) {
        dayDiv.appendChild(nrOfTodos);
      }
    }
    calendarContainer.appendChild(dayDiv);
  }
}

function showDayInfo(dayDivId) {
  todoListDiv.innerHTML = "";

  const dayInfo = document.createElement("div");

  dayInfo.classList.add("flex");

  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].date === dayDivId) {
  
      const todoTitleDiv = document.createElement("div");
      todoTitleDiv.innerHTML = `${todoItems[i].title}`;

      const todoDescriptionDiv = document.createElement("div");
      todoDescriptionDiv.innerHTML = `${todoItems[i].description}`;

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-btn");
      deleteBtn.addEventListener("click", () => {
        deleteTodoItem(todoItems[i]);
        renderCalendar();
      });

      deleteBtn.innerHTML = "Remove";
      dayInfo.appendChild(todoTitleDiv);
      dayInfo.appendChild(todoDescriptionDiv);
      dayInfo.appendChild(deleteBtn); 
    }
  }

  todoListDiv.appendChild(dayInfo);
}

function getNumberOfTodos(date) {
  return todoItems.filter((todoItem) => todoItem.date === date).length;
}

function deleteTodoItem(todoItem) {
  var index = todoItems.indexOf(todoItem);

  todoItems.splice(index, 1);

  setLocalstorage();
}
