document.addEventListener("DOMContentLoaded", main);
navigator.geolocation.getCurrentPosition(fetchCity, error);

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

  let lastClickedDayArray = [];

  for (let i = 0; i < daysToRender; i++) {
    const dayDiv = document.createElement("div");
    const contentContainer = document.createElement("div");

    dayDiv.addEventListener("click", (e) => {
      showDayInfo(dayDiv.id);
      dayDiv.classList.toggle("selected-Day");

      // contentContainer.classList.toggle("selected-Day");

      lastClickedDayArray.push(dayDiv);

      if (lastClickedDayArray.length > 1) {
        if (lastClickedDayArray[0] === lastClickedDayArray[1]) {
          lastClickedDayArray = [];
        } else {
          lastClickedDayArray[0].classList.toggle("selected-Day");
          lastClickedDayArray.shift();
        }
      }

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

      const dateDiv = document.createElement("div");
      dateDiv.classList.add("date");

      dateDiv.innerHTML = startPrevMonth + i;
      contentContainer.appendChild(dateDiv);
      contentContainer.classList.add("content-container", "absolute");
      dayDiv.appendChild(contentContainer);
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

      const dateDiv = document.createElement("div");
      dateDiv.classList.add("date");

      dateDiv.innerHTML = i - (numberOfDaysBefore + numberOfDaysInMonth) + 1;
      contentContainer.appendChild(dateDiv);
      contentContainer.classList.add("content-container", "absolute");
      dayDiv.appendChild(contentContainer);
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

      // APPEND ELEMENTS TO DAY DIV ------------------------------ //

      contentContainer.classList.add("content-container", "absolute");

      const dayInfoContainer = document.createElement("div");
      dayInfoContainer.classList.add(
        "day-info-container",
        "flex",
        "space-between",
        "align-center"
      );

      const dayDate = document.createElement("div");
      dayDate.classList.add("day-date");
      dayDate.innerHTML = `${i - numberOfDaysBefore + 1}`;

      const nameDayContainer = document.createElement("div");
      nameDayContainer.classList.add("name-day-container");
      for (
        let j = 0;
        j < holidays.dagar[i - numberOfDaysBefore].namnsdag.length;
        j++
      ) {
        const nameDay = document.createElement("div");
        nameDay.classList.add("name-day");
        nameDay.innerHTML = holidays.dagar[i - numberOfDaysBefore].namnsdag[j];
        nameDayContainer.appendChild(nameDay);
      }

      dayInfoContainer.appendChild(dayDate);

      if (
        getNumberOfTodos(dayDiv.id) ||
        holidays.dagar[i - numberOfDaysBefore].flaggdag !== ""
      ) {
        const notificationContainer = document.createElement("div");
        notificationContainer.classList.add("notification-container", "flex");

        if (getNumberOfTodos(dayDiv.id)) {
          const todoNotificationContainer = document.createElement("div");
          todoNotificationContainer.classList.add(
            "todo-notification-container"
          );
          const nrOfTodos = document.createElement("div");
          nrOfTodos.classList.add("nr-of-todos");
          nrOfTodos.innerHTML = `${getNumberOfTodos(dayDiv.id)}`;
          todoNotificationContainer.appendChild(nrOfTodos);
          notificationContainer.appendChild(todoNotificationContainer);
        }

        if (holidays.dagar[i - numberOfDaysBefore].flaggdag !== "") {
          const flagIcon = document.createElement("i");
          flagIcon.classList.add(
            "fa-solid",
            "fa-flag",
            "flag-notification-icon"
          );
          notificationContainer.appendChild(flagIcon);
        }
        dayInfoContainer.appendChild(notificationContainer);
      }

      dayInfoContainer.appendChild(nameDayContainer);

      contentContainer.appendChild(dayInfoContainer);

      if (getNumberOfTodos(dayDiv.id)) {
        const todoListContainerOnHover = document.createElement("div");
        todoListContainerOnHover.classList.add(
          "todo-list-on-hover",
          "display-none",
          "flex",
          "align-center",
          "pb-1"
        );

        const todoIcon = document.createElement("i");
        todoIcon.classList.add("fa-solid", "fa-clipboard-list", "todo-icon");
        todoListContainerOnHover.appendChild(todoIcon);

        const todos = getTodosForDay(dayDiv.id);
        const todoList = document.createElement("div");
        todoList.classList.add("todo-title-list", "flex", "column", "grow-1");

        for (let i = 0; i < todos.length; i++) {
          const todo = document.createElement("div");
          todo.classList.add("todo");
          todo.innerHTML = `${todos[i].title}`;
          if (i === 3 && todos.length > 3) {
            const moreTodos = document.createElement("div");
            moreTodos.classList.add("more-todos");
            moreTodos.innerHTML = `(${todos.length - 3} more)`;
            todoList.appendChild(moreTodos);
            break;
          }

          todoList.appendChild(todo);
        }
        todoListContainerOnHover.appendChild(todoList);
        contentContainer.appendChild(todoListContainerOnHover);
      }
      if (holidays.dagar[i - numberOfDaysBefore].flaggdag !== "") {
        const flagDayContainer = document.createElement("div");
        flagDayContainer.classList.add(
          "flag-day-container",
          "display-none",
          "align-center",
          "pb-1"
        );

        const flagIcon = document.createElement("i");
        flagIcon.classList.add("fa-solid", "fa-flag", "flag-hover-icon");

        flagDayContainer.appendChild(flagIcon);

        const flagOccasionDiv = document.createElement("div");
        flagOccasionDiv.classList.add("flag-occasion");
        flagOccasionDiv.innerHTML =
          holidays.dagar[i - numberOfDaysBefore].flaggdag;

        flagDayContainer.appendChild(flagOccasionDiv);

        contentContainer.appendChild(flagDayContainer);
      }
      dayDiv.appendChild(contentContainer);
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
