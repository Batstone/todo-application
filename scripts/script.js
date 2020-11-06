const todo = {}

const todoForm = document.querySelector('.todo-form');

todoForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const todoText = e.target.elements.todo.value

    e.target.elements.todo.value = ''

    const newTodo = {
        todo: todoText,
        completed: false
    }

    todo.todoGenerator(newTodo)

})


todo.todoGenerator = (todo) => {

    const list = document.querySelector('.todo-list')

    const newItem = document.createElement('li')

    newItem.innerHTML = `
        <p>todo: ${todo.todo}</p>
        <p>completed: ${todo.completed}</p>
    `

    list.append(newItem)
}