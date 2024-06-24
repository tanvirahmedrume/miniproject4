const todo_form = document.querySelector(".todo-form");
const todoInput = document.querySelector("#inputTodo");
const todoLists = document.querySelector("#list");
const message = document.querySelector("#message");

// CreateTODO
const createTodo = (todoID, todoValue) => {
  if (todoValue.trim() !== "") {
    const now = new Date();
    const localDateTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    // Check if todoValue is not empty
    const todoElement = document.createElement("li");
    todoElement.id = todoID;
    todoElement.classList.add("li-style");
    todoElement.innerHTML = `
          <span> ${localDateTime} </span>
          <span class="flex-container">
            <span>${todoValue}</span>
            <button class="deBtn" id="deleteBTN"> <i class= "fa fa-trash">  </i> </button>
          </span>
    `;
    todoLists.appendChild(todoElement);

    const deleteButton = todoElement.querySelector("#deleteBTN");

    deleteButton.addEventListener("click", deleteTodo);
  }
};

// DeleteTodo
const deleteTodo = (e) => {
    const seletedTodo = e.target.parentElement.parentElement.parentElement;

  todoLists.removeChild(seletedTodo);
  showMessage("Todo is Deleted", "danger");


     let todos = getTodosFromLocalStroge();
     todos = todos.filter((todo) => todo.todoID !== seletedTodo.id);
     localStorage.setItem("mytodos", JSON.stringify(todos));

};

// GetTodosFromLocalStroge

const getTodosFromLocalStroge = () => {
  return localStorage.getItem("mytodos")
    ? JSON.parse(localStorage.getItem("mytodos"))
    : [];
};


// Show message
const showMessage = (t, s) => {
  message.textContent = t;
  message.classList.add(`bg_${s}`);
  setTimeout(() => {
    message.textContent = "";
    message.classList.remove(`bg_${s}`); // Remove the class after timeout
  }, 1000);
};


// addTODOFunction
const addTODOFunction = (e) => {
  e.preventDefault();
  const todoValue = todoInput.value.trim(); // Trim the input value

 const todoID = Date.now().toString();
  // const date = new Date();
  // const localDate = date.toLocaleDateString();
  // const localTime = date.toLocaleTimeString();
  createTodo(todoID, todoValue);

  

  showMessage("TODO is successfully added!", "success");

  // Adding TODO to local stroge
  const todos = getTodosFromLocalStroge();

  todos.push({ todoID, todoValue });
  localStorage.setItem("mytodos", JSON.stringify(todos));

  todoInput.value = "";
};

// LoadTodos
const loadTodos = () =>{
   const todos = getTodosFromLocalStroge();
   todos.map((todo) => createTodo(todo.todoID, todo.todoValue));
}

todo_form.addEventListener("submit", addTODOFunction);
window.addEventListener("DOMContentLoaded", loadTodos);
