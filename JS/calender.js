document.addEventListener("DOMContentLoaded", main);

const calendarContainer = document.querySelector(".calendar-container");
const todoListDiv = document.querySelector(".todo-list");

const prevBtn = document.createElement("i");
const nextBtn = document.createElement("i");

let selectedDate = new Date();

const getNumberOfDays = () => {
  return new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();
};

function main() {
  renderHeaderMonth();
  addEventListeners();
  renderCalendar();
  showAllTodos();
  renderYearLabel();
}

function addEventListeners() {
  prevBtn.addEventListener("click", () => {
    selectedDate.setMonth(selectedDate.getMonth() - 1);
    if (selectedDate.getMonth() === -1) {
      selectedDate.setFullYear(selectedDate.getFullYear() - 1);
      selectedDate.setMonth(11);
    }
    changeHeaderBackground();
    renderCalendar();
  });

  nextBtn.addEventListener("click", () => {
    selectedDate.setMonth(selectedDate.getMonth() + 1);
    if (selectedDate.getMonth() === 12) {
      selectedDate.setFullYear(selectedDate.getFullYear() + 1);
      selectedDate.setMonth(0);
    }
    changeHeaderBackground();
    renderCalendar();
  });
}

async function renderCalendar() {
  renderHeaderMonth();
  renderYearLabel();
  const holidays = await getHolidays();

  console.log(holidays.dagar[2]["datum"]);

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
      if (holidays.dagar[i - numberOfDaysBefore]["röd dag"] === "Ja") {
        dayDiv.classList.add("holiday");
      }

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
      dayDate.classList.add("day-date");

      dayDate.innerHTML = `${i - numberOfDaysBefore + 1}`;

      dayDiv.appendChild(dayDate);

      // if there is todos for this day, add amount and todos
      if (getNumberOfTodos(dayDiv.id)) {
        const todoIconContainer = document.createElement("div");
        todoIconContainer.classList.add("todo-icon-container");

        // new todo notification
        const nrOfTodos = document.createElement("div");
        nrOfTodos.classList.add("nr-of-todos");
        nrOfTodos.innerHTML = `${getNumberOfTodos(dayDiv.id)}`;

        dayDiv.appendChild(todoIconContainer);
        todoIconContainer.appendChild(nrOfTodos);

        // end new todo notification
        const todoContainer = document.createElement("div");
        todoContainer.classList.add("todo-container");

        const todoHeader = document.createElement("div");
        todoHeader.classList.add("todo-header");
        todoHeader.innerHTML = "Todays todos:";

        todoContainer.appendChild(todoHeader);
        const todos = getTodosForDay(dayDiv.id);
        for (let i = 0; i < todos.length; i++) {
          const todo = document.createElement("div");
          todo.classList.add("todo");
          todo.innerHTML = todos[i].title;

          if (i === 2 && todos.length > 3) {
            todo.innerHTML = `${todos[i].title} (${todos.length - 3} more)`;
            todoContainer.appendChild(todo);
            break;
          }
          todoContainer.appendChild(todo);
        }

        dayDiv.appendChild(todoContainer);
      }

      if (holidays.dagar[i - numberOfDaysBefore].flaggdag !== "") {
        const flagDiv = document.createElement("div");
        flagDiv.classList.add("flag-day");

        const flagIcon = document.createElement("i");
        flagIcon.classList.add("fa-solid", "fa-flag");
        flagDiv.appendChild(flagIcon);

        const flagOccasion = document.createElement("span");
        flagOccasion.classList.add("flag-occasion");
        flagOccasion.innerHTML =
          holidays.dagar[i - numberOfDaysBefore].flaggdag;

        flagDiv.appendChild(flagOccasion);
        dayDiv.appendChild(flagDiv);
      }
    }
    calendarContainer.appendChild(dayDiv);
  }
}

function getTodosForDay(date) {
  return todoItems.filter((todo) => todo.date === date);
}

function getNumberOfTodos(date) {
  return todoItems.filter((todoItem) => todoItem.date === date).length;
}

function deleteTodoItem(todoItem) {
  var index = todoItems.indexOf(todoItem);

  todoItems.splice(index, 1);

  setLocalstorage();
}

function getHolidays() {
  const url = "http://sholiday.faboul.se/dagar/v2.1/";

  const holidays = fetch(
    `${url}${selectedDate.getFullYear()}/${selectedDate.getMonth() + 1}`
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  return holidays;
}
