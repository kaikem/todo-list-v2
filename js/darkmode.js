//DOM ELEMENTS ---------------------------------------------------
const darkmodeBtn = document.getElementById("darkmodeBtn");
const pageBody = document.querySelector("body");
const headings = document.querySelector(".headings");
const todoTitle = document.getElementById("todoTitle");

//LS THEME ---------------------------------------------------
let pageTheme = localStorage.getItem("theme");

//DOM LOAD ---------------------------------------------------
changeTheme(pageTheme === "light", pageTheme === "dark");

//FUNCTION ---------------------------------------------------
function changeTheme(condition1, condition2) {
    if (condition1) {
        darkmodeBtn.classList.add("btn-dark");
        darkmodeBtn.style.backgroundImage = `url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23fff%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20class%3D%22feather%20feather-moon%22%3E%3Cpath%20d%3D%22M21%2012.79A9%209%200%201%201%2011.21%203%207%207%200%200%200%2021%2012.79z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E")`;
        pageBody.classList.add("bg-light");
        pageBody.classList.remove("bg-dark");
        headings.classList.add("text-dark");
        if (todoTitle.innerText === "To-Do") {
            todoTitle.classList.add("text-dark");
        }
        localStorage.setItem("theme", "light");
    } else if (condition2) {
        darkmodeBtn.classList.remove("btn-dark");
        darkmodeBtn.style.backgroundImage = `url("..todo-list-v2/images/sun.svg")`;
        pageBody.classList.add("bg-dark");
        pageBody.classList.remove("bg-light");
        headings.classList.remove("text-dark");
        todoTitle.classList.remove("text-dark");
        localStorage.setItem("theme", "dark");
    }
}

//EVENT LISTENER ---------------------------------------------------
darkmodeBtn.addEventListener("click", () => {
    darkmodeBtn.classList.toggle("btn-dark");
    changeTheme(darkmodeBtn.classList.contains("btn-dark"), !darkmodeBtn.classList.contains("btn-dark"));
});
