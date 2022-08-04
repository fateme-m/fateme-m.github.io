let todos = localStorage.getItem('todos')
// try parse data or null
try {
    todos = JSON.parse(todos)
    todos = todos.length ? todos : null
} catch (e) {
    todos = null
}

if (!todos) {
    todos = [{
            content: 'shopping',
            status: true
        },
        {
            content: 'study',
            status: false
        },
        {
            content: 'read a book',
            status: true
        }
    ]
    localStorage.setItem('todos', JSON.stringify(todos))
}

function creatTodos(todos) {
    let todosList = document.querySelector('#todos-list')
    todosList.innerHTML = ""

    todos.forEach((todo, index) => {
        let li = document.createElement('li')
        li.className = 'list-group-item'
        let content = document.createElement('span')
        content.textContent = todo.content
        content.style.textDecoration = todo.status ? 'initial' : 'line-through'
        let deleteBtn = document.createElement('img')
        deleteBtn.src = 'media/trash.svg'
        deleteBtn.alt = 'delete icon'
        deleteBtn.className = 'float-right'

        li.append(content)
        li.append(deleteBtn)
        todosList.append(li)

        deleteBtn.addEventListener('click', e => {
            todos.splice(index, 1)
            localStorage.setItem('todos', JSON.stringify(todos))
            creatTodos(todos)
        })

        content.addEventListener('click', e => {
            todos[index].status = !todos[index].status
            localStorage.setItem('todos', JSON.stringify(todos))
            creatTodos(todos)
        })
    })
}
creatTodos(todos)

// action add & search
const actions = document.querySelector('#actions')
const fromWrapper = document.querySelector('#form-wrapper')

Array.from(actions.children).forEach(action => {
    // add todo
        if (action.dataset.action == 'add') {
            action.addEventListener('click', e => {
                fromWrapper.innerHTML = `
                <form id="add">
                 <input type="text" class="form-control" name="add" placeholder="add todos :">
                </form> `
                creatTodos(todos)

                let add = document.querySelector('#add')
                add.addEventListener('submit', e =>{
                     e.preventDefault()
                     if(add.add.value){
                        todos.push({content: add.add.value , status : true})
                        localStorage.setItem('todos', JSON.stringify(todos))
                        creatTodos(todos)
                        add.add.value = ''
                     }
                })
            })
          
            //search todo
        } else if (action.dataset.action == 'search') {
            action.addEventListener('click', e => {
                fromWrapper.innerHTML = `
                <form id="search">
                 <input type="text" class="form-control" name="search" placeholder="search todos :">
                </form> `

                let search = document.querySelector('#search')
                search.addEventListener('keyup', e =>{
                     e.preventDefault()
                     if(search.search.value){
                        let filterTodos = todos.filter(todo => todo.content.toLowerCase().includes(search.search.value.toLowerCase()))
                        creatTodos(filterTodos)
                        
                     }else{
                        creatTodos(todos)

                     }
                })
            })
        }
    }
)