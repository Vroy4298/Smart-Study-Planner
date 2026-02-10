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

addTaskBtn.onclick = () => {
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

    update();
    showToast("Task added");
};

function update() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    render();
    stats();
}

function render() {
    taskList.innerHTML = "";
    tasks.forEach(t => {
        const d = document.createElement("div");
        d.className = "task" + (t.completed ? " completed" : "");
        d.innerHTML = `
            <div>
                <strong>${t.subject}</strong><br>
                ${t.hours} hrs • ${t.priority}
            </div>
            <div class="task-actions">
                <button onclick="toggle(${t.id})">✓</button>
                <button onclick="remove(${t.id})">✕</button>
            </div>
        `;
        taskList.appendChild(d);
    });
}

function toggle(id) {
    tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    update();
}

function remove(id) {
    tasks = tasks.filter(t => t.id !== id);
    update();
    showToast("Task removed");
}

function stats() {
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

update();
