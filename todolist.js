let todos = localStorage.getItem('todos')
console.log(todos)

// try parse data or null
try {
    todos = JSON.parse(todos)
    todos = todos.length ? todos : null
} catch (e) {
    todos = null
}

if (!todos) {
    todos = [
        'shopping',
        'study',
        'read a book'
    ]
    localStorage.setItem('todos', JSON.stringify(todos))
}

function creatTodos(todos) {
    let todosList = document.querySelector('#todos-list')
    todosList.innerHTML = ""
    todos.forEach((todo,index) => {
            let li = document.createElement('li')
            li.className = 'list-group-item'
            let content = document.createElement('span')
            content.textContent = todo
            let deleteBtn = document.createElement('img')
            deleteBtn.src = 'media/trash.svg'
            deleteBtn.alt = 'delete icon'
            deleteBtn.className = 'float-right'

            li.append(content)
            li.append(deleteBtn)
            todosList.append(li)
            deleteBtn.addEventListener('click',  e=>{
                todos.splice(index , 1)
                localStorage.setItem('todos', JSON.stringify(todos))
                creatTodos(todos)
            })
        }

    )
}
creatTodos(todos)