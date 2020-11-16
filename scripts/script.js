// Todo app object
const todo = {}

// Array for storing individual todo objects
todo.todos = []

// DOM strings are organized here for easy access
todo.DOMstrings = {
    todoForm: document.querySelector('.todo-form'),
    addButton: document.querySelector('.add'),
    deleteAll: document.querySelector('.clear'),
    todoList: document.querySelector('.todo-list'),
    deleteTodo: document.querySelector('.delete')
}

// The listener for deleting all the todos on the page
todo.DOMstrings.deleteAll.addEventListener('click', (e) => {
    todo.DOMstrings.todoList.innerHTML = ''
    todo.todos = []
    localStorage.clear();
})

// The start function that will run when the app is initialized
todo.start = () => {

    // Checking local storage for any saved todos
    const todosJSON = localStorage.getItem('todos')
    // If nothing exists in storage, we want to return an empty array
    todo.todos = todosJSON ? JSON.parse(todosJSON) : []

    // If there is something in storage, then we want to render them on the page
    if (todo.todos !== []) {
        todo.renderTodos()
    }
}

// The render function that paints the DOM with each todo
todo.renderTodos = () => {

    // Start by clearing the UL list so that it can be updated properly
    todo.DOMstrings.todoList.innerHTML = ''

    todo.todos.forEach((item) => {

        // Create a new li for each todo
        const newItem = document.createElement('li')

        // The code that will be contained in each li (todo).
        newItem.innerHTML = `

        <div class="new-todo-container">
            <div class="new-todo-text">
                <p>todo: ${item.todo}</p>
                <p>completed: ${item.completed}</p>
                <p>id: ${item.id}</p>
            </div>
            <div class="icon-column">
                <i class="fas fa-trash-alt delete"></i>
                <i class="fas fa-check-square completed"></i>
            </div>
        </div>
    `
        // Appending each li to the ul
        todo.DOMstrings.todoList.append(newItem)
    })
}

// Function for setting items into local storage
todo.storage = () => {

    localStorage.setItem('todos', JSON.stringify(todo.todos))

    // Every time storage recieves an update, we want to rerender the list of todos
    todo.renderTodos();
}

// The form for adding a new todo item
todo.DOMstrings.todoForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const todoText = e.target.elements.todo.value

    e.target.elements.todo.value = ''

    const newTodo = {
        todo: todoText,
        completed: false,
        id: uuidv4()
    }

    // Pushing the todo into the local array
    todo.todos.push(newTodo)

    // Adding the new todo into storage
    todo.storage()
})

// An example of event delegation. The listener is on the UL but we are specifially looking for events that fire on our delete and completed icons
todo.DOMstrings.todoList.addEventListener('click', (e) => {

    // The delete icon event
    if (e.target.classList.contains('delete')) {
        const selectedTodo = e.target.parentNode.previousElementSibling.lastElementChild.innerText.substring(4)

        todo.todos.filter((selection) => {
            if (selection.id === selectedTodo) {
                const indexSearch = todo.todos.indexOf(selection)
                todo.todos.splice(indexSearch, 1)
                todo.storage()
            }
        })
    }

    // The completed icon event
    if (e.target.classList.contains('completed')) {
        const selectedTodo = e.target.parentNode.previousElementSibling.lastElementChild.innerText.substring(4)

        todo.todos.filter((selection) => {
            if (selection.id === selectedTodo) {
                const indexSearch = todo.todos.indexOf(selection)
                todo.todos[indexSearch].completed = !todo.todos[indexSearch].completed
                todo.storage()
            }
        })
    }
})

// The init function to start up the application
todo.init = () => {
    todo.start()
}

// The initial call of the init
todo.init()
