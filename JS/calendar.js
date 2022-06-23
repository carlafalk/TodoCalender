document.addEventListener("DOMContentLoaded", main);

function main() {
  navigator.geolocation.getCurrentPosition(fetchCity, error);
  renderCalendar();
  addEventListeners();
  showAllTodos();
  renderYear();
}

function addEventListeners() {
  // previous month button //
  prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);

    if (currentDate.getMonth() === -1) {
      currentDate.setFullYear(currentDate.getFullYear() - 1);
      currentDate.setMonth(11);
    }
    changeHeaderBG();
    renderCalendar();
  });

  // next month button //
  nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    console.log("padding start date: " + getPaddingStartDate());
    console.log("paddingdays: " + paddingDays());

    if (currentDate.getMonth() === 12) {
      currentDate.setFullYear(currentDate.getFullYear() + 1);
      currentDate.setMonth(0);
    }
    changeHeaderBG();
    renderCalendar();
  });

  //openForm button
  openFormBtn.addEventListener("click", toggleContent);

  //Add todoitem button
  document.getElementById("add-btn").addEventListener("click", addTodoItem);
  document.getElementById("add-btn").addEventListener("click", renderCalendar);
  document.getElementById("add-btn").addEventListener("click", showAllTodos);
}

async function renderCalendar() {
  renderHeader();
  calendarContainer.innerHTML = "";
  const holidays = await fetchHolidays();
  let lastClickedDayArray = [];

  // render days //
  for (let i = 0; i < daysToRender; i++) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("flex", "column");
    const contentContainer = document.createElement("div");
    contentContainer.classList.add("content-container", "absolute");

    // event listener for day //
    dayDiv.addEventListener("click", (e) => {
      showDayInfo(dayDiv.id);
      dayDiv.classList.toggle("selected-Day");

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

    // render padding days //
    if (i < paddingDays()) {
      dayDiv.classList.add("prev-month-day");
      dayDiv.id = generateId(i);

      const dateDiv = document.createElement("div");
      dateDiv.classList.add("date");

      dateDiv.innerHTML = getPaddingStartDate() + i;
      contentContainer.appendChild(dateDiv);
      dayDiv.appendChild(contentContainer);
    }

    // render next month //
    else if (i >= paddingDays() + monthLength()) {
      dayDiv.classList.add("next-month-day");
      dayDiv.id = generateId(i);

      const dateDiv = document.createElement("div");
      dateDiv.classList.add("date");

      dateDiv.innerHTML = i - (paddingDays() + monthLength()) + 1;
      contentContainer.appendChild(dateDiv);
      dayDiv.appendChild(contentContainer);
    }

    // render current month //
    else {
      if (holidays.dagar[i - paddingDays()]["röd dag"] === "Ja") {
        dayDiv.classList.add("holiday");
      }
      dayDiv.classList.add("day");
      dayDiv.id = generateId(i);

      // append content to dayDiv //
      const dayInfoContainerDiv = document.createElement("div");
      dayInfoContainerDiv.classList.add(
        "day-info-container",
        "flex",
        "space-between",
        "align-center"
      );

      // render date
      const dayDateDiv = document.createElement("div");
      dayDateDiv.classList.add("day-date");
      dayDateDiv.innerHTML = `${i - paddingDays() + 1}`;

      // render name day names
      const nameDayContainerDiv = document.createElement("div");
      nameDayContainerDiv.classList.add("name-day-container", "column");
      for (
        let j = 0;
        j < holidays.dagar[i - paddingDays()].namnsdag.length;
        j++
      ) {
        const nameDayDiv = document.createElement("div");
        nameDayDiv.classList.add("name-day");
        nameDayDiv.innerHTML = holidays.dagar[i - paddingDays()].namnsdag[j];
        nameDayContainerDiv.appendChild(nameDayDiv);
      }

      dayInfoContainerDiv.appendChild(dayDateDiv);

      // append notifications for todos/flag day //
      if (
        getNumberOfTodos(dayDiv.id) ||
        holidays.dagar[i - paddingDays()].flaggdag !== ""
      ) {
        const notificationContainer = document.createElement("div");
        notificationContainer.classList.add(
          "notification-container",
          "flex",
          "align-center"
        );

        // number of todos notification
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

        // flag day notification
        if (holidays.dagar[i - paddingDays()].flaggdag !== "") {
          const flagIcon = document.createElement("i");
          flagIcon.classList.add(
            "fa-solid",
            "fa-flag",
            "flag-notification-icon"
          );
          notificationContainer.appendChild(flagIcon);
        }
        dayInfoContainerDiv.appendChild(notificationContainer);
      }
      dayInfoContainerDiv.appendChild(nameDayContainerDiv);
      contentContainer.appendChild(dayInfoContainerDiv);

      // append hover information //
      if (getNumberOfTodos(dayDiv.id)) {
        const todoListContainerOnHover = document.createElement("div");
        todoListContainerOnHover.classList.add(
          "todo-list-on-hover",
          "display-none",
          "flex",
          "align-center",
          "pb-1"
        );

        // todo list (lists max 3)
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

      // flag occasion
      if (holidays.dagar[i - paddingDays()].flaggdag !== "") {
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
        flagOccasionDiv.innerHTML = holidays.dagar[i - paddingDays()].flaggdag;

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

async function fetchHolidays() {
  const url = "https://sholiday.faboul.se/dagar/v2.1/";

  const holidays = fetch(
    `${url}${currentDate.getFullYear()}/${currentDate.getMonth() + 1}`
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return holidays;
}

function generateId(index) {
  return new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    index - paddingDays() + 1
  ).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
}

function monthLength() {
  return new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
}

function paddingDays() {
  return new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0
  ).getDay();
}

function getPaddingStartDate() {
  return (
    new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate() -
    paddingDays() +
    1
  );
}
