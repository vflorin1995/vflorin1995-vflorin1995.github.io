import './style.css';
import { getStorage, updateStorage } from './LocalStorage.js';
import { addTask, removeTask } from './functions.js';

const toDoList = document.querySelector('.toDoList');
const inputList = document.querySelector('.input');
const removeBtn = document.querySelector('button');

let tasklist = [];

const data = getStorage();
if (data) {
  tasklist = data;
}

const display = () => {
  toDoList.innerText = '';
  let indexValue = 1;
  tasklist.forEach((task) => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = task.completed;
    if (checkbox.value === 'true') {
      checkbox.checked = true;
    }
    checkbox.id = 'tick';
    checkbox.classList = 'checkbox';

    const editField = document.createElement('input');
    editField.className = 'editField';
    editField.value = task.description;

    const remove = document.createElement('div');
    remove.innerHTML = '<i class="fa-solid fa-trash"></i>';
    remove.className = 'remove';

    const index = document.createElement('h3');
    task.index = indexValue;
    index.innerText = indexValue;
    index.className = 'displayNone';
    indexValue += 1;

    const container = document.createElement('div');
    container.classList = 'flex border';
    container.append(checkbox, editField, remove, index);
    toDoList.append(container);
  });

  const closeBtn = Array.from(document.querySelectorAll('.remove'));
  closeBtn.forEach((element) => {
    element.addEventListener('click', () => {
      const z = closeBtn.indexOf(element);
      removeTask(tasklist, z);
      display();
    });
  });

  const checkArr = Array.from(document.querySelectorAll('.checkbox'));
  checkArr.forEach((element) => {
    const z = checkArr.indexOf(element);
    element.addEventListener('change', () => {
      if (element.value === 'true') {
        element.value = false;
        tasklist[z].completed = false;
      } else {
        element.value = true;
        tasklist[z].completed = true;
      }
      updateStorage(tasklist);
    });
  });

  const editBtn = Array.from(document.querySelectorAll('.editField'));
  editBtn.forEach((element) => {
    const z = editBtn.indexOf(element);
    element.addEventListener('focusout', () => {
      if (element.value) {
        const obj = tasklist[z];
        obj.description = element.value;
        updateStorage(tasklist);
      } else {
        removeTask(tasklist, z);
        display();
      }
    });
  });
  updateStorage(tasklist);
};

removeBtn.addEventListener('click', () => {
  tasklist = tasklist.filter((item) => !item.completed);
  display();
});

inputList.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    addTask(tasklist, inputList.value);
    inputList.value = '';
    display();
  }
});

display();