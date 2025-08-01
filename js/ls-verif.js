//--------------------------------------------------------------------
//IMPORTS
//createTask func
import { createTask } from "./create-new-task.js";

//--------------------------------------------------------------------
//DOM ELEMENTS
const incompTasksRow = document.getElementById("incompTasksRow");
const compTasksRow = document.getElementById("compTasksRow");

//--------------------------------------------------------------------
//EXISTING DATA
//data in the LS

//FUNCTION
//for creating tasks on page load with LS Data
let LSIncompTasks = JSON.parse(localStorage.getItem("incomp-tasks"));
console.log(LSIncompTasks);
let LSCompTasks = JSON.parse(localStorage.getItem("comp-tasks"));

updateLS();

function updateLS() {
    if (LSIncompTasks) {
        localStorage.setItem("incomp-tasks", JSON.stringify(LSIncompTasks));
        incompTasksRow.innerHTML = `<div class="col-12 d-flex flex-column p-0">
                                        <h1 id="todoTitle" class="display-6 mt-2 text-light">To-Do</h1>
                                    </div>`;
        LSIncompTasks.forEach((LSIncompTaskEl) => createTask(LSIncompTaskEl));
    } else if (LSIncompTasks === null) {
        LSIncompTasks = [];
        incompTasksRow.innerHTML = "<div class='mt-3 p-0'><h4 class='text-danger display-6'>No To-Do Tasks Registered<h4></div>";
    }

    if (LSCompTasks) {
        localStorage.setItem("comp-tasks", JSON.stringify(LSCompTasks));
        compTasksRow.innerHTML = `<div class="col-12 d-flex flex-column p-0">
                                    <span id="completedHR" class="rounded-5 bg-success"></span>
                                    <h1 id="completedTitle" class="text-success mt-2 display-6">Completed Tasks</h1>
                                </div>`;
        LSCompTasks.forEach((LSCompTaskEl) => createTask(LSCompTaskEl));
    } else if (LSCompTasks === null) {
        LSCompTasks = [];
    }
}

//--------------------------------------------------------------------
//EXPORTS
export { LSIncompTasks };
export { updateLS };
