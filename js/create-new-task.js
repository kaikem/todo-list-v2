//CLASS IMPORT
import { Task } from "./class/task-class.js";

//DOM ELEMENTS
const titleInput = document.getElementById("titleInput");
const obsInput = document.getElementById("obsInput");
const priorityInput = document.getElementById("priorityInput");
const modalCreateBtn = document.getElementById("modalCreateBtn");
const taskListRow = document.getElementById("taskListRow");

//EVENT LISTENERS
//for modal "Create" btn
modalCreateBtn.addEventListener("click", () => {
    const newTaskTitle = titleInput.value;
    const newTaskObs = obsInput.value;
    const newTaskPriority = priorityInput.value;
    const newTask = new Task(newTaskTitle, newTaskObs, newTaskPriority);

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
    taskEl.className = `task rounded-3 text-bg-light d-flex justify-content-between align-items-center mt-2 ${task.priority}`;
    taskEl.innerHTML = `
                        <!--checkbox & title-->
                        <div class="task-title-cont d-flex align-items-center">
                            <input type="checkbox" class="task-checkbox form-check-input my-0 me-2" />
                            <label for="taskTitle"><h3 class="task-title m-0">${task.title}</h3></label>
                        </div>
                        <!--info, edit & delete btns-->
                        <div id="taskBtnsCont" class="task-btns-cont d-flex rounded-3 ms-3">
                            <button
                                id="infoBtn"
                                class="task-btn popover-btn btn btn-lg bg-transparente text-info px-2 py-1"
                                data-bs-toggle="popover"
                                data-bs-title="${task.title} Observations"
                                data-bs-content="${task.obs}"
                            >
                                <i class="fa-solid fa-circle-info"></i>
                            </button>
                            <button id="editBtn" class="task-btn btn btn-lg bg-transparente text-warning px-2 py-1" title="Edit this Task"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button id="deleteBtn" class="task-btn btn btn-lg bg-transparente text-danger px-2 py-1" title="Delete this Task"><i class="fa-solid fa-trash"></i></button>
                        </div>
    `;
    taskListRow.appendChild(taskEl);
}
