const db = require("../config/db");

exports.createEntry = async (studentId) => {
  await db.query(
    "INSERT INTO entry_logs (student_id, entry_time) VALUES (?, NOW())",
    [studentId]
  );

  return true;
};
