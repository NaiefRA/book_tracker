const Book = require("../models/book");

module.exports.new_book = async (req, res) => {
  const { title, genre, totalPages, pagesRead, rating, remarks } = req.body;

  try {
    const book = await Book.create({
      userId: req.userId,
      title,
      genre,
      totalPages,
      pagesRead,
      rating,
      remarks,
    });

    console.log("New book created", book.title);
    res.status(201).json(book);
  } catch (err) {
    console.log("Couldnt add the book ", err);
    res.status(400).json({ message: err });
  }
};

module.exports.get_all_books = async (req, res) => {
  try {
    const books = await Book.find({ userId: req.userId });

    console.log("Got all books for a user");
    res.status(201).json(books);
  } catch (err) {
    console.log("Couldnt get all books for a user");
    res.status(400).json({ message: err });
  }
};

module.exports.edit_book = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(400).json({ error: "Failed to update book" });
  }
};

module.exports.delete_book = async (req, res) => {
  try {
    console.log("delete book");
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Book deleted" });
  } catch (err) {
    res.status(400).json({ error: "Failed to update book" });
  }
};
