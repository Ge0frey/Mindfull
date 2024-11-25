const db = require('../config/database');

class Therapist {
  static async create(name, specialization, schedule) {
    const [result] = await db.promise().query('INSERT INTO therapists (first_name, specialization, schedule) VALUES (?, ?, ?)', [name, specialization, JSON.stringify(schedule)]);
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await db.promise().query('SELECT id, first_name, last_name, specialization, schedule FROM therapists');
    return rows;
  }

  static async update(id, { firstName, lastName, specialization, schedule }) {
    await db.promise().query('UPDATE therapists SET first_name = ?, last_name = ?, specialization = ?, schedule = ? WHERE id = ?', [firstName, lastName, specialization, JSON.stringify(schedule), id]);
  }

  static async delete(id) {
    await db.promise().query('DELETE FROM therapists WHERE id = ?', [id]);
  }
}

module.exports = Therapist;