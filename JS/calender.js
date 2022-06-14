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

  const firstDateInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
  
  let counter = 1;
  for (let i = 1; i <= 42; i++) {

    const day = document.createElement("div");
    if(i < firstDateInMonth) {
      day.classList.add('extra');
      day.innerHTML = getLastDay('prev-month') - (firstDateInMonth - 1) + i;
      calendarContainer.appendChild(day);
    }
    else if(i > getNumberOfDays()+ firstDateInMonth -1) {
      day.classList.add('extra');
      day.innerHTML =  counter++;
      calendarContainer.appendChild(day);
    }
    else {
      day.classList.add("day");
      day.innerHTML = i - firstDateInMonth +1;
      calendarContainer.appendChild(day);
    }
  }
}


function getLastDay() {
  if(arguments.length === 0) {
    return new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();
  }
  else if(arguments[0] === 'prev-month') {
    return new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() ,
    0).getDate();
  }
  else if (arguments[0] === 'next-month'){
    return new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 2,
    0).getDate();
  }
}

const asd  = getLastDay();
console.log(asd);

