import { creatStudent } from "./creatstudent.js";
import { getStudents, studentrank } from "./serverRequests.js";
const main = document.querySelector(".info");
//getStudents(localStorage.getItem("id"));

document.querySelector(
  ".header"
).innerHTML += `<p>wellcom ${localStorage.getItem("name")}</p>`;
document.querySelector("#home").addEventListener("click", (event) => {
  main.innerHTML = `
  <h3>Main</h3>

          <p>
            <b>Read ME:</b> you have 4 part first is main wich tells you how to
            use the app the add student alows you to add student and the add
            grade is where you can add grades for studnet and finaly the student
            list wich shows you studnet and there avrg.
          </p>
          <h5>ruels to use the app:</h5>
          <ul>
            <li># Each teacher have his own student</li>
            <li># Can't add the same student twice</li>
            <li># Studnets can have 3 grades max</li>
            <li>
              # if a student dont have all 3 grades avrg will not be calculated
            </li>
            <li>
              # if a student dont have an avrg it will not be shown in the
              student list
            </li>
          </ul>
  `;
});

document.querySelector(".log-out").addEventListener("click", (event) => {
  localStorage.removeItem("name");
  localStorage.removeItem("id");
  localStorage.removeItem("student");
});

document.querySelector("#add-student").addEventListener("click", (event) => {
  main.innerHTML = `
    <h3>Add student</h3>
            <form id="input-form">
                <label for="fname" class="txt">First Name :</label>
                <input type="text" class="s-input" id="fname" name="firstname" placeholder="Student name..">
                <br>
                <label for="lname" class="txt">Last Name :</label>
                <input type="text" class="s-input" id="lname" name="lastname" placeholder="Student last name..">
                <br>
                <label for="gender" class="txt">Gender :</label>
                <select id="gender" class="s-input" name="gender">
                  <option value="F">F</option>
                  <option value="M">M</option>
                </select> 
                <br>          
                <input type="submit" value="Submit" id="add-student-btn">
            
              </form>
    `;
  creatStudent();
});

document.querySelector("#add-grade").addEventListener("click", (event) => {
  getStudents(localStorage.getItem("id"), main);
});
document.querySelector("#student-list").addEventListener("click", (event) => {
  studentrank(localStorage.getItem("id"), main);
});
