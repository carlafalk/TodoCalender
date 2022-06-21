//global variable for todoitem-btn

const btn = document.querySelector(".add-todo-btn");
const expandedContent = document.querySelector(".expanded-content");

const saveEditBtn = document.querySelector(".save-edit-btn");

let todoItems = JSON.parse(localStorage.getItem("todoItems"));
if (!todoItems) {
  todoItems = [];
}

function getTodaysDateFormattedAsSwedishDate() {
  const today = new Date().toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return today;
}

const addTodoItem = (ev) => {
  ev.preventDefault();

  let todoItem = {
    title: document.getElementById("todo-title").value,
    description: document.getElementById("todo-desc").value,
    date: document.getElementById("date").value,
    isDone: false,
  };

  if (
    todoItem.title === "" ||
    todoItem.description === "" ||
    todoItem.date < getTodaysDateFormattedAsSwedishDate()
  ) {
    alert("forms not filled correctly");
  } else {
    todoItems.push(todoItem);

    setLocalstorage();

    document.forms[0].reset();
  }
};

document.getElementById("add-btn").addEventListener("click", addTodoItem);
document.getElementById("add-btn").addEventListener("click", renderCalendar);
document.getElementById("add-btn").addEventListener("click", showAllTodos);

function showAllTodos() {
  const dates = [];
  todoItems.sort((a, b) => a.date.localeCompare(b.date));
  todoListDiv.innerHTML = "";

  for (let i = 0; i < todoItems.length; i++) {
    if (!dates.includes(todoItems[i].date)) {
      dates.push(todoItems[i].date);

      const dateTodos = document.createElement("div");
      dateTodos.classList.add("date-todos");
      dateTodos.id = todoItems[i].date;

      const dateDiv = document.createElement("div");
      dateDiv.classList.add("date-div");

      const date = document.createTextNode(todoItems[i].date);

      todoListDiv.appendChild(dateTodos);
      dateTodos.appendChild(dateDiv);
      dateDiv.appendChild(date);
    }
    if (dates.includes(todoItems[i].date)) {
      const dateDiv = document.getElementById(`${todoItems[i].date}`);

      const buttonsDiv = document.createElement("div");
      buttonsDiv.classList.add("buttons-div");

      const trashcan = document.createElement("i");
      trashcan.classList.add("trashcan", "fa-solid", "fa-trash-can");
      trashcan.addEventListener("click", () => {
        deleteTodoItem(todoItems[i]);
        location.reload();   
      });

      const editButton = document.createElement("i");
      editButton.classList.add("edit-btn", "fa-solid", "fa-pen-to-square");
      editButton.addEventListener("click", () => {openEditForm(todoItems[i])});

      const checkBtn = document.createElement("i");
      checkBtn.classList.add("check-btn", "fa-solid", "fa-check");
      
      if (todoItems[i].isDone === true) {
        checkBtn.classList.toggle("checked-todo");
      }

      checkBtn.addEventListener("click", () =>  { checkTodoItem(todoItems[i]), showAllTodos() })

      const titleDiv = document.createElement("div");
      titleDiv.classList.add("title-div");

      const titlebox = document.createElement("div");
      titlebox.classList.add("title-box");
      const title = document.createTextNode(todoItems[i].title);

      dateDiv.appendChild(titleDiv);
      titleDiv.appendChild(titlebox);
      titleDiv.appendChild(buttonsDiv);
      buttonsDiv.appendChild(checkBtn);
      buttonsDiv.appendChild(trashcan);
      buttonsDiv.appendChild(editButton);
      
      titlebox.appendChild(title);
    }
  }
}

