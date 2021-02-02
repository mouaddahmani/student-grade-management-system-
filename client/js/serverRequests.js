import { showTable, insertStudetsnIntoTable } from "./addgrades.js";
import { rankStudent } from "./rankstudent.js";
// import { Student } from "./student.js";
function insertStudentTodb(fname, lname, gender, teacher_ID) {
  fetch("http://localhost:8000/api/addstudent", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      fname,
      lname,
      gender,
      teacher_ID,
    }),
  })
    .then((respond) => {
      if (!respond.ok) {
        console.log("err");
      } else {
        return respond.json();
      }
    })
    .then((data) => {
      if (data.code) {
        alert("student added");
      } else {
        alert(data.message);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function insertTeacherTodb(fullName, email, password) {
  fetch("http://localhost:8000/api/register", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      fName: fullName,
      email: email,
      password: password,
    }),
  })
    .then((respond) => {
      if (!respond.ok) {
        console.log("err");
      } else {
        return respond.json();
      }
    })
    .then((data) => {
      if (data.code) {
        alert(data.message);
        window.location.href = "loging.html";
      } else {
        alert(data.message);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function chekLogin(email, password) {
  fetch("http://localhost:8000/api/login", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((respond) => {
      if (!respond.ok) {
        console.log("err");
      } else {
        return respond.json();
      }
    })
    .then((data) => {
      if (data.code) {
        localStorage.setItem("id", data.user.id);
        localStorage.setItem("name", data.user.name);
        localStorage.removeItem("student");
        window.location.href = "dashbord.html";
      } else {
        alert(data.message);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
function getStudents(teacherID, main) {
  fetch(`http://localhost:8000/api/students/${teacherID}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then((respond) => {
      if (!respond.ok) {
        console.log("err");
      } else {
        return respond.json();
      }
    })
    .then((data) => {
      if (!data.code) {
        showTable(main);
      } else {
        localStorage.setItem("student", JSON.stringify(data.rows));
        insertStudetsnIntoTable(main);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function getStudentGrades(stuentID, name, main) {
  fetch(`http://localhost:8000/api/student/grade/${stuentID}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then((respond) => {
      if (!respond.ok) {
        console.log("err");
      } else {
        return respond.json();
      }
    })
    .then((data) => {
      main.innerHTML = `
        <h3>${name}</h3>
        <div class="student-list">
            <table class="student">
                <tr>
                  <th>#</th>
                  <th>grades</th>
                  <th>modify</th>
                </tr>
                <tr>
                  <td>grade1</td>
                  <td>${data.grades.grade1 ? data.grades.grade1 : "N/a"}</td>
                  <td class="modify" data-grade="grade1"><button class="modify-btn">modify</button></td>
                </tr>
                <tr>
                  <td>grade2</td>
                  <td>${data.grades.grade2 ? data.grades.grade2 : "N/a"}</td>
                  <td class="modify" data-grade="grade2"><button class="modify-btn">modify</button> </td>
                </tr>
                <tr>
                  <td>grade3</td>
                  <td>${data.grades.grade3 ? data.grades.grade3 : "N/a"}</td>
                  <td class="modify" data-grade="grade3"><button class="modify-btn">modify</button> </td>
                </tr>
              </table>
        </div>`;
      const list = document.querySelectorAll(".modify");

      list.forEach((Element) => {
        Element.addEventListener("click", (event) => {
          if (event.target.className === "modify-btn") {
            let gradeToAdd = event.target.parentElement.getAttribute(
              "data-grade"
            );
            const btn = event.target;
            //btn.disabled = true;
            main.innerHTML += `
            <div class="container grade">
            <label for="grade" class="txt">grade :</label>
            <input name="grade" class = "note-input" type="text">
            <button class="add-grade">Add</button>
            </div>
            `;
            document
              .querySelector(".add-grade")
              .addEventListener("click", (event) => {
                const grade = document.querySelector(".note-input").value;
                const isGradeValid = checkGrade(grade);
                if (isGradeValid) {
                  addGradeToDb(stuentID, grade, gradeToAdd, name, main);

                  //btn.disabled = false;
                } else {
                  alert("please enter a valid grade");
                }
              });
          }
        });
      });
    })
    .catch((err) => console.log(err));
}

function checkGrade(grade) {
  if (grade >= 0) {
    if (grade <= 20) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
function addGradeToDb(studentID, grade, gradeToAdd, name, main) {
  fetch("http://localhost:8000/api/student/addgrade", {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      studentID,
      grade,
      gradeToAdd,
    }),
  })
    .then((respond) => {
      if (!respond.ok) {
        console.log("err");
      } else {
        return respond.json();
      }
    })
    .then((data) => {
      if (data.code) {
        getStudentGrades(studentID, name, main);
      } else {
        console.log("err");
      }
    })
    .catch((err) => console.log(err));
}

function deleteStudent(student_id, main) {
  fetch(`http://localhost:8000/api/students/delete/${student_id}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then((respond) => {
      if (!respond.ok) {
        console.log("err");
      } else {
        return respond.json();
      }
    })
    .then((result) => {
      if (result.code) {
        getStudents(localStorage.getItem("id"), main);
      }
    });
}

function studentrank(teacher_id, main) {
  fetch(`http://localhost:8000/api/student/rank/${teacher_id}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then((respond) => {
      if (!respond.ok) {
        console.log("err");
      } else {
        return respond.json();
      }
    })
    .then((data) => {
      if (data.finalResult) {
        const fullMarkStudent = data.finalResult.filter((value) => {
          if (
            value.grades[0] !== null &&
            value.grades[1] !== null &&
            value.grades[2] !== null
          ) {
            return value;
          }
        });
        rankStudent(fullMarkStudent, main);
      } else {
        main.innerHTML = `<h3>Student List</h3>
        <div class="student-list">
            <table class="student">
                <tr>
                  <th>Full Name</th>
                  <th>Gender</th>
                  <th>Avr grade</th>
                  <th>rank</th>
                </tr>
              </table>
        </div> `;
      }
    })
    .catch((err) => console.log(err));
}
export {
  insertStudentTodb,
  insertTeacherTodb,
  chekLogin,
  getStudents,
  getStudentGrades,
  deleteStudent,
  studentrank,
};
