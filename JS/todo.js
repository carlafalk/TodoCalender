let todoItems = [];

const addTodoItem = (ev) => {
  ev.preventDefault();

  let todoItem = {
    title: document.getElementById("todo-title").value,
    description: document.getElementById("todo-desc").value,
    date: document.getElementById("date").value,
    isDone: false,
  };

  todoItems.push(todoItem);

  document.forms[0].reset();
};

document.getElementById("add-btn").addEventListener("click", addTodoItem);

console.log(todoItems);
