//--------------------------------------------------------------------
//IMPORTS
//createTask func
import { createTask } from "./create-new-task.js";

//--------------------------------------------------------------------
//DOM ELEMENTS
const incompTasksRow = document.getElementById("incompTasksRow");

//--------------------------------------------------------------------
//EXISTING DATA
//tasks in the LS
let LStasks = JSON.parse(localStorage.getItem("tasks"));
if (LStasks === null) {
    LStasks = [];
}

//create tasks with LS data
if (LStasks.length > 0) {
    LStasks.forEach((task) => createTask(task));
} else {
    incompTasksRow.innerHTML = "<div class='mt-3 p-0'><h4 class='text-danger display-6'>No To-Do Tasks Registered<h4></div>";
}

//--------------------------------------------------------------------
//EXPORTS
export { LStasks };
