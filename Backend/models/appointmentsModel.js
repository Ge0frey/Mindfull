const db = require('../config/database');

class Appointment {
    static async create (userId, therapistId, date, time) {
        const [result] = await db.promise().query(
            'INSERT INTO appointments (user_id, therapist_id, appointment_date, appointment_time) VALUES (?, ?, ?, ?)',[userId, therapistId, date, time]
        )
    }

    static async findByUserId(userId) {
      const [rows] = await db.promise().query(
        `SELECT 
            a.id, 
            DATE_FORMAT(a.appointment_date, '%Y-%m-%d') as date,
            a.appointment_time as time,
            CONCAT(t.first_name, ' ', t.last_name) as therapist_name,
            d.specialization
        FROM appointments a
        JOIN therapists t ON a.therapist_id = t.id
        WHERE a.user_id = ?
        ORDER BY a.appointment_date, a.appointment_time`,
        [userId]
      );
      return rows;
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