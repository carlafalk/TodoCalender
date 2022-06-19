const prevMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1).getMonth();
};

const nextMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1).getMonth();
};

const daysToRender = 42;

// does all of these need to be globals? ⬇
const calendarContainer = document.querySelector(".calendar-container");
const todoListDiv = document.querySelector(".todo-list");
const prevBtn = document.createElement("i");
const nextBtn = document.createElement("i");
