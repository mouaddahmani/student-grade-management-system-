const db = require("./dbconection");
const bcrypt = require("bcrypt");

module.exports = class Dbrequestes {
  //get the teacher by id its not used in the prject its for testing
  static async getTeacher(req, res, next) {
    try {
      const [rows] = await db.query(
        "select * from Teacher where teacher_ID=?",
        [req.params.id]
      );
      res.status(200).json(rows);
    } catch (err) {
      next(err);
    }
  }
  //regiter a new user if the email dose not existe in the db
  static async registerUser(req, res, next) {
    try {
      const { fName, email, password } = req.body;
      const [rows] = await db.query("select * from Teacher where email=?", [
        email,
      ]);
      if (rows.length !== 0) {
        res
          .status(200)
          .json({ code: false, message: "email alredy in database" });
      } else {
        //hashing the password before inserting it in the db
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.query(
          `insert into Teacher(fullname,email,t_password)
        value
        (?,?,?);`,
          [fName, email, hashedPassword]
        );
        res.status(200).json({ code: true, message: "user added to database" });
      }
    } catch (err) {
      next(err);
    }
  }
  //the login function cheks for the email in db
  //if the email existe we compare the password with the hashed password
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const [rows] = await db.query("select * from Teacher where email=?", [
        email,
      ]);
      if (rows.length === 0) {
        res
          .status(200)
          .json({ code: false, message: "email or password dont match" });
      } else {
        const isPasswordMatch = await bcrypt.compare(
          password,
          rows[0].t_password
        );
        if (isPasswordMatch) {
          res.status(200).json({
            code: true,
            message: "log in",
            user: { name: rows[0].fullname, id: rows[0].teacher_ID },
          });
        } else {
          res
            .status(200)
            .json({ code: false, message: " password or email dont match" });
        }
      }
    } catch (err) {
      next(err);
    }
  }
  //adding a student to db if the student is alredy in db it will not be added
  static async addStudent(req, res, next) {
    try {
      const { fname, lname, gender, teacher_ID } = req.body;
      const [
        rows,
      ] = await db.query(
        `select first_name from Student where first_name =? and last_name =? and gender =?;`,
        [fname, lname, gender]
      );
      if (rows.length !== 0) {
        res.status(200).json({ code: false, message: "student alredy in db" });
      } else {
        const insert1 = await db.query(
          `insert into Student(first_name,last_name,gender)
        value
        (?,?,?);`,
          [fname, lname, gender]
        );
        const [
          rows,
        ] = await db.query(
          `select student_id from Student where first_name =? and last_name =? and gender =?;`,
          [fname, lname, gender]
        );
        const insert2 = await db.query(
          `insert into class(t_id,s_id)
        values
        (?,?);`,
          [teacher_ID, rows[0].student_id]
        );
        const insert3 = await db.query(
          `insert into studentGrades(id)
        values
        (?);`,
          [rows[0].student_id]
        );
        res
          .status(200)
          .json({ code: true, message: "student added to database" });
      }
    } catch (err) {
      next(err);
    }
  }
  //select the class by the teacher id
  static async selectClass(req, res, next) {
    try {
      const teacherId = req.params.id;
      const student = [];
      const result = await db.query(`select s_id from class where t_id=?;`, [
        teacherId,
      ]);
      if (result[0].length === 0) {
        res.status(200).json({ code: false, message: "no student" });
      }
      for (let i = 0; i < result[0].length; i++) {
        student.push(result[0][i].s_id);
      }
      const [
        rows,
      ] = await db.query(`select * from Student where student_id in(?);`, [
        student,
      ]);

      res.status(200).json({ code: true, rows });
    } catch (err) {
      next(err);
    }
  }
  //selecte the student grades
  static async getGrade(req, res, next) {
    try {
      const id = req.params.id;
      const [
        rows,
      ] = await db.query(
        `select grade1,grade2,grade3 from studentGrades where id= ?`,
        [id]
      );

      res.status(200).json({ grades: rows[0] });
    } catch (err) {
      next(err);
    }
  }
  //add the studnet grade to db
  static async addGrade(req, res, next) {
    try {
      const { studentID, gradeToAdd, grade } = req.body;
      if (gradeToAdd === "grade1") {
        const result1 = await db.query(
          `update studentGrades set grade1 = ? where id = ?;`,
          [grade, studentID]
        );
        res.status(200).json({ message: "grade added", code: true });
      } else if (gradeToAdd === "grade2") {
        const result2 = await db.query(
          `update studentGrades set grade2 = ? where id = ?;`,
          [grade, studentID]
        );
        res.status(200).json({ message: "grade added", code: true });
      } else if (gradeToAdd === "grade3") {
        const result2 = await db.query(
          `update studentGrades set grade3 = ? where id = ?;`,
          [grade, studentID]
        );
        res.status(200).json({ message: "grade added", code: true });
      }
    } catch (err) {
      next(err);
    }
  }

  static async deleteStudent(req, res, next) {
    try {
      const id = req.params.id;
      const result1 = await db.query("delete from  class where id=?;", [id]);
      const request2 = await db.query(
        "delete from  studentGrades where id=?;",
        [id]
      );
      const request3 = await db.query(
        "delete from  Student where student_id=?;",
        [id]
      );

      res.status(200).json({
        code: true,
        message: "student deleted",
      });
    } catch (err) {
      next(err);
    }
  }
  //selectes all student related to the teacher with all there grades
  static async getClassRank(req, res, next) {
    try {
      const teacherId = req.params.id;
      const student = [];
      const finalResult = [];
      const result = await db.query(`select s_id from class where t_id=?;`, [
        teacherId,
      ]);
      if (result[0].length === 0) {
        res.status(200).json({ code: false, message: "no student" });
      }
      for (let i = 0; i < result[0].length; i++) {
        student.push(result[0][i].s_id);
      }
      const [
        rows,
      ] = await db.query(`select * from Student where student_id in(?)`, [
        student,
      ]);
      const result2 = await db.query(
        `select * from studentGrades where id in(?)`,
        [student]
      );
      for (let i = 0; i < rows.length; i++) {
        finalResult.push({
          fname: `${rows[i].first_name}`,
          lname: ` ${rows[i].last_name}`,
          gender: rows[i].gender,
          grades: [
            result2[0][i].grade1,
            result2[0][i].grade2,
            result2[0][i].grade3,
          ],
        });
      }
      res.status(200).json({ finalResult });
    } catch (err) {
      next(err);
    }
  }
};
