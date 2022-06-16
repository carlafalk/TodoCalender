let todoItems = JSON.parse(localStorage.getItem("todoItems"));
if (!todoItems) {
  todoItems = [];
}

const addTodoItem = (ev) => {
  ev.preventDefault();

  let todoItem = {
    title: document.getElementById("todo-title").value,
    description: document.getElementById("todo-desc").value,
    date: document.getElementById("date").value,
    isDone: false,
  };

  todoItems.push(todoItem);

  setLocalstorage();

  document.forms[0].reset();
};

document.getElementById("add-btn").addEventListener("click", addTodoItem);
document.getElementById("add-btn").addEventListener("click", renderCalendar);
document.getElementById("add-btn").addEventListener("click", showAllTodos);

function showAllTodos() {
  const dates = [];
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

      const trashcan = document.createElement("i");
      trashcan.classList.add("trashcan", "fa-solid", "fa-trash-can");
      trashcan.addEventListener("click", () => {
        deleteTodoItem(todoItems[i]);
        renderCalendar();
      });

      const titleDiv = document.createElement("div");
      titleDiv.classList.add("title-div");

      const titlebox = document.createElement("div");
      titlebox.classList.add("title-box");
      const title = document.createTextNode(todoItems[i].title);

      dateDiv.appendChild(titleDiv);
      titleDiv.appendChild(titlebox);
      titleDiv.appendChild(trashcan);
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
      editBtn.addEventListener("click", () => editTodoItem(todoItems[i]));

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


const editBtn = document.createElement("button");

function editTodoItem(todoItem) {

  toggleContent();
  const titleInput = document.querySelector("#todo-title");
  const descInput = document.querySelector("#todo-desc");
  const dateInput = document.querySelector("#date");

  titleInput.value = `${todoItem.title}`;
  descInput.value = `${todoItem.description}`;
  dateInput.value = `${todoItem.date}`;

  const forms = document.querySelector(".forms")
  
  editBtn.innerHTML = "Edit";
  editBtn.classList.add('save-edit-btn');

  forms.appendChild(editBtn);
  
  const todoItems2 = JSON.parse(localStorage.getItem("todoItems"));

  const itemToEdit = todoItems2.filter(t => t.title === todoItem.title && t.description === todoItem.description && t.date === todoItem.date);

  itemToEdit.title = titleInput.value;
  itemToEdit.description = descInput.value;
  itemToEdit.date = dateInput.value;

  

  console.log(itemToEdit);
}


// add-todo-item-button----------------------------------

const btn = document.querySelector(".add-todo-btn");
const expandedContent = document.querySelector(".expanded-content");

function toggleContent() {
  btn.classList.toggle("add-todo-btn--active");

  if (btn.classList.contains("add-todo-btn--active")) {
    expandedContent.style.maxHeight = expandedContent.scrollHeight + "px";
  } else {
    expandedContent.style.maxHeight = 0;
  }
}

btn.addEventListener("click", toggleContent);
