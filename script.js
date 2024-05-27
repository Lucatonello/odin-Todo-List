let projects = {};

function showForm() {
    document.getElementById('form').style.display = 'block';
}

function closeForm() {
    document.getElementById('form').style.display = 'none';
}

function newProjectForm() {
    document.getElementById('project-form').style.display = 'block';
    document.getElementById('close-add-project').style.display = 'block';
}

function closeProjectForm() {
    document.getElementById('project-form').style.display = 'none';
    document.getElementById('close-add-project').style.display = 'none';
}

function newProject() {
    const projectName = document.getElementById('project-name').value;
    if (projectName && !projects[projectName]) {
        projects[projectName] = [];
        updateProjectsSidebar();
        console.log(projects);
    } else {
        console.log('Project name is empty or already exists');
    }
}

function updateProjectsSidebar() {
    const projectsSidebar = document.getElementById('projects-sidebar');
    projectsSidebar.innerHTML = '';
    for (const projectName in projects) {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project-item';
        projectDiv.setAttribute('onclick', 'selectProject()')
        projectDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>circle</title><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg><h2>${projectName}</h2>`;
        projectsSidebar.appendChild(projectDiv);
    }
}

function handleTodo() {
    const projectName = document.getElementById('form-project').value;
    if (!projectName || !projects[projectName]) {
        console.log('Invalid or non-existing project name');
        return;
    }

    const name = document.getElementById('form-name').value;
    const dueDate = document.getElementById('form-duedate').value;
    const description = document.getElementById('form-description').value;

    const newTodo = createTodo(name, dueDate, description);
    projects[projectName].push(newTodo);
    displayTodo(newTodo, projectName);
}

function createTodo(name, dueDate, description) {
    return {
        name: name,
        dueDate: dueDate,
        description: description,
        markComplete: function() {
            this.complete = true;
        }
    };
}

function displayTodo(todo, projectName) {
    const projectNamePlaceholder = document.getElementById('projectName-placeholder');
    projectNamePlaceholder.innerHTML = ''; 
    const addTitle = document.createElement('h2');
    addTitle.textContent = projectName;
    projectNamePlaceholder.appendChild(addTitle);
    
    const newDiv = document.createElement('div');
    newDiv.className = 'todo-container';
    newDiv.id = 'todo-container-' + Date.now();

    const todoContent = document.createElement('div');
    todoContent.className = 'todo-content';
    todoContent.id = 'todo-content-' + Date.now();

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

    const chevronDown = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    chevronDown.setAttribute('viewBox', '0 0 24 24');
    chevronDown.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M7,10L12,15L17,10H7Z');
    chevronDown.appendChild(path);
    chevronDown.className = 'chevron-down';
    newDiv.appendChild(chevronDown);

    const deleteTodoBtn = document.createElement('button');
    deleteTodoBtn.textContent = 'delete';
    deleteTodoBtn.className = 'delete-todo-btn';
    newDiv.appendChild(deleteTodoBtn);

    const todoDescription = document.createElement('div');
    todoDescription.textContent = `${todo.description}`;
    todoDescription.id = 'todo-description-' + Date.now();
    todoDescription.style.display = 'none';

    document.getElementById('todo-list').appendChild(newDiv);
    document.getElementById('todo-list').appendChild(todoDescription);
    document.getElementById('todo-list').appendChild(hr);

    chevronDown.addEventListener('click', () => {
        const display = todoDescription.style.display === 'none' ? 'block' : 'none';
        todoDescription.style.display = display;
    });

    deleteTodoBtn.addEventListener('click', () => {
        newDiv.remove();
        todoDescription.remove();
        hr.remove();
    });
}
