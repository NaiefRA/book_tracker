const express = require("express");
const bookController = require("../controllers/bookController");

const router = express.Router();

router.post("/", bookController.new_book);

router.get("/", bookController.get_all_books);

router.patch("/:id", bookController.edit_book);

router.delete("/:id", bookController.delete_book);

module.exports = router;
