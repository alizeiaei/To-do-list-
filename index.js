const todoInput = document.querySelector(".Input");
const todoButton = document.querySelector(".add-todo");
const todoList = document.querySelector(".todo-List");
const todoSelector = document.querySelector("#todo-select");

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkRemove);
todoSelector.addEventListener("click", renderProduct);
document.addEventListener("DOMContentLoaded", getLocalTodos);

function addTodo(e) {
  e.preventDefault();
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = `
  <li>${todoInput.value}</li>
  <i class="fa-sharp fa-solid fa-check-double"></i>
  <i class="fa-regular fa-trash-can"></i>`;
  todoDiv.innerHTML = newTodo;
  todoList.appendChild(todoDiv);
  saveLocalTodos(todoInput.value);
  todoInput.value = "";
}

function checkRemove(e) {
  const classList = [...e.target.classList];
  const item = e.target;
  if (classList[1] === "fa-solid") {
    item.parentElement.classList.toggle("completed");
  } else if (classList[1] === "fa-trash-can") {
    removeLocalTodos(item.parentElement);
    item.parentElement.remove();
  }
}

function renderProduct(e) {
  const todo = [...todoList.childNodes];
  todo.forEach((element) => {
    switch (e.target.value) {
      case "all":
        element.style.display = "flex";
        break;
      case "completed":
        if (element.classList.contains("completed")) {
          element.style.display = "flex";
        } else {
          element.style.display = "none";
        }
        break;
      case "unCompleted":
        if (!element.classList.contains("completed")) {
          element.style.display = "flex";
        } else {
          element.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let saveTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  saveTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(saveTodos));
}

function getLocalTodos() {
  let saveTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  saveTodos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = `
    <li>${todo}</li>
    <i class="fa-sharp fa-solid fa-check-double"></i>
    <i class="fa-regular fa-trash-can"></i>`;
    todoDiv.innerHTML = newTodo;
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let saveTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  const filterTodos = saveTodos.filter((i) => i !== todo.children[0].innerText);
  localStorage.setItem("todos", JSON.stringify(filterTodos));
}
