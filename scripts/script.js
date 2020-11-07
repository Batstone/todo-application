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
}

todo.renderTodos = () => {

    todo.DOMstrings.todoList.innerHTML = ''

    todo.todos.forEach((item) => {

        const newItem = document.createElement('li')

        newItem.innerHTML = `
        <button class="delete">X</button> <p>todo: ${item.todo}</p>
        <p>completed: ${item.completed}</p>
    `
        todo.DOMstrings.todoList.append(newItem)
    })


}

todo.storage = (newTodo) => {

    todo.todos.push(newTodo)

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

    todo.storage(newTodo)

})

todo.DOMstrings.todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {

    }
})

todo.init = () => {
    todo.start()
    todo.renderTodos()
}

todo.init()
