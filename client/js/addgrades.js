import { getStudentGrades, deleteStudent } from "./serverRequests.js";
let mainarg = null;
function showTable(main) {
  mainarg = main;
  main.innerHTML = `
    <h3>Student</h3>
            <div class="student-list">
                <table class="students">
                    <tr>
                      <th>Full Name</th>
                      <th>Gender</th>
                      <th>Add grade</th>
                      <th>Delete</th>
                    </tr>
                  </table>
            </div>
    `;
}

function insertStudetsnIntoTable(main) {
  mainarg = main;
  showTable(main);
  const students = JSON.parse(localStorage.getItem("student"));
  const studentList = document.querySelector(".students tbody");
  students.forEach((student) => {
    studentList.innerHTML += `
      <tr id="${student.student_id}" class = "student" data-id="${student.student_id}">
        <td>${student.first_name} ${student.last_name}</td>
        <td>${student.gender}</td>
        <td><button class="add-btn">Add</button></td>
        <td><button class="delete-btn">delete</button></td>
      </tr>
      `;
  });
  students.forEach((student) => {
    document
      .getElementById(`${student.student_id}`)
      .addEventListener("click", modifyGrade);
  });
}

function modifyGrade(event) {
  if (event.target.className === "add-btn") {
    const row = event.target.parentElement.parentElement;
    const id1 = row.getAttribute("data-id");
    const name = row.children[0].innerText;

    document.querySelector(".student-list").style.display = "none";
    getStudentGrades(id1, name, mainarg);
  } else if (event.target.className === "delete-btn") {
    const row = event.target.parentElement.parentElement;
    const id2 = row.getAttribute("data-id");
    deleteStudent(id2, mainarg);
  }
}

export { showTable, insertStudetsnIntoTable };
