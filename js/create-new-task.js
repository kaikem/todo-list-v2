//--------------------------------------------------------------------
//IMPORTS
//class
import { Task } from "./class/task-class.js";
//function
import { createPopovers } from "./popovers.js";
//objects array
import { LSIncompTasks } from "./ls-verif.js";
//function
import { updateLS } from "./ls-verif.js";

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
addNewTaskForm.addEventListener("submit", (e) => {
    const newTaskTitle = titleInput.value;
    const newTaskObs = obsInput.value;
    const newTaskPriority = priorityInput.value;
    const newTask = new Task(newTaskTitle, newTaskObs, newTaskPriority, "incomplete");
    LSIncompTasks.push(newTask);
    console.log("ADD: ");
    console.log(LSIncompTasks);

    clearForm();

    updateLS();
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
        } else if (task.classList.contains("incomplete")) {
            incompTasksRow.appendChild(task);
        }
    });
    updateStatusLS();
}

//for updating incomplete/complete tasks in LS
function updateStatusLS() {
    const incompTasksEl = document.querySelectorAll(".task.incomplete");
    console.log("ORIGINAL INC: ");
    console.log(incompTasksEl);
    const compTasksEl = document.querySelectorAll(".task.complete");
    console.log("ORIGINAL COMP: ");
    console.log(compTasksEl);
    const newLSIncompTasks = [];
    const newLSCompTasks = [];

    if (incompTasksEl) {
        incompTasksEl.forEach((incompTaskEl) => {
            //title
            const incompTaskElTitle = incompTaskEl.querySelector(".task-title").innerText;

            //observations
            const incompTaskElObs = incompTaskEl.querySelector(".popover-btn").getAttribute("data-bs-content");

            //priority
            let incompTaskElPriority = "normal";
            if (incompTaskEl.classList.contains("low")) {
                incompTaskElPriority = "low";
            } else if (incompTaskEl.classList.contains("normal")) {
                incompTaskElPriority = "normal";
            } else if (incompTaskEl.classList.contains("high")) {
                incompTaskElPriority = "high";
            }

            //object
            const incompTaskObj = new Task(incompTaskElTitle, incompTaskElObs, incompTaskElPriority, "incomplete");

            //update array
            newLSIncompTasks.push(incompTaskObj);
            console.log("UPDATE INC: ");
            console.log(newLSIncompTasks);
        });
    }
    //update LS
    localStorage.setItem("incomp-tasks", JSON.stringify(newLSIncompTasks));

    if (compTasksEl) {
        compTasksEl.forEach((compTaskEl) => {
            //title
            const compTaskElTitle = compTaskEl.querySelector(".task-title").innerText;

            //observations
            const compTaskElObs = compTaskEl.querySelector(".popover-btn").getAttribute("data-bs-content");

            //priority
            let compTaskElPriority = "normal";
            if (compTaskEl.classList.contains("low")) {
                compTaskElPriority = "low";
            } else if (compTaskEl.classList.contains("normal")) {
                compTaskElPriority = "normal";
            } else if (compTaskEl.classList.contains("high")) {
                compTaskElPriority = "high";
            }

            //object
            const compTaskObj = new Task(compTaskElTitle, compTaskElObs, compTaskElPriority, "complete");

            //update array
            newLSCompTasks.push(compTaskObj);
            console.log("UPDATE COM: ");
            console.log(newLSCompTasks);
        });
    }
    //update LS
    localStorage.setItem("comp-tasks", JSON.stringify(newLSCompTasks));
}

//for creating tasks and adding to the HTML & LS (HTML only)
function createTask(taskObj) {
    //html element
    const taskEl = document.createElement("div");
    if (taskObj.status === "incomplete") {
        taskEl.className = `task rounded-3 d-flex justify-content-between align-items-center shadow mt-2 incomplete ${taskObj.priority}`;
    } else if (taskObj.status === "complete") {
        taskEl.className = `task rounded-3 d-flex justify-content-between align-items-center shadow mt-2 complete ${taskObj.priority}`;
    }
    taskEl.innerHTML = `
                        <!--checkbox & title-->
                        <div class="task-title-cont d-flex align-items-center">
                            <input type="checkbox" class="task-checkbox form-check-input my-0 me-2" ${taskObj.status === "complete" ? "checked" : ""}/>
                            <h3 class="task-title m-0">${taskObj.title}</h3>
                        </div>
                        <!--info, edit & delete btns-->
                        <div id="taskBtnsCont" class="task-btns-cont d-flex rounded-3 ms-3">
                            <button
                                id="infoBtn"
                                class="task-btn popover-btn btn btn-lg bg-transparent text-info px-2 py-1"
                                data-bs-toggle="popover"
                                data-bs-title="${taskObj.title}"
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
    const deleteBtn = taskEl.querySelector("#deleteBtn");

    //checkbox eventListener
    checkbox.addEventListener("change", () => {
        if (taskEl.classList.contains("complete")) {
            taskObj.status = "incomplete";
        } else {
            taskObj.status = "complete";
        }

        changeStyleTo(taskEl, taskObj.status);
        moveTask();
    });

    //for changing styles with task status
    function changeStyleTo(taskEl, status) {
        if (status === "incomplete") {
            taskEl.classList.add("incomplete");
            taskEl.classList.remove("complete");
            taskBtnsCont.classList.remove("complete");
            editBtn.classList.remove("d-none");
        } else if (status === "complete") {
            taskEl.classList.remove("incomplete");
            taskEl.classList.add("complete");
            taskBtnsCont.classList.add("complete");
            editBtn.classList.add("d-none");
        }
    }

    //insert into corresponding row
    //moveTask();
    taskObj.status === "complete" ? compTasksRow.appendChild(taskEl) : incompTasksRow.appendChild(taskEl);

    //change style with task status
    changeStyleTo(taskEl, taskObj.status);

    //popover creation
    createPopovers();
}

//--------------------------------------------------------------------
//EXPORTS
export { createTask };
