//DOM ELEMENTS ---------------------------------------------------
const dateHeading = document.getElementById("dateHeading");
const greetingsMessage = document.getElementById("greetingsMessage");

//DATE & TIME VARIABLES ---------------------------------------------------
let date = new Date();
let dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
let day = date.getDate();
let month = date.toLocaleDateString("en-US", { month: "long" });
let hours = date.getHours();
let minutes = date.getMinutes();
let dayOrder = "th";
if (day === 1) {
    dayOrder = "st";
} else if (day === 2) {
    dayOrder = "nd";
} else if (day === 3) {
    dayOrder = "rd";
}

//HEADINGS ---------------------------------------------------
//date
dateHeading.innerHTML = `${dayOfWeek}, ${month} ${day}${dayOrder}`;

//greetings
if (hours > 0 && hours <= 11) {
    greetingsMessage.innerText = "Good morning!";
} else if (hours > 11 && hours <= 18) {
    greetingsMessage.innerText = "Good afternoon!";
} else {
    greetingsMessage.innerText = "Good evening!";
}
