//--------------------------------------------------------------------
//IMPORTS
//"task" class
import { Task } from "./class/task-class.js";
//createPopovers function
import { createPopovers } from "./popovers.js";
//LSIncompTasks variable
import { LSIncompTasks } from "./ls-verif.js";
//LSIncompTasks variable
import { LSCompTasks } from "./ls-verif.js";

//--------------------------------------------------------------------
//DOM ELEMENTS
const incompTasksRow = document.getElementById("incompTasksRow");
const compTasksRow = document.getElementById("compTasksRow");
const addNewTaskForm = document.getElementById("addNewTaskForm");
const titleInput = document.getElementById("titleInput");
const obsInput = document.getElementById("obsInput");
const priorityInput = document.getElementById("priorityInput");
const modalCancelBtn = document.getElementById("modalCancelBtn");

//--------------------------------------------------------------------
//EVENT LISTENERS
//for modal "Create" btn
addNewTaskForm.addEventListener("submit", () => {
    const newTaskTitle = titleInput.value;
    const newTaskObs = obsInput.value;
    const newTaskPriority = priorityInput.value;
    const newTask = new Task(newTaskTitle, newTaskObs, newTaskPriority, "incomplete");

    clearForm();

    createTask(newTask);

    LSIncompTasks.push(newTask);
    localStorage.setItem("incomp-tasks", JSON.stringify(LSIncompTasks));
});

//for modal "Cancel" btn
modalCancelBtn.addEventListener("click", () => clearForm());

//--------------------------------------------------------------------
//FUNCTIONS
//Setting tasks in LS
function addTaskToLS(key) {
    if (key === "incomp") {
        localStorage.setItem("incomp-tasks", JSON.stringify(LSIncompTasks));
    } else if (key === "comp") {
        localStorage.setItem("comp-tasks", JSON.stringify(LSCompTasks));
    }
}
//for clearing the form
function clearForm() {
    titleInput.value = "";
    obsInput.value = "";
    priorityInput.value = "0";
}

//for moving tasks
function moveTask() {
    const tasks = document.querySelectorAll(".task");
    tasks.forEach((task) => {
        if (task.classList.contains("complete")) {
            compTasksRow.appendChild(task);
        } else {
            incompTasksRow.appendChild(task);
        }
    });
}

//for creating tasks and adding to the HTML & LS (HTML only)
function createTask(taskObj) {
    //html element
    const taskEl = document.createElement("div");
    if (taskObj.status === "incomplete") {
        taskEl.className = `task rounded-3 d-flex justify-content-between align-items-center shadow mt-2 incomplete ${taskObj.priority}`;
    } else {
        taskEl.className = `task rounded-3 d-flex justify-content-between align-items-center shadow mt-2 complete ${taskObj.priority}`;
    }
    taskEl.innerHTML = `
                        <!--checkbox & title-->
                        <div class="task-title-cont d-flex align-items-center">
                            <input type="checkbox" class="task-checkbox form-check-input my-0 me-2" />
                            <h3 class="task-title m-0">${taskObj.title}</h3>
                        </div>
                        <!--info, edit & delete btns-->
                        <div id="taskBtnsCont" class="task-btns-cont d-flex rounded-3 ms-3">
                            <button
                                id="infoBtn"
                                class="task-btn popover-btn btn btn-lg bg-transparent text-info px-2 py-1"
                                data-bs-toggle="popover"
                                data-bs-title="Observations"
                                data-bs-content="${taskObj.obs}"
                            >
                                <i class="fa-solid fa-circle-info"></i>
                            </button>
                            <button id="editBtn" class="task-btn btn btn-lg bg-transparent text-warning px-2 py-1" title="Edit this Task" data-bs-toggle="modal" data-bs-target="#editTaskModal"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button id="deleteBtn" class="task-btn btn btn-lg bg-transparent text-danger px-2 py-1" title="Delete this Task"><i class="fa-solid fa-trash"></i></button>
                        </div>
    `;

    //inner elements
    const checkbox = taskEl.querySelector("input[type='checkbox']");
    const taskBtnsCont = taskEl.querySelector("#taskBtnsCont");
    const editBtn = taskEl.querySelector("#editBtn");

    //checkbox eventListener
    checkbox.addEventListener("change", () => {
        if (taskEl.classList.contains("complete")) {
            taskObj.status = "incomplete";
            taskEl.classList.add("incomplete");
            taskEl.classList.remove("complete");
            taskBtnsCont.classList.remove("complete");
            editBtn.classList.remove("d-none");
        } else {
            taskObj.status = "complete";
            taskEl.classList.remove("incomplete");
            taskEl.classList.add("complete");
            taskBtnsCont.classList.add("complete");
            editBtn.classList.add("d-none");
        }
        moveTask();
    });

    //insert into "Incomplete Tasks" row
    incompTasksRow.appendChild(taskEl);

    //popover creation
    createPopovers();
}

//--------------------------------------------------------------------
//EXPORTS
export { createTask };
