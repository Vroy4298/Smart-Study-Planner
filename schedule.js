const list = document.getElementById("scheduleList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const order = { High: 1, Medium: 2, Low: 3 };

tasks.sort((a, b) => order[a.priority] - order[b.priority]);

tasks.forEach(t => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${t.subject}</strong> — ${t.hours} hrs (${t.priority})`;
    list.appendChild(li);
});
