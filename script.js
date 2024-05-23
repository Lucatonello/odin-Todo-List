function showForm() {
    document.getElementById('form').style.display = 'block';
}


function handleTodo() {
    const name = document.getElementById('form-name').value;
    const dueDate = document.getElementById('form-duedate').value;
    const description = document.getElementById('form-description');

    const newTodo = createTodo(name, dueDate, description);
    displayTodo(newTodo);
}


function createTodo(name, dueDate, description) {
    return {
        name: name,
        dueDate: dueDate,
        description: description,
        markCompleted: function() {
            this.completed = true;
        }
    }
}


function displayTodo(todo) {
    const newDiv = document.createElement('div');
    newDiv.className = 'todo-container';
    
    ///svg image
    const checkLogo = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    checkLogo.setAttribute('viewBox', '0 0 24 24');
    checkLogo.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    // Create the title element
    const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    title.textContent = 'circle-outline';
    checkLogo.appendChild(title);

    // Create the path element
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z');
    checkLogo.appendChild(path);

    // Append the SVG to the newDiv
    newDiv.appendChild(checkLogo);

    const todoName = document.createElement('div');
    todoName.textContent = `${todo.name}`;
    newDiv.appendChild(todoName);

    const todoDuedate = document.createElement('p');
    todoDuedate.textContent = `${todo.dueDate}`;
    newDiv.appendChild(todoDuedate);

    ///const todoDescription = document.createElement('p');
    ///todoDescription.textContent = `Description: ${todo.description}`;
    ///newDiv.appendChild(todoDescription);

    const hr = document.createElement('hr');

    // Create the SVG element for the chevron down
    const chevronDown = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    chevronDown.setAttribute('viewBox', '0 0 24 24');
    chevronDown.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    const title2 = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    title2.textContent = 'chevron-down';
    chevronDown.appendChild(title2);
    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z');
    chevronDown.appendChild(path2);

    // Create the SVG element for the trash can outline
    const trashCan = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    trashCan.setAttribute('viewBox', '0 0 24 24');
    trashCan.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    const title3 = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    title3.textContent = 'trash-can-outline';
    trashCan.appendChild(title3);
    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3.setAttribute('d', 'M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z');
    trashCan.appendChild(path3);

    // Append the chevronDown and trashCan SVGs to the newDiv
    newDiv.appendChild(chevronDown);
    newDiv.appendChild(trashCan);

    const todoList = document.getElementById('todo-list');
    todoList.appendChild(newDiv);
    todoList.appendChild(hr);
}
