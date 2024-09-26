// При завантаженні сторінки завантажити збережені завдання
window.addEventListener('load', loadTasks);

document.getElementById('new-task').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Кнопки для фільтрації
document.getElementById('show-all').addEventListener('click', showAllTasks);
document.getElementById('show-completed').addEventListener('click', showCompletedTasks);
document.getElementById('show-incomplete').addEventListener('click', showIncompleteTasks);

function addTask() {
    const taskText = document.getElementById('new-task').value;
    if (taskText === '') return; // Не додавати пусті завдання

    const now = new Date();
    const task = {
        text: taskText,
        completed: false,
        timestamp: now.toLocaleDateString() + ', ' + now.toLocaleTimeString().slice(0, 5)
    };

    // Додати завдання в LocalStorage
    saveTaskToLocalStorage(task);

    // Додати завдання в DOM
    renderTask(task);

    // Очистити поле введення
    document.getElementById('new-task').value = '';
}

function renderTask(task) {
    const taskList = document.getElementById('task-list');
    const li = document.createElement('li');
    li.classList.add('task-item'); // Додамо клас для фільтрації

    // Текст завдання
    const taskSpan = document.createElement('span');
    taskSpan.className = 'task-text';
    taskSpan.textContent = task.text;
    if (task.completed) {
        taskSpan.classList.add('completed');
        li.classList.add('completed-task'); // Додати клас для виконаних завдань
    }

    // Подвійний клік для редагування завдання
    taskSpan.addEventListener('dblclick', function() {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = taskSpan.textContent;
        input.className = 'edit-input';
        
        // Зберегти зміни при натисканні Enter
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                taskSpan.textContent = input.value;
                li.replaceChild(taskSpan, input); // Замінити input назад на текст
                updateTaskInLocalStorage(task.text, input.value);
            }
        });

        li.replaceChild(input, taskSpan); // Замінити текст на поле вводу
        input.focus(); // Автоматичний фокус на полі вводу
    });

    // Дата і час додавання
    const timeStamp = document.createElement('span');
    timeStamp.className = 'time-stamp';
    timeStamp.textContent = task.timestamp;

    // Checkbox для виконання/повернення завдання
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            taskSpan.classList.add('completed'); // Перекреслити завдання
            li.classList.add('completed-task');
            task.completed = true;
        } else {
            taskSpan.classList.remove('completed'); // Прибрати перекреслення
            li.classList.remove('completed-task');
            task.completed = false;
        }
        updateTaskCompletionInLocalStorage(task.text, task.completed); // Оновити статус завдання в LocalStorage
    });

    // Кнопка для видалення завдання
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '&times;';
    deleteBtn.addEventListener('click', function() {
        taskList.removeChild(li); // Видалити завдання зі списку
        deleteTaskFromLocalStorage(task.text);
    });

    // Додати елементи до списку
    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    li.appendChild(timeStamp);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Функції фільтрації завдань
function showAllTasks() {
    const tasks = document.querySelectorAll('.task-item');
    tasks.forEach(task => {
        task.style.display = 'flex'; // Відображаємо всі завдання
    });
}

function showCompletedTasks() {
    const tasks = document.querySelectorAll('.task-item');
    tasks.forEach(task => {
        if (task.classList.contains('completed-task')) {
            task.style.display = 'flex'; // Відображаємо лише виконані завдання
        } else {
            task.style.display = 'none'; // Сховати невиконані завдання
        }
    });
}

function showIncompleteTasks() {
    const tasks = document.querySelectorAll('.task-item');
    tasks.forEach(task => {
        if (!task.classList.contains('completed-task')) {
            task.style.display = 'flex'; // Відображаємо лише невиконані завдання
        } else {
            task.style.display = 'none'; // Сховати виконані завдання
        }
    });
}

function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => renderTask(task));
}

function updateTaskInLocalStorage(oldText, newText) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.map(task => task.text === oldText ? { ...task, text: newText } : task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskCompletionInLocalStorage(taskText, isCompleted) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.map(task => task.text === taskText ? { ...task, completed: isCompleted } : task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
