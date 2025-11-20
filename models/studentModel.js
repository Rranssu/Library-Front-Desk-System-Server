const db = require("../config/db");

exports.findStudent = async (studentId) => {
  const [rows] = await db.query(
    "SELECT * FROM students WHERE student_id = ?",
    [studentId]
  );

  return rows[0];
};
