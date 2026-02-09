
const subjectInput = document.getElementById("subject");
const hoursInput = document.getElementById("hours");
const priorityInput = document.getElementById("priority");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const totalHoursEl = document.getElementById("totalHours");
const completedPercentEl = document.getElementById("completedPercent");
const progressEl = document.getElementById("progress");
const toast = document.getElementById("toast");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


addTaskBtn.addEventListener("click", () => {
    if (!subjectInput.value || !hoursInput.value) return;

    const task = {
        id: Date.now(),
        subject: subjectInput.value,
        hours: Number(hoursInput.value),
        priority: priorityInput.value,
        completed: false
    };

    tasks.push(task);
    updateApp();
    showToast("Task added");

    subjectInput.value = "";
    hoursInput.value = "";
});


function updateApp() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    updateStats();
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const div = document.createElement("div");
        div.className = `task ${task.completed ? "completed" : ""}`;

        div.innerHTML = `
            <div class="task-info">
                <strong>${task.subject}</strong><br>
                ${task.hours} hrs • ${task.priority}
            </div>
            <div class="task-actions">
                <button onclick="toggleComplete(${task.id})">✓</button>
                <button onclick="deleteTask(${task.id})">✕</button>
            </div>
        `;

        taskList.appendChild(div);
    });
}


function toggleComplete(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    updateApp();
}


function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    updateApp();
    showToast("Task deleted");
}

function updateStats() {
    const totalHours = tasks.reduce((sum, t) => sum + t.hours, 0);
    const completedCount = tasks.filter(t => t.completed).length;
    const percent = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

    totalHoursEl.textContent = totalHours;
    completedPercentEl.textContent = percent + "%";
    progressEl.style.width = percent + "%";
}


function showToast(message) {
    toast.textContent = message;
    toast.style.opacity = 1;

    setTimeout(() => {
        toast.style.opacity = 0;
    }, 2000);
}


updateApp();
