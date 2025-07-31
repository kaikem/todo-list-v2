//--------------------------------------------------------------------
//IMPORTS
//"task" class
import { Task } from "./class/task-class.js";
//createPopovers function
import { createPopovers } from "./popovers.js";
//LStasks variable
import { LStasks } from "./ls-verif.js";

//--------------------------------------------------------------------
//DOM ELEMENTS
const incompTasksRow = document.getElementById("incompTasksRow");
const compTasksRow = document.getElementById("compTasksRow");
const addBtn = document.getElementById("addBtn");
const addBtnSm = document.getElementById("addBtnSm");
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
    LStasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(LStasks));

    clearForm();

    createTask(newTask);
});

//for modal "Cancel" btn
modalCancelBtn.addEventListener("click", () => clearForm());

//--------------------------------------------------------------------
//FUNCTIONS
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
    const taskEl = document.createElement("div");
    if (taskObj.status === "incomplete") {
        taskEl.className = `task rounded-3 d-flex justify-content-between align-items-center shadow mt-2 ${taskObj.priority}`;
    } else {
        taskEl.className = `task rounded-3 d-flex justify-content-between align-items-center shadow mt-2 complete`;
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

    //TaskEl inner elements
    const checkbox = taskEl.querySelector("input[type='checkbox']");
    const taskBtnsCont = taskEl.querySelector("#taskBtnsCont");
    const editBtn = taskEl.querySelector("#editBtn");

    //checkbox EL
    checkbox.addEventListener("change", () => {
        if (taskEl.classList.contains("complete")) {
            taskEl.classList.remove("complete");
            editBtn.classList.remove("d-none");
        } else {
            taskEl.classList.add("complete");
            taskBtnsCont.classList.add("complete");
            editBtn.classList.add("d-none");
        }
        moveTask();
    });

    //insert into "Incomplete Tasks" row
    incompTasksRow.appendChild(taskEl);

    //elements function
    createPopovers();
}

//--------------------------------------------------------------------
//EXPORTS
export { createTask };
