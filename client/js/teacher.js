export class Teacher {
  #students = [];
  constructor(fullName, email, password) {
    this._fullName = fullName;
    this._email = email;
    this._password = password;
  }

  get fullName() {
    return this._fullName;
  }

  set fullName(fullname) {
    this._fullName = fullname;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  addStudent(student) {
    this.#students.push(student);
  }
}
