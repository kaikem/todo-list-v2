//DOM ELEMENTS
const dateHeading = document.getElementById("dateHeading");
const greetingsMessage = document.getElementById("greetingsMessage");

//DATE & TIME VARIABLES
const date = new Date();
const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
const day = date.getDate();
const month = date.toLocaleDateString("en-US", { month: "long" });
const hours = date.getHours();
const minutes = date.getMinutes();
const dayOrder = "th";
if (day === 1) {
    dayOrder = "st";
} else if (day === 2) {
    dayOrder = "nd";
} else if (day === 3) {
    dayOrder = "rd";
}

//DATE HEADING
dateHeading.innerHTML = `${dayOfWeek}, ${month} ${day}${dayOrder}`;

//GREETINGS HEADING
if (hours > 0 && hours <= 11) {
    greetingsMessage.innerText = "Good morning!";
} else if (hours > 11 && hours <= 18) {
    greetingsMessage.innerText = "Good afternoon!";
} else {
    greetingsMessage.innerText = "Good evening!";
}
