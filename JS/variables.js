let currentDate = new Date();

const daysToRender = 42;

const nextYear = new Date(currentDate.getFullYear() + 1);

const prevMonth = currentDate.getMonth() - 1;

const nextMonth = () => {
  return currentDate.getMonth() + 1;
};

const monthLength = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth() + 1,
  0
).getDate();

const paddingDays = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  0
).getDay();

const paddingDaysStartDate =
  new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate() -
  paddingDays +
  1;

function setNextMonth() {
  currentDate.setMonth(nextMonth);
}

// does all of these need to be globals? ⬇
const calendarContainer = document.querySelector(".calendar-container");
const todoListDiv = document.querySelector(".todo-list");
const prevBtn = document.createElement("i");
const nextBtn = document.createElement("i");
