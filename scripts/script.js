const todo = {}

todo.todos = []

todo.DOMstrings = {
    todoForm: document.querySelector('.todo-form'),
    addButton: document.querySelector('.add'),
    deleteAll: document.querySelector('.clear'),
    todoList: document.querySelector('.todo-list'),
    deleteTodo: document.querySelector('.delete')
}

todo.DOMstrings.deleteAll.addEventListener('click', (e) => {
    todo.DOMstrings.todoList.innerHTML = ''
    localStorage.clear();
})

todo.start = () => {
    const todosJSON = localStorage.getItem('todos')
    todo.todos = todosJSON ? JSON.parse(todosJSON) : []

    if (todo.todos !== []) {
        todo.renderTodos()
    }
}

todo.renderTodos = () => {

    todo.DOMstrings.todoList.innerHTML = ''

    todo.todos.forEach((item) => {

        const newItem = document.createElement('li')

        newItem.innerHTML = `
        <button class="delete">X</button> <p>todo: ${item.todo}</p>
        <button class="completed">Done</button>
        <p>completed: ${item.completed}</p>
    `
        todo.DOMstrings.todoList.append(newItem)
    })
}

todo.storage = () => {

    localStorage.setItem('todos', JSON.stringify(todo.todos))

    todo.renderTodos();
}

todo.DOMstrings.todoForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const todoText = e.target.elements.todo.value

    e.target.elements.todo.value = ''

    const newTodo = {
        todo: todoText,
        completed: false
    }

    todo.todos.push(newTodo)
    todo.storage()
})

todo.DOMstrings.todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        const deletedTodo = e.target.nextSibling.nextSibling.innerText.substring(6)

        todo.todos.filter((selection) => {
            if (selection.todo === deletedTodo) {

                const indexSearch = todo.todos.indexOf(selection)
                todo.todos.splice(indexSearch, 1)
                todo.storage()
            }
        })
    }

    if (e.target.classList.contains('completed')) {
        const completedTodo = e.target.previousSibling.previousSibling.innerText.substring(6)

        todo.todos.filter((selection) => {
            if (selection.todo === completedTodo) {
                const indexSearch = todo.todos.indexOf(selection)

                todo.todos[indexSearch].completed = true
                todo.storage()
            }
        })
    }
})

todo.init = () => {
    todo.start()
}

todo.init()
