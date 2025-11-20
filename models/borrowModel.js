const db = require("../config/db");

exports.createBorrow = async (studentId, bookId) => {

  await db.query(
    "INSERT INTO borrow_records (student_id, book_id, borrow_time) VALUES (?, ?, NOW())",
    [studentId, bookId]
  );

  await db.query(
    "UPDATE books SET available = available - 1 WHERE id = ?",
    [bookId]
  );

  return true;
};

exports.returnBook = async (studentId, bookId) => {
  const [rows] = await db.query(
    `SELECT * FROM borrow_records 
     WHERE student_id = ? AND book_id = ? AND return_time IS NULL`,
    [studentId, bookId]
  );

  if (rows.length === 0) return false;


  await db.query(
    "UPDATE borrow_records SET return_time = NOW() WHERE id = ?",
    [rows[0].id]
  );

  await db.query(
    "UPDATE books SET available = available + 1 WHERE id = ?",
    [bookId]
  );

  return true;
};

exports.getBorrowedBooks = async (studentId) => {
  const [rows] = await db.query(
    `SELECT br.id, b.title, b.author, br.borrow_time
     FROM borrow_records br
     JOIN books b ON br.book_id = b.id
     WHERE br.student_id = ? AND br.return_time IS NULL`,
    [studentId]
  );

  return rows;
};
