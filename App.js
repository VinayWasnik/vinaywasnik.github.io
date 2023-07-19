let taskId = 1;

function createTaskElement(name) {
  const taskElement = document.createElement('div');
  taskElement.id = 'task-' + taskId++;
  taskElement.className = 'task';
  taskElement.draggable = true;
  taskElement.addEventListener('dragstart', dragStart);
  taskElement.addEventListener('click', openModal);

  const taskName = document.createElement('p');
  taskName.textContent = name;

  const taskActions = document.createElement('div');
  taskActions.className = 'task-actions';

  const editButton = document.createElement('button');
  editButton.className = 'edit-task';
  editButton.innerHTML = '&#9998;';
  editButton.addEventListener('click', editTask);

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-task';
  deleteButton.innerHTML = '&#10006;';
  deleteButton.addEventListener('click', deleteTask);

  taskActions.appendChild(editButton);
  taskActions.appendChild(deleteButton);

  taskElement.appendChild(taskName);
  taskElement.appendChild(taskActions);

  return taskElement;
}

function dragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
}

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskName = taskInput.value.trim();
    if (taskName !== '') {
      const taskElement = createTaskElement(taskName);
      const openTasks = document.getElementById('open-tasks');
      openTasks.appendChild(taskElement);
      taskInput.value = '';
    }
  }
  
  function editTask(event) {
    const taskElement = event.target.closest('.task');
    const description = taskElement.dataset.description;
    const taskDescription = document.getElementById('task-description');
    taskDescription.value = description ? description : '';
    openModal(event);
  }
  
  function deleteTask(event) {
    event.stopPropagation();
    const taskElement = event.target.closest('.task');
    const sectionElement = taskElement.parentNode;
    sectionElement.removeChild(taskElement);
  }
  
  
  function openModal(event) {
    const taskElement = event.target.closest('.task');
    const modal = document.getElementById('task-modal');
    const closeModal = modal.querySelector('.close');
    const saveButton = modal.querySelector('#save-description');
    const descriptionInput = modal.querySelector('#task-description');
    descriptionInput.value = '';
  
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    saveButton.addEventListener('click', () => {
      const description = descriptionInput.value;
      taskElement.dataset.description = description;
      modal.style.display = 'none';
    });
  
    modal.style.display = 'block';
    const taskDescription = taskElement.dataset.description;
    descriptionInput.value = taskDescription ? taskDescription : '';
  }
  
  function closeModal() {
    const modal = document.getElementById('task-modal');
    modal.style.display = 'none';
  }
  
  function saveDescription() {
    const modal = document.getElementById('task-modal');
    modal.style.display = 'none';
  }
  
  function allowDrop(event) {
    event.preventDefault();
  }
  
  function drop(event, section) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');
    const taskElement = document.getElementById(taskId);
    const sectionElement = document.getElementById(section + '-tasks');
    sectionElement.appendChild(taskElement);
  }
  
  
