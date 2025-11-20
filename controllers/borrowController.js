const borrowModel = require("../models/borrowModel");
const studentModel = require("../models/studentModel");
const bookModel = require("../models/bookModel");

exports.borrowBook = async (req, res) => {
  const { studentId, bookId } = req.body;

  try {
    const student = await studentModel.findStudent(studentId);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not registered" });
    }

    const book = await bookModel.getBookById(bookId);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    if (book.available <= 0) {
      return res.status(400).json({ success: false, message: "Book not available" });
    }

    await borrowModel.createBorrow(studentId, bookId);

    return res.status(200).json({
      success: true,
      message: "Book borrowed successfully",
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error });
  }
};

exports.returnBook = async (req, res) => {
  const { studentId, bookId } = req.body;

  try {
    const returned = await borrowModel.returnBook(studentId, bookId);

    if (!returned) {
      return res.status(400).json({
        success: false,
        message: "Book was not borrowed by this student",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book returned successfully",
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error });
  }
};

exports.getBorrowedBooks = async (req, res) => {
  const { studentId } = req.body;

  try {
    const books = await borrowModel.getBorrowedBooks(studentId);

    return res.status(200).json({ success: true, books });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error });
  }
};
