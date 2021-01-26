const moment = require('moment');

class Message {
    constructor({
        username,
        message,
        date = new Date(),
    }) {
        this.username = username;
        this.message = message;
        this.date = date;
        this.errors = [];
        this.validate();
    }

    get output() {
        return `${moment(this.date).format('YYYY-MM-DD HH:mm:ss')} ${this.username}: ${this.message}`;
    }

    validate() {
        if (typeof this.username !== 'string') {
            this.errors.push('username must be string!');
        }
        if (this.username.length === 0) {
            this.errors.push('username cannot be empty!');
        }
        if (typeof this.message !== 'string') {
            this.errors.push('message must be string!');
        }
        if (!moment(this.date).isValid()) {
            this.errors.push('date is not valid!');
        }
    }
}

module.exports = Message;