const R = require('ramda'),
    rp = require('request-promise'),
    cheerio = require('cheerio');

let _schema = `
    type Departments {
        kind(index: Int): String
        info: String
    }
`;

class DepartmentsBasic {
    static get schema() {
        return _schema;
    }
}

class Departments extends DepartmentsBasic {
    constructor() {
        super();
        const values = ['RequireJS', 'CommonJS', 'AMD', 'ES2015'];
        this.departments = values;
    }

    get departments() {
        return this._departments;
    }
    set departments(departments) {
        this._departments = departments;
    }

    kind({index}) {
        return this.departments[index];
    }

    async info() {
        return await rp({
            uri: 'https://www.thomas-schulte.de/disclaimer.html',
            transform: body => {
                return cheerio.load(body);
            }
        })
        .then($ => {
            //const smwlih = R.join(' ', R.map(x => x === '' ? '❤' : x,  R.map(R.trim, R.split(' ', $('#software-made-with-love-in-hamburg').text()))));
            let smwlih = $('#software-made-with-love-in-hamburg').text();
            smwlih = R.split(' ', smwlih);
            smwlih = R.map(R.trim, smwlih);
            smwlih = R.map(x => x === '' ? '❤' : x, smwlih);
            return R.join(' ', smwlih);
        })
        .catch(err => {
            console.error(err);
        });
    }
}

module.exports = Departments;
