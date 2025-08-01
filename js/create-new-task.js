//IMPORTS ---------------------------------------------------
//class
import { Task } from "./class/task-class.js";
//function
import { createPopovers } from "./popovers.js";

//EXISTING LS DATA ---------------------------------------------------
let LSIncompTasks = JSON.parse(localStorage.getItem("incomp-tasks"));
if (LSIncompTasks === null) LSIncompTasks = [];
let LSCompTasks = JSON.parse(localStorage.getItem("comp-tasks"));
if (LSCompTasks === null) LSCompTasks = [];

//DOM ELEMENTS ---------------------------------------------------
const incompTasksRow = document.getElementById("incompTasksRow");
const compTasksRow = document.getElementById("compTasksRow");
const addNewTaskForm = document.getElementById("addNewTaskForm");
const titleInput = document.getElementById("titleInput");
const obsInput = document.getElementById("obsInput");
const priorityInput = document.getElementById("priorityInput");
const modalCancelBtn = document.getElementById("modalCancelBtn");

//DOMLoad
initialLoad();

//EVENT LISTENERS ---------------------------------------------------
//for modal "Create" btn
addNewTaskForm.addEventListener("submit", (e) => {
    const newTaskTitle = titleInput.value;
    const newTaskObs = obsInput.value;
    const newTaskPriority = priorityInput.value;
    const newTask = new Task(newTaskTitle, newTaskObs, newTaskPriority, "incomplete");
    LSIncompTasks.push(newTask);
    console.log(LSIncompTasks);

    clearForm();

    createTask(newTask);
});

//for modal "Cancel" btn
modalCancelBtn.addEventListener("click", () => clearForm());

//FUNCTIONS ---------------------------------------------------
//for clearing the form
function clearForm() {
    titleInput.value = "";
    obsInput.value = "";
    priorityInput.value = "0";
}

//
function noIncompTasks() {
    incompTasksRow.innerHTML = "<div class='mt-3 p-0'><h4 class='text-danger display-6'>No To-Do Tasks Registered<h4></div>";
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
    updateTasksLS();
}

//for updating tasks in LS
function updateTasksLS() {
    const tasksEl = document.querySelectorAll(".task");
    const newIncompTasks = [];
    const newCompTasks = [];

    if (tasksEl.length > 0) {
        tasksEl.forEach((taskEl) => {
            //title
            const taskElTitle = taskEl.querySelector(".task-title").innerText;

            //observations
            const taskElObs = taskEl.querySelector(".popover-btn").getAttribute("data-bs-content");

            //priority
            let taskElPriority = "normal";
            if (taskEl.classList.contains("low")) {
                taskElPriority = "low";
            } else if (taskEl.classList.contains("normal")) {
                taskElPriority = "normal";
            } else if (taskEl.classList.contains("high")) {
                taskElPriority = "high";
            }

            //status
            let taskElStatus = "incomplete";
            if (taskEl.classList.contains("complete")) {
                taskElStatus = "complete";
            }

            //object
            const taskObj = new Task(taskElTitle, taskElObs, taskElPriority, taskElStatus);

            //update array
            if (taskObj.status === "incomplete") {
                newIncompTasks.push(taskObj);
                LSIncompTasks = newIncompTasks;
                localStorage.setItem("incomp-tasks", JSON.stringify(LSIncompTasks));
            } else {
                newCompTasks.push(taskObj);
                LSCompTasks = newCompTasks;
                localStorage.setItem("comp-tasks", JSON.stringify(LSCompTasks));
            }
        });
    } else {
        LSIncompTasks = [];
        LSCompTasks = [];
        noIncompTasks();
        localStorage.setItem("incomp-tasks", JSON.stringify(LSIncompTasks));
        localStorage.setItem("comp-tasks", JSON.stringify(LSCompTasks));
    }
}

//initial tasks load from LS
function initialLoad() {
    LSIncompTasks.forEach((LSIncompTask) => createTask(LSIncompTask));
    LSCompTasks.forEach((LSCompTask) => createTask(LSCompTask));
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
                            <button id="deleteBtn" class="task-btn btn btn-lg bg-transparent text-danger px-2 py-1" title="Delete this Task" data-bs-toggle="modal" data-bs-target="#deleteTaskModal${
                                taskObj.title
                            }"><i class="fa-solid fa-trash"></i></button>
                        </div>

                        <div id="deleteTaskModal${taskObj.title}" class="modal fade">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header text-bg-danger">
                                        <h3 class="modal-title">Delete Task</h3>
                                    </div>
                                    <div class="modal-body">
                                        <p>Are you sure you want to delete <b>${taskObj.title}</b>?</p>
                                        <div class="modal-btns d-flex justify-content-end p-0 gap-2 mt-4">
                                            <button type="button" id="modalCancelBtn" class="modal-btn btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                            <button type="submit" id="modalDeleteBtn" class="modal-btn btn btn-danger" data-bs-dismiss="modal">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    `;

    //inner elements
    const checkbox = taskEl.querySelector("input[type='checkbox']");
    const deleteModal = taskEl.querySelector(`#deleteTaskModal${taskObj.title}`);
    const modalDeleteBtn = deleteModal.querySelector("#modalDeleteBtn");
    const editBtn = taskEl.querySelector("#editBtn");
    const taskBtnsCont = taskEl.querySelector("#taskBtnsCont");

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

    //modalDeleteBtn eventListener
    modalDeleteBtn.addEventListener("click", () => {
        taskEl.remove();
        updateTasksLS();
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
    taskObj.status === "complete" ? compTasksRow.appendChild(taskEl) : incompTasksRow.appendChild(taskEl);

    //change style with task status
    changeStyleTo(taskEl, taskObj.status);

    //popover creation
    createPopovers();

    updateTasksLS();
}
