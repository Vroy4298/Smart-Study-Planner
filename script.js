const subjectInput = document.getElementById("subject");
const hoursInput = document.getElementById("hours");
const priorityInput = document.getElementById("priority");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const totalHoursEl = document.getElementById("totalHours");
const completedPercentEl = document.getElementById("completedPercent");
const progressEl = document.getElementById("progress");
const toast = document.getElementById("toast");
const dateEl = document.getElementById("date");

dateEl.textContent = new Date().toDateString();


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

addTaskBtn.addEventListener("click", () => {
    if (!subjectInput.value || !hoursInput.value) return;

    tasks.push({
        id: Date.now(),
        subject: subjectInput.value,
        hours: Number(hoursInput.value),
        priority: priorityInput.value,
        completed: false
    });

    subjectInput.value = "";
    hoursInput.value = "";

    updateApp();
    showToast("Task added");
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
    tasks = tasks.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
    );
    updateApp();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    updateApp();
    showToast("Task deleted");
}

function updateStats() {
    const total = tasks.reduce((s, t) => s + t.hours, 0);
    const done = tasks.filter(t => t.completed).length;
    const percent = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

    totalHoursEl.textContent = total;
    completedPercentEl.textContent = percent + "%";
    progressEl.style.width = percent + "%";
}

function showToast(msg) {
    toast.textContent = msg;
    toast.style.opacity = 1;
    setTimeout(() => toast.style.opacity = 0, 2000);
}

updateApp();
