function showForm() {
    document.getElementById('form').style.display = 'block';
}

function closeForm() {
    document.getElementById('form').style.display = 'none';
}

function handleTodo() {
    const name = document.getElementById('form-name').value;
    const dueDate = document.getElementById('form-duedate').value;
    const description = document.getElementById('form-description').value;

    const newTodo = createTodo(name, dueDate, description);
    displayTodo(newTodo);
}


function createTodo(name, dueDate, description) {
    return {
        name: name,
        dueDate: dueDate,
        description: description,
        markComplete: function() {
            this.complete = true
        }
    }
}


function displayTodo(todo) {
    const newDiv = document.createElement('div');
    newDiv.className = 'todo-container';
    // Generate a unique ID for the new div
    newDiv.id = 'todo-container-' + Date.now();

    const todoContent = document.createElement('div');
    todoContent.className = 'todo-content';
    // Generate a unique ID for the todo content
    todoContent.id = 'todo-content-' + Date.now();

    ///check logo
    const checkLogo = document.createElement('input');
    checkLogo.setAttribute('type', 'radio');
    checkLogo.className = 'check-logo';
    newDiv.appendChild(checkLogo);

    const todoName = document.createElement('div');
    todoName.textContent = `${todo.name}`;
    todoContent.appendChild(todoName);

    const todoDuedate = document.createElement('p');
    todoDuedate.textContent = `${todo.dueDate}`;
    todoContent.appendChild(todoDuedate);

    newDiv.appendChild(todoContent);
    
    const hr = document.createElement('hr');
    hr.id = 'todo-hr-' + Date.now();

    // Create the SVG element for the chevron down
    const chevronDown = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    chevronDown.setAttribute('viewBox', '0 0 24 24');
    chevronDown.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    chevronDown.setAttribute('class', 'expandTodo');
    const chevronTitle = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    chevronTitle.textContent = 'chevron-down';
    chevronDown.appendChild(chevronTitle);
    const chevronPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    chevronPath.setAttribute('d', 'M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z');
    chevronDown.appendChild(chevronPath);
    chevronDown.addEventListener('click', () => expandTodo(chevronDown, todo));
    newDiv.appendChild(chevronDown);

    // Create the SVG element for the trash can outline
    const trashCan = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    trashCan.setAttribute('viewBox', '0 0 24 24');
    trashCan.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    const title3 = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    title3.textContent = 'trash-can-outline';
    trashCan.appendChild(title3);
    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3.setAttribute('d', 'M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z');
    trashCan.addEventListener('click', () => deleteTodo(newDiv.id, todoContent.id, hr.id));
    trashCan.appendChild(path3);

    // Append the chevronDown and trashCan SVGs to the newDiv
    newDiv.appendChild(chevronDown);
    newDiv.appendChild(trashCan);

    const todoList = document.getElementById('todo-list');
    todoList.appendChild(newDiv);
    todoList.appendChild(hr);
}


function expandTodo(icon, todo) {
    const container = icon.closest('.todo-container');
    container.style.height = '150px';

    const todoDescription = document.createElement('p');
    todoDescription.textContent = `Description: ${todo.description}`;
    todoDescription.className = 'todo-description';
    container.querySelector('.todo-content').appendChild(todoDescription);
};
function deleteTodo(containerId, divId, hrId) {
    const container = document.getElementById(containerId);
    const div = document.getElementById(divId);
    const hr = document.getElementById(hrId);
    
    if (container) {
        container.remove();
    }

    if (div) {
        div.remove();
    }

    if (hr) {
        hr.remove();
    }
}
