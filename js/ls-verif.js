//--------------------------------------------------------------------
//IMPORTS
//createTask func
import { createTask } from "./create-new-task.js";

//--------------------------------------------------------------------
//EXISTING DATA
//tasks in the LS
let LStasks = JSON.parse(localStorage.getItem("tasks"));
if (LStasks === null) {
    LStasks = [];
}

//create tasks with LS data
if (LStasks) {
    LStasks.forEach((task) => createTask(task));
}

//--------------------------------------------------------------------
//EXPORTS
export { LStasks };
