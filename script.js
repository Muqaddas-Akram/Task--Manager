 // Get the task list and form elements
 const taskList = document.getElementById('task-list');
 const taskForm = document.getElementById('task-form');
 const taskInput = document.getElementById('task-input');

 // Initialize the task list from local storage
 let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

 // Render the task list
 function renderTaskList() {
     taskList.innerHTML = '';
     tasks.forEach((task, index) => {
         const taskElement = document.createElement('li');
         taskElement.className = 'task';
         taskElement.innerHTML = `
             <div class="task-text ${task.completed ? 'completed' : ''}">${task.text}</div>
             <input type="checkbox" ${task.completed ? 'checked' : ''}>
             <button class="edit">Edit</button>
             <button class="delete">Delete</button>
         `;
         taskList.appendChild(taskElement);
     });
 }

 // Add a new task
 taskForm.addEventListener('submit', (e) => {
     e.preventDefault();
     const taskText = taskInput.value.trim();
     if (taskText) {
         tasks.push({ text: taskText, completed: false });
         localStorage.setItem('tasks', JSON.stringify(tasks));
         taskInput.value = '';
         renderTaskList();
     }
 });

 // Edit a task
 taskList.addEventListener('click', (e) => {
     if (e.target.classList.contains('edit')) {
         const taskElement = e.target.parentNode;
         const taskText = taskElement.querySelector('.task-text').textContent;
         const taskIndex = tasks.findIndex((task) => task.text === taskText);
         tasks[taskIndex].text = prompt('Edit task:', taskText);
         localStorage.setItem('tasks', JSON.stringify(tasks));
         renderTaskList();
     }
 });

 // Delete a task
 taskList.addEventListener('click', (e) => {
     if (e.target.classList.contains('delete')) {
         const taskElement = e.target.parentNode;
         const taskText = taskElement.querySelector('.task-text').textContent;
         const taskIndex = tasks.findIndex((task) => task.text === taskText);
         tasks.splice(taskIndex, 1);
         localStorage.setItem('tasks', JSON.stringify(tasks));
         renderTaskList();
     }
 });

 // Mark a task as completed
 taskList.addEventListener('click', (e) => {
     if (e.target.type === 'checkbox') {
         const taskElement = e.target.parentNode;
         const taskText = taskElement.querySelector('.task-text').textContent;
         const taskIndex = tasks.findIndex((task) => task.text === taskText);
         tasks[taskIndex].completed = e.target.checked;
         localStorage.setItem('tasks', JSON.stringify(tasks));
         renderTaskList();
     }
 });

 // Render the task list initially
 renderTaskList();