//IMPORTS
//"task" class
import { Task } from "./class/task-class.js";
import { createPopovers } from "./popovers.js";

//DOM ELEMENTS
const titleInput = document.getElementById("titleInput");
const obsInput = document.getElementById("obsInput");
const priorityInput = document.getElementById("priorityInput");
const modalCreateBtn = document.getElementById("modalCreateBtn");
const taskListRow = document.getElementById("taskListRow");
const tasksObj = [];

//EVENT LISTENERS
//for modal "Create" btn
modalCreateBtn.addEventListener("click", () => {
    const newTaskTitle = titleInput.value;
    const newTaskObs = obsInput.value;
    const newTaskPriority = priorityInput.value;
    const newTask = new Task(newTaskTitle, newTaskObs, newTaskPriority, "incomplete");
    tasksObj.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasksObj));

    titleInput.value = "";
    obsInput.value = "";
    priorityInput.value = "0";

    createTask(newTask);
    return newTask;
});

//FUNCTIONS
//for creating tasks and adding to the taskListRow and LS (HTML only)
function createTask(task) {
    const taskEl = document.createElement("div");
    if (task.status === "incomplete") {
        taskEl.className = `task rounded-3 d-flex justify-content-between align-items-center mt-2 ${task.priority}`;
    } else {
        taskEl.className = `task rounded-3 d-flex justify-content-between align-items-center mt-2 complete`;
    }
    taskEl.innerHTML = `
                        <!--checkbox & title-->
                        <div class="task-title-cont d-flex align-items-center">
                            <input type="checkbox" class="task-checkbox form-check-input my-0 me-2" />
                            <h3 class="task-title m-0">${task.title}</h3>
                        </div>
                        <!--info, edit & delete btns-->
                        <div id="taskBtnsCont" class="task-btns-cont d-flex rounded-3 ms-3">
                            <button
                                id="infoBtn"
                                class="task-btn popover-btn btn btn-lg bg-transparent text-info px-2 py-1"
                                data-bs-toggle="popover"
                                data-bs-title="${task.title} Observations"
                                data-bs-content="${task.obs}"
                            >
                                <i class="fa-solid fa-circle-info"></i>
                            </button>
                            <button id="editBtn" class="task-btn btn btn-lg bg-transparent text-warning px-2 py-1" title="Edit this Task"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button id="deleteBtn" class="task-btn btn btn-lg bg-transparent text-danger px-2 py-1" title="Delete this Task"><i class="fa-solid fa-trash"></i></button>
                        </div>
    `;
    taskListRow.appendChild(taskEl);
    createPopovers();
}

export { createTask };
