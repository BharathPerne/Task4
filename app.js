class Task {
    constructor(description, completed = false) {
      this.description = description;
      this.completed = completed;
    }
  }
  
  class ToDoList {
    constructor() {
      this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      this.taskList = document.getElementById('taskList');
      this.addTaskBtn = document.getElementById('addTaskBtn');
      this.taskInput = document.getElementById('taskInput');
  
      this.addTaskBtn.addEventListener('click', () => this.addTask());
      this.taskInput.addEventListener('keypress', (e) => this.handleKeyPress(e));
      this.renderTasks();
    }
  
    handleKeyPress(event) {
      if (event.key === 'Enter') {
        this.addTask();
      }
    }
  
    renderTasks() {
      this.taskList.innerHTML = '';
      this.tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span class="${task.completed ? 'completed' : ''}">${task.description}</span>
          <button class="edit-btn" data-index="${index}">Edit</button>
          <button class="delete-btn" data-index="${index}">Delete</button>
          <input type="checkbox" class="complete-checkbox" data-index="${index}" ${task.completed ? 'checked' : ''}>
      `;
        this.taskList.appendChild(li);
      });
  
      this.addEditDeleteListeners();
      this.addCompleteListeners();
    }
  
    addEditDeleteListeners() {
      const editBtns = document.querySelectorAll('.edit-btn');
      editBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const index = e.target.dataset.index;
          const newTaskDescription = prompt('Edit Task:', this.tasks[index].description);
          if (newTaskDescription !== null) {
            this.tasks[index].description = newTaskDescription.trim();
            this.saveTasks();
            this.renderTasks();
          }
        });
      });
  
      const deleteBtns = document.querySelectorAll('.delete-btn');
      deleteBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const index = e.target.dataset.index;
          this.tasks.splice(index, 1);
          this.saveTasks();
          this.renderTasks();
        });
      });
    }
  
    addCompleteListeners() {
      const checkboxes = document.querySelectorAll('.complete-checkbox');
      checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
          const index = e.target.dataset.index;
          this.tasks[index].completed = e.target.checked;
          this.saveTasks();
          this.renderTasks();
        });
      });
    }
  
    addTask() {
      const newTaskDescription = this.taskInput.value.trim();
      if (newTaskDescription !== '') {
        const newTask = new Task(newTaskDescription);
        this.tasks.push(newTask);
        this.saveTasks();
        this.renderTasks();
        this.taskInput.value = '';
      }
    }
  
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }
  
  const toDoList = new ToDoList();
  