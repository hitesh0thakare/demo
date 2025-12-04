const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const newBtn = document.getElementById('newBtn');
const saveBtn = document.getElementById('saveBtn');
const taskList = document.getElementById('taskList');

// Load tasks
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks();

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') addTask(); });
newBtn.addEventListener('click', createNew);
saveBtn.addEventListener('click', saveTasksToFile);

function addTask() {
const taskText = taskInput.value.trim();
if(taskText === '') return;
tasks.push({ text: taskText, completed: false });
taskInput.value = '';
saveTasks();
renderTasks();
}

function renderTasks() {
taskList.innerHTML = '';
tasks.forEach((task, index) => {
const li = document.createElement('li');
li.className = task.completed ? 'completed' : '';

li.innerHTML = `
<span onclick="toggleComplete(${index})">${task.text}</span>
<button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
`;

taskList.appendChild(li);
});
}

function toggleComplete(index) {
tasks[index].completed = !tasks[index].completed;
saveTasks();
renderTasks();
}

function deleteTask(index) {
tasks.splice(index, 1);
saveTasks();
renderTasks();
}

function saveTasks() {
localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createNew() {
if(confirm("Are you sure you want to create a new list? This will clear current tasks.")) {
tasks = [];
saveTasks();
renderTasks();
}
}

function saveTasksToFile() {
if(tasks.length === 0) return alert("No tasks to save!");
const dataStr = JSON.stringify(tasks, null, 2);
const blob = new Blob([dataStr], { type: "application/json" });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'tasks.json';
a.click();
URL.revokeObjectURL(url);
}

// Particle trail effect
document.addEventListener('mousemove', e => {
createParticle(e.clientX, e.clientY);
});

function createParticle(x, y) {
const particle = document.createElement('div');
particle.classList.add('particle');
particle.style.left = (x - 4) + 'px';
particle.style.top = (y - 4) + 'px';
particle.style.backgroundColor = randomColor();
document.body.appendChild(particle);
setTimeout(() => { particle.remove(); }, 800);
}

function randomColor() {
const colors = ['#fff700', '#ff6600', '#ff00ff', '#00ffff', '#ff3366'];
return colors[Math.floor(Math.random() * colors.length)];
}
