//DARKMODE BUTTON
//dom elements
const darkmodeBtn = document.getElementById("darkmodeBtn");
const pageBody = document.querySelector("body");
const headings = document.querySelector(".headings");

//event listener
darkmodeBtn.addEventListener("click", () => {
    darkmodeBtn.classList.toggle("btn-dark");

    if (darkmodeBtn.classList.contains("btn-dark")) {
        darkmodeBtn.style.backgroundImage = `url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23fff%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20class%3D%22feather%20feather-moon%22%3E%3Cpath%20d%3D%22M21%2012.79A9%209%200%201%201%2011.21%203%207%207%200%200%200%2021%2012.79z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E")`;
        pageBody.style.background = "linear-gradient(90deg, rgba(190, 251, 249, 1) 0%, rgba(229, 229, 229, 1) 50%, rgba(229, 229, 229, 1) 100%)";
        headings.classList.add("text-dark");
    } else {
        darkmodeBtn.style.backgroundImage = `url("../images/sun.svg")`;
        pageBody.style.background = "linear-gradient(90deg, rgba(16, 15, 15, 1) 0%, rgba(15, 14, 14, 1) 50%, rgba(0, 4, 25, 1) 100%)";
        headings.classList.remove("text-dark");
    }
});
