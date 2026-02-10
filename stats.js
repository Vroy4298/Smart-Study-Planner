const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const done = tasks.filter(t => t.completed).length;
const pending = tasks.length - done;

const canvas = document.getElementById("chart");
const ctx = canvas.getContext("2d");

const total = done + pending || 1;

const doneH = (done / total) * 150;
const pendH = (pending / total) * 150;

ctx.fillStyle = "#00f260";
ctx.fillRect(120, 180 - doneH, 60, doneH);

ctx.fillStyle = "#ff512f";
ctx.fillRect(220, 180 - pendH, 60, pendH);

ctx.fillStyle = "white";
ctx.fillText("Completed", 110, 200);
ctx.fillText("Pending", 220, 200);
