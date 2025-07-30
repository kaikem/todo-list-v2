//IMPORTS
//createTask func
import { createTask } from "./create-new-task.js";

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

//for changing tasks to comp/incomp rows
function checkboxesListeners() {
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    console.log("OUT: " + checkboxes);

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", (event) => {
            const parentTask = event.target.parentNode.parentNode;
            console.log("EL: " + parentTask);
            if (parentTask.classList.contains("complete")) {
                parentTask.classList.remove("complete");
            } else {
                parentTask.classList.add("complete");
            }
        });
    });
}

//EXPORTS
export { LStasks };
export { checkboxesListeners };
