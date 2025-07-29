//DATE & TIME
const date = new Date();
const dayOfWeek = date.toLocaleDateString("pt-BR", { weekday: "long" });
const day = date.getDate();
const month = date.toLocaleDateString("pt-BR", { month: "long" });
const hours = date.getHours();
const minutes = date.getMinutes();

const dateHeading = document.getElementById("dateHeading");
const greetingsMessage = document.getElementById("greetingsMessage");

dateHeading.innerText = `${dayOfWeek}, ${day} de ${month}`;

if (hours > 0 && hours <= 11) {
    greetingsMessage.innerText = "Bom dia, Kaike!";
} else if (hours > 11 && hours <= 18) {
    greetingsMessage.innerText = "Boa tarde, Kaike!";
} else {
    greetingsMessage.innerText = "Boa noite, Kaike!";
}
