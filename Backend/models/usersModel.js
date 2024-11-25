const db = require('../config/database');

class User {
    static async create (firstName, lastName, email, phone, dateOfBirth, gender, passwordHash) {
        const [result] = await db.promise().query('INSERT INTO users (first_name, last_name, email, password_hash, phone, date_of_birth, gender) VALUES (?,?,?,?,?,?,?)', [firstName, lastName, email, passwordHash, phone, dateOfBirth, gender]
        );
        return result.insertId;
    }
}

module.exports = User;