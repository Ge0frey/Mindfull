const db = require('../config/database');

class Appointment {
    static async create (userId, therapistId, date, time) {
        const [result] = await db.promise().query(
            'INSERT INTO appointments (user_id, therapist_id, appointment_date, appointment_time) VALUES (?, ?, ?, ?)',[userId, therapistId, date, time]
        )
    }

    static async update(id, userId, { date, time }) {
        const [result] = await db.promise().query(
          'UPDATE appointments SET appointment_date = ?, appointment_time = ? WHERE id = ? AND user_id = ?',
          [date, time, id, userId]
        );
        return result.affectedRows > 0;
      }
    
      static async delete(id, userId) {
        const [result] = await db.promise().query(
          'DELETE FROM appointments WHERE id = ? AND user_id = ?',
          [id, userId]
        );
        return result.affectedRows > 0;
      }
}

module.exports = Appointment;