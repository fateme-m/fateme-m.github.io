"use strict";

var todos = localStorage.getItem('todos'); // try parse data or null

try {
  todos = JSON.parse(todos);
  todos = todos.length ? todos : null;
} catch (e) {
  todos = null;
}

if (!todos) {
  todos = [{
    content: 'shopping',
    status: true
  }, {
    content: 'study',
    status: false
  }, {
    content: 'read a book',
    status: true
  }];
  localStorage.setItem('todos', JSON.stringify(todos));
}

function creatTodos(todos) {
  var todosList = document.querySelector('#todos-list');
  todosList.innerHTML = "";
  todos.forEach(function (todo, index) {
    var li = document.createElement('li');
    li.className = 'list-group-item';
    var content = document.createElement('span');
    content.textContent = todo.content;
    content.style.textDecoration = todo.status ? 'initial' : 'line-through';
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
    content.addEventListener('click', function (e) {
      todos[index].status = !todos[index].status;
      localStorage.setItem('todos', JSON.stringify(todos));
      creatTodos(todos);
    });
  });
}

creatTodos(todos); // action add & search

var actions = document.querySelector('#actions');
var fromWrapper = document.querySelector('#form-wrapper');
Array.from(actions.children).forEach(function (action) {
  // add todo
  if (action.dataset.action == 'add') {
    action.addEventListener('click', function (e) {
      fromWrapper.innerHTML = "\n                <form id=\"add\">\n                 <input type=\"text\" class=\"form-control\" name=\"add\" placeholder=\"add todos :\">\n                </form> ";
      creatTodos(todos);
      var add = document.querySelector('#add');
      add.addEventListener('submit', function (e) {
        e.preventDefault();

        if (add.add.value) {
          todos.push({
            content: add.add.value,
            status: true
          });
          localStorage.setItem('todos', JSON.stringify(todos));
          creatTodos(todos);
          add.add.value = '';
        }
      });
    }); //search todo
  } else if (action.dataset.action == 'search') {
    action.addEventListener('click', function (e) {
      fromWrapper.innerHTML = "\n                <form id=\"search\">\n                 <input type=\"text\" class=\"form-control\" name=\"search\" placeholder=\"search todos :\">\n                </form> ";
      var search = document.querySelector('#search');
      search.addEventListener('keyup', function (e) {
        e.preventDefault();

        if (search.search.value) {
          var filterTodos = todos.filter(function (todo) {
            return todo.content.toLowerCase().includes(search.search.value.toLowerCase());
          });
          creatTodos(filterTodos);
        } else {
          creatTodos(todos);
        }
      });
    });
  }
});