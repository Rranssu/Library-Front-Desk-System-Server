const db = require("../config/db");

exports.searchBooks = async (query) => {
  const [rows] = await db.query(
    `SELECT * FROM books 
     WHERE title LIKE ? OR author LIKE ?`,
    [`%${query}%`, `%${query}%`]
  );

  return rows;
};

exports.getBookById = async (bookId) => {
  const [rows] = await db.query(
    "SELECT * FROM books WHERE id = ?",
    [bookId]
  );

  return rows[0];
};
