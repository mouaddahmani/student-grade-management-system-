export class Student {
  #grades = [];
  #avrg;
  constructor(firstName, lastName, gender) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._gender = gender;
  }

  get fname() {
    return this._firstName;
  }

  set fname(fname) {
    this._firstName = fname;
  }

  get lname() {
    return this._lastName;
  }

  set lname(lname) {
    this._lastName = lname;
  }

  get gender() {
    return this._gender;
  }

  set gender(gender) {
    this._gender = gender;
  }

  fullNmae() {
    return `${this._firstName} ${this._lastName}`;
  }

  addGrade(grade) {
    grade.forEach((Element) => this.#grades.push(Element));
  }

  setavrg() {
    let avrg = 0;
    this.#grades.forEach((grade) => {
      avrg += grade;
    });
    this.#avrg = parseFloat((avrg / 3).toFixed(2));
  }

  get avrg() {
    return this.#avrg;
  }
}
