import { Student } from "./student.js";
import { insertStudentTodb, getStudents } from "./serverRequests.js";
export function creatStudent() {
  const addStudentBtn = document.getElementById("add-student-btn");
  const form = document.getElementById("input-form");
  addStudentBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let fName = form.children.firstname;
    let lName = form.children.lastname;
    let gender = form.children.gender;
    checkUserInput(fName.value, lName.value, gender.value, [fName, lName]);
  });
}

function checkUserInput(fname, lname, gender, inputs) {
  if (fname.length < 1 || lname.length < 1) {
    alert("student name and last name are required");
  } else if (fname.length > 50 || lname.length > 50) {
    alert("student name must be 50 charachters max");
  } else {
    const newStudent = new Student(fname, lname, gender);
    insertStudentTodb(
      newStudent.fname,
      newStudent.lname,
      newStudent.gender,
      localStorage.getItem("id")
    );
    resetInput(inputs);
  }
}

function resetInput(inputs) {
  inputs.forEach((element) => {
    element.value = "";
  });
}
