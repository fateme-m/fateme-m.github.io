"use strict";

var todos = localStorage.getItem('todos');
console.log(todos); // try parse data or null

try {
  todos = JSON.parse(todos);
  todos = todos.length ? todos : null;
} catch (e) {
  todos = null;
}

if (!todos) {
  todos = ['shopping', 'study', 'read a book'];
  localStorage.setItem('todos', JSON.stringify(todos));
}

function creatTodos(todos) {
  var todosList = document.querySelector('#todos-list');
  todosList.innerHTML = "";
  todos.forEach(function (todo, index) {
    var li = document.createElement('li');
    li.className = 'list-group-item';
    var content = document.createElement('span');
    content.textContent = todo;
    var deleteBtn = document.createElement('img');
    deleteBtn.src = 'media/trash.svg';
    deleteBtn.alt = 'delete icon';
    deleteBtn.className = 'float-right';
    li.append(content);
    li.append(deleteBtn);
    todosList.append(li);
    deleteBtn.addEventListener('click', function (e) {
      todos.splice(index, 1);
      localStorage.setItem('todos', JSON.stringify(todos));
      creatTodos(todos);
    });
  });
}

creatTodos(todos);