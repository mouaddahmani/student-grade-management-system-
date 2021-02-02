import { chekLogin } from "./serverRequests.js";
const userEmail = document.querySelector("#email");
const userPassword = document.querySelector("#password");
const submit = document.querySelector("#submit");

submit.addEventListener("click", (event) => {
  event.preventDefault();
  chekLogin(userEmail.value, userPassword.value);
});