function showDayInfo(date) {
  todoListDiv.innerHTML = "";

  const dayInfo = document.createElement("div");
  dayInfo.classList.add("day-info");

  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].date === date) {
      const todoTitleDiv = document.createElement("div");
      todoTitleDiv.classList.add("selected-title-div");
      todoTitleDiv.innerHTML = `${todoItems[i].title}`;

      const todoDescriptionDiv = document.createElement("div");
      todoDescriptionDiv.classList.add("selected-desc-div");
      todoDescriptionDiv.innerHTML = `${todoItems[i].description}`;

      const titleDescBox = document.createElement("div");
      titleDescBox.classList.add("title-desc-box");

      const editDeleteBox = document.createElement("div");
      editDeleteBox.classList.add("edit-delete-box");

      const selectedDateItem = document.createElement("div");
      selectedDateItem.classList.add("selected-date-item");

      const deleteDiv = document.createElement("div");
      const deleteBtn = document.createElement("i");
      deleteDiv.classList.add("delete-div");
      deleteBtn.classList.add("delete-btn", "fa-solid", "fa-trash-can");
      deleteBtn.addEventListener("click", () => {
        deleteTodoItem(todoItems[i]);
        renderCalendar();
        showAllTodos();
      });

      const editDiv = document.createElement("div");
      const editBtn = document.createElement("i");
      editDiv.classList.add("edit-div");
      editBtn.classList.add("edit-btn", "fa-solid", "fa-pen-to-square");
      editBtn.addEventListener("click", () => {openEditForm(todoItems[i])});

      dayInfo.appendChild(selectedDateItem);
      selectedDateItem.appendChild(titleDescBox);
      selectedDateItem.appendChild(editDeleteBox);
      titleDescBox.appendChild(todoTitleDiv);
      titleDescBox.appendChild(todoDescriptionDiv);
      editDeleteBox.appendChild(deleteDiv);
      editDeleteBox.appendChild(editDiv);
      editDiv.appendChild(editBtn);
      deleteDiv.appendChild(deleteBtn);
    }
  }

  todoListDiv.appendChild(dayInfo);
}

function setLocalstorage() {
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
}

// --------EDIT STUFFS---------

function openEditForm(todoItem) {
  document.querySelector(".modal-container").classList.toggle("hidden");
  const closeEditBtn = document.querySelector(".close-editform");
  closeEditBtn.addEventListener("click" , closeEditForm)
  
  const saveEditBtn = document.querySelector(".save-edit-btn");

  saveEditBtn.addEventListener("click",(ev) => saveEdit(todoItem, ev));
  saveEditBtn.addEventListener("click",closeEditForm);
  saveEditBtn.addEventListener("click",() => { showDayInfo(todoItem.date) });

  const titleInput = document.querySelector(".edit-title-form");
  const descInput = document.querySelector(".edit-description-form");
  const dateInput = document.querySelector(".edit-date-form");

  titleInput.value = todoItem.title;
  descInput.value = todoItem.description;
  dateInput.value = todoItem.date;

}

function closeEditForm() {
  document.querySelector(".modal-container").classList.toggle("hidden");
}
const editBtn = document.createElement("button");

function saveEdit(todoItem, ev) {
  ev.preventDefault();

  const editedTodoItem = {
    title: document.querySelector(".edit-title-form").value,
    description: document.querySelector(".edit-description-form").value,
    date: document.querySelector(".edit-date-form").value,
    isDone: false,
  };

  const index = todoItems.findIndex(
    (t) =>
      t.title === todoItem.title &&
      t.description === todoItem.description &&
      t.date === todoItem.date
  );

  if(editedTodoItem.title === "" || editedTodoItem.description === "" || editedTodoItem.date < getTodaysDateFormattedAsSwedishDate())
  {
    alert("Please, fill in all forms");
  }
  else {
    todoItems[index] = Object.assign({}, todoItems[index], editedTodoItem);
  
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
    document.forms[0].reset(); 
  }

}

// add-todo-item-button----------------------------------

function toggleContent() {
  btn.classList.toggle("add-todo-btn--active");

  if (btn.classList.contains("add-todo-btn--active")) {
    expandedContent.style.maxHeight = expandedContent.scrollHeight + "px";
  } else {
    expandedContent.style.maxHeight = 0;
    document.forms[0].reset();
  }
}

btn.addEventListener("click", toggleContent);


function checkTodoItem(todoItem) {
  
  const index = todoItems.findIndex(
    (t) =>
      t.title === todoItem.title &&
      t.description === todoItem.description &&
      t.date === todoItem.date
  );
  
  const todoItemToCheck = {
    title: todoItem.title,
    description: todoItem.description,
    date: todoItem.date,
    isDone: todoItem.isDone !== true
  };

  todoItems[index] = Object.assign({}, todoItems[index], todoItemToCheck);
  
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
}