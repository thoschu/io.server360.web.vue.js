const Departments = require('./departments.class.js');

let _schema = `
    type User {
        id: String
        name: String
        towns: [String]
        departments: Departments
    }
`;

class User {
    constructor(name) {
        this.id = Math.random();
        this.name = name;
        this.towns = ['Hamburg', 'Bielefeld', 'St. Gallen'];
        this.departments = new Departments();
    }

    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }

    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }

    get towns() {
        return this._towns;
    }
    set towns(towns) {
        this._towns = towns;
    }

    get departments() {
        return this._departments;
    }
    set departments(departments) {
        this._departments = departments;
    }

    static get schema() {
        return _schema;
    }
}

module.exports = User;