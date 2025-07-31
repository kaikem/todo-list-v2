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

//FUNCTION
//for creating tasks on page load with LS Data
let LSIncompTasks = JSON.parse(localStorage.getItem("incomp-tasks"));
let LSCompTasks = JSON.parse(localStorage.getItem("comp-tasks"));

updateLS();

function updateLS() {
    if (LSIncompTasks) {
        localStorage.setItem("incomp-tasks", JSON.stringify(LSIncompTasks));
        LSIncompTasks.forEach((LSIncompTaskEl) => createTask(LSIncompTaskEl));
    } else if (LSIncompTasks === null) {
        LSIncompTasks = [];
        incompTasksRow.innerHTML = "<div class='mt-3 p-0'><h4 class='text-danger display-6'>No To-Do Tasks Registered<h4></div>";
    }

    if (LSCompTasks) {
        localStorage.setItem("comp-tasks", JSON.stringify(LSCompTasks));
        LSCompTasks.forEach((LSCompTaskEl) => createTask(LSCompTaskEl));
    } else if (LSCompTasks === null) {
        LSCompTasks = [];
    }
}

//--------------------------------------------------------------------
//EXPORTS
export { LSIncompTasks };
export { LSCompTasks };
export { updateLS };
