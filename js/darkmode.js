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
        darkmodeBtn.style.backgroundImage = `url("data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3C!--%20License%3A%20MIT.%20Made%20by%20radix-ui%3A%20https%3A%2F%2Fgithub.com%2Fradix-ui%2Ficons%20--%3E%3Csvg%20width%3D%22800px%22%20height%3D%22800px%22%20viewBox%3D%220%200%2015%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20%20%20%20fill-rule%3D%22evenodd%22%20%20%20%20clip-rule%3D%22evenodd%22%20%20%20%20d%3D%22M7.5%200C7.77614%200%208%200.223858%208%200.5V2.5C8%202.77614%207.77614%203%207.5%203C7.22386%203%207%202.77614%207%202.5V0.5C7%200.223858%207.22386%200%207.5%200ZM2.1967%202.1967C2.39196%202.00144%202.70854%202.00144%202.90381%202.1967L4.31802%203.61091C4.51328%203.80617%204.51328%204.12276%204.31802%204.31802C4.12276%204.51328%203.80617%204.51328%203.61091%204.31802L2.1967%202.90381C2.00144%202.70854%202.00144%202.39196%202.1967%202.1967ZM0.5%207C0.223858%207%200%207.22386%200%207.5C0%207.77614%200.223858%208%200.5%208H2.5C2.77614%208%203%207.77614%203%207.5C3%207.22386%202.77614%207%202.5%207H0.5ZM2.1967%2012.8033C2.00144%2012.608%202.00144%2012.2915%202.1967%2012.0962L3.61091%2010.682C3.80617%2010.4867%204.12276%2010.4867%204.31802%2010.682C4.51328%2010.8772%204.51328%2011.1938%204.31802%2011.3891L2.90381%2012.8033C2.70854%2012.9986%202.39196%2012.9986%202.1967%2012.8033ZM12.5%207C12.2239%207%2012%207.22386%2012%207.5C12%207.77614%2012.2239%208%2012.5%208H14.5C14.7761%208%2015%207.77614%2015%207.5C15%207.22386%2014.7761%207%2014.5%207H12.5ZM10.682%204.31802C10.4867%204.12276%2010.4867%203.80617%2010.682%203.61091L12.0962%202.1967C12.2915%202.00144%2012.608%202.00144%2012.8033%202.1967C12.9986%202.39196%2012.9986%202.70854%2012.8033%202.90381L11.3891%204.31802C11.1938%204.51328%2010.8772%204.51328%2010.682%204.31802ZM8%2012.5C8%2012.2239%207.77614%2012%207.5%2012C7.22386%2012%207%2012.2239%207%2012.5V14.5C7%2014.7761%207.22386%2015%207.5%2015C7.77614%2015%208%2014.7761%208%2014.5V12.5ZM10.682%2010.682C10.8772%2010.4867%2011.1938%2010.4867%2011.3891%2010.682L12.8033%2012.0962C12.9986%2012.2915%2012.9986%2012.608%2012.8033%2012.8033C12.608%2012.9986%2012.2915%2012.9986%2012.0962%2012.8033L10.682%2011.3891C10.4867%2011.1938%2010.4867%2010.8772%2010.682%2010.682ZM5.5%207.5C5.5%206.39543%206.39543%205.5%207.5%205.5C8.60457%205.5%209.5%206.39543%209.5%207.5C9.5%208.60457%208.60457%209.5%207.5%209.5C6.39543%209.5%205.5%208.60457%205.5%207.5ZM7.5%204.5C5.84315%204.5%204.5%205.84315%204.5%207.5C4.5%209.15685%205.84315%2010.5%207.5%2010.5C9.15685%2010.5%2010.5%209.15685%2010.5%207.5C10.5%205.84315%209.15685%204.5%207.5%204.5Z%22%20%20%20%20fill%3D%22%23000000%22%20%20%2F%3E%3C%2Fsvg%3E")`;
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
