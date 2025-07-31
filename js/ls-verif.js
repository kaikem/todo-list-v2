//--------------------------------------------------------------------
//IMPORTS
//createTask func
import { createTask } from "./create-new-task.js";

//--------------------------------------------------------------------
//DOM ELEMENTS
const incompTasksRow = document.getElementById("incompTasksRow");

//--------------------------------------------------------------------
//EXISTING DATA
//data in the LS
let LSIncompTasks = JSON.parse(localStorage.getItem("incomp-tasks"));
if (LSIncompTasks === null) {
    LSIncompTasks = [];
}

let LSCompTasks = JSON.parse(localStorage.getItem("comp-tasks"));
if (LSCompTasks === null) {
    LSCompTasks = [];
}

//create tasks with LS data
if (LSIncompTasks.length > 0) {
    LSIncompTasks.forEach((task) => createTask(task));
} else {
    incompTasksRow.innerHTML = "<div class='mt-3 p-0'><h4 class='text-danger display-6'>No To-Do Tasks Registered<h4></div>";
}

if (LSCompTasks.length > 0) {
    LSCompTasks.forEach((task) => createTask(task));
}

//--------------------------------------------------------------------
//EXPORTS
export { LSIncompTasks };
export { LSCompTasks };
