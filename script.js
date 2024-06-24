const container = document.querySelector(".container");
const todo_form = document.querySelector(".todo-form");
const todoInput = document.querySelector("#inputTodo");
const btn = document.querySelector("#addTodoButton");
const todoLists = document.querySelector("#list");
const message = document.querySelector("#message");

// CreateTODO
const createTodo = (a, b) => {
  if (b.trim() !== "") {
    // Check if todoValue is not empty
    const todoElement = document.createElement("li");
    todoElement.id = a;
    todoElement.classList.add("li-style");
    todoElement.innerHTML = `
          <span> ${b} </span>
          <span> <button class="btn" id="deleteBTN"> <i class= "fa fa-trash">  </i> </button> </span>
    `;
    todoLists.appendChild(todoElement);

    const deleteButton = todoElement.querySelector("#deleteBTN");

    deleteButton.addEventListener("click", deleteBTN);
  }
};

// DeleteTodo
const deleteBTN = () => {
  console.log("Delete todo.");
};

// Show message
const showMessage = (t, s) => {
  message.textContent = t;
  message.classList.add(`bg_${s}`);
  setTimeout(() => {
    message.textContent = "";
    message.classList.remove(`bg_${s}`); // Remove the class after timeout
  }, 2000);
};

// GetTodosFromLocalStroge

const getTodosFromLocalStroge = () => {
  return localStorage.getItem("mytodos")
    ? JSON.parse(localStorage.getItem("mytodos"))
    : [];
};

// addTODOFunction
const addTODOFunction = (e) => {
  e.preventDefault();
  const todoValue = todoInput.value.trim(); // Trim the input value

  const todoID = Date.now().toString();
  createTodo(todoID, todoValue);

  showMessage("TODO is successfully added!", "success");

  // Adding TODO to local stroge
  const todos = getTodosFromLocalStroge();

  todos.push({ todoID, todoValue });
  localStorage.setItem("mytodos", JSON.stringify(todos));

  todoInput.value = "";
};

todo_form.addEventListener("submit", addTODOFunction);
