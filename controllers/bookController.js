const bookModel = require("../models/bookModel");

exports.searchBooks = async (req, res) => {
  const { query } = req.body;

  try {
    const books = await bookModel.searchBooks(query);

    if (books.length === 0) {
      return res.status(404).json({ success: false, message: "No books found" });
    }

    return res.status(200).json({ success: true, books });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error });
  }
};
