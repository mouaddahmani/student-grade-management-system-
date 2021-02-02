import { Teacher } from "./teacher.js";
import { insertTeacherTodb } from "./serverRequests.js";
const userName = document.querySelector("#name");
const userEmail = document.querySelector("#email");
const userPassword = document.querySelector("#password");
const submit = document.querySelector("#submit");

submit.addEventListener("click", (event) => {
  event.preventDefault();
  let teacher = checkUserInput(
    userName.value,
    userEmail.value,
    userPassword.value
  );
  console.log(teacher.fullName);
  insertTeacherTodb(teacher.fullName, teacher.email, teacher.password);
});

function checkUserInput(name, email, password) {
  if (name.length < 1 || email.length < 1) {
    alert("name and email are requiered");
  } else if (name.length > 50) {
    alert("name must be 50 charachters max");
  } else {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (regex.test(email)) {
      if (password.length < 6) {
        alert("password must be at least 6 charachters");
      } else if (password.length > 10) {
        alert("password must be 10 charachters max");
      } else {
        return new Teacher(name, email, password);
      }
    } else {
      alert("please enter a valid email");
    }
  }
}
