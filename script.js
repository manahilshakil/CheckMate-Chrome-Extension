const taskInput = document.querySelector('.task-input');
const addButton = document.querySelector('.add-button');

const taskList = document.querySelector('.tasks');

// Create a new task element
function createNewTask(taskContent) {
  const newTaskItem = document.createElement('li');
  newTaskItem.classList.add('task'); 

  const taskCheckbox = document.createElement('input');
  taskCheckbox.type = 'checkbox';

  const taskLabel = document.createElement('label');
  taskLabel.innerText = taskContent;

  const deleteSpan = document.createElement('span');
  deleteSpan.classList.add('delete-btn');
  deleteSpan.innerHTML = '<i class="fa fa-trash"></i>'; 
  
  // Event listener for checkbox to toggle task completion visually
  taskCheckbox.addEventListener('change', () => {
    newTaskItem.classList.toggle('completed');
    const completedTasksList = document.querySelector('.completed-tasks');
    if (taskCheckbox.checked) {
      taskList.removeChild(newTaskItem); 
      completedTasksList.appendChild(newTaskItem); 
      completedTasksList.removeChild(newTaskItem); 
      taskList.appendChild(newTaskItem); 
    }
  });

    deleteSpan.addEventListener('click', () => {
    taskList.removeChild(newTaskItem);
  });

    newTaskItem.appendChild(taskCheckbox);
  newTaskItem.appendChild(taskLabel);
  newTaskItem.appendChild(deleteSpan); 

  return newTaskItem;
}

// Add event listener to the 'add button' to create and add new tasks
addButton.addEventListener('click', () => {
  const newTaskText = taskInput.value.trim(); 

  if (newTaskText) {
    const newTask = createNewTask(newTaskText);
    taskList.appendChild(newTask);
    taskInput.value = ''; 
  }
});

// Select the filter buttons 
const completeFilter = document.querySelector('.filter[data-filter="completed"]');
const incompleteFilter = document.querySelector('.filter[data-filter="pending"]');
const deleteAllButton = document.querySelector('.delete-all');

// Function to filter tasks based on the provided filter value ("completed" or "pending")
function filterTasks(filterValue) {
  const tasks = document.querySelectorAll('.task');
  tasks.forEach(task => {
    const isCompleted = task.classList.contains('completed');
    if (filterValue === 'all' || (filterValue === 'completed' && isCompleted) || (filterValue === 'pending' && !isCompleted)) {
      task.classList.remove('hidden');
    } else {
      task.classList.add('hidden');
    }
  });
}

// Event listeners for filter buttons
completeFilter.addEventListener('click', () => filterTasks('completed'));
incompleteFilter.addEventListener('click', () => filterTasks('pending'));

// Event listener for "Delete All" button
deleteAllButton.addEventListener('click', () => {
  taskList.innerHTML = '';
});

filterTasks();