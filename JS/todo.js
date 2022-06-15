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

      const titleDiv = document.createElement("div");
      titleDiv.classList.add("title-div");
      const title = document.createTextNode(todoItems[i].title);

      dateDiv.appendChild(titleDiv);
      titleDiv.appendChild(title);
    }
  }
}

function setLocalstorage() {
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
}
