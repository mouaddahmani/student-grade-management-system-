import { Student } from "./student.js";
export function rankStudent(studentList, main) {
  main.innerHTML = `
    <h3>Student List</h3>
            <div class="student-list">
                <table class="student">
                    <tr>
                      <th>Full Name</th>
                      <th>Gender</th>
                      <th>Avr grade</th>
                      <th>rank</th>
                    </tr>
                  </table>
            </div> 
    `;
  const newStudents = studentList.map((Element) => {
    let newStudent = new Student(Element.fname, Element.lname, Element.gender);
    newStudent.addGrade(Element.grades);
    newStudent.setavrg();
    return newStudent;
  });
  newStudents.sort((a, b) => b.avrg - a.avrg);

  newStudents.forEach((Element, index) => {
    document.querySelector(".student tbody").innerHTML += `
    <td>${Element.fullNmae()}</td>
    <td>${Element.gender}</td>
    <td>${Element.avrg}</td>
    <td>${index + 1}</td>
    `;
  });
}
