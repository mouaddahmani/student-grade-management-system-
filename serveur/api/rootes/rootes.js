const express = require("express");
const db = require("../database/dbrequestes");
const root = express.Router();

root.get("/students/:id", db.selectClass);
root.get("/student/grade/:id", db.getGrade);
root.get("/teacher/:id", db.getTeacher);
root.get("/student/rank/:id", db.getClassRank);

root.post("/register", db.registerUser);
root.post("/login", db.login);
root.post("/addstudent", db.addStudent);
root.put("/student/addgrade", db.addGrade);

root.delete("/students/delete/:id", db.deleteStudent);

module.exports = root;
