//IMPORTS
//createTask func
import { createTask } from "./create-new-task.js";

//EXISTING DATA
const LStasks = JSON.parse(localStorage.getItem("tasks"));

if (LStasks) {
    LStasks.forEach((task) => createTask(task));
}
