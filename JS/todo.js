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

  localStorage.setItem("todoItems", JSON.stringify(todoItems));

  document.forms[0].reset();
};

document.getElementById("add-btn").addEventListener("click", addTodoItem);

function showAllTodos() {
  todoListDiv.innerHTML = "";

  for (let i = 0; i < todoItems.length; i++) {
    const todoTitle = document.createTextNode(todoItems[i].title);

    todoListDiv.appendChild(todoTitle);
  }
}
