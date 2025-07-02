import { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Dashboard = () => {
  const baseUrl = process.env.REACT_APP_URL;

  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  //editing
  const [bookInputs, setBookInputs] = useState({});

  // filter functionality
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [genreSearch, setGenreSearch] = useState("");

  const [completedBooksNumber, setCompletedBooksNumber] = useState([]);

  useEffect(() => {
    const newCompletedBooks = books.filter((book) => {
      return book.pagesRead === book.totalPages;
    });

    setCompletedBooksNumber(newCompletedBooks.length);
  }, [books, completedBooksNumber]);

  useEffect(() => {
    const newFilteredBooks = books.filter((book) => {
      const matchesCompletion =
        !showCompleted || book.pagesRead === book.totalPages;
      const matchesGenre = book.genre
        .toLowerCase()
        .includes(genreSearch.toLowerCase());
      return matchesCompletion && matchesGenre;
    });

    setFilteredBooks(newFilteredBooks);
  }, [books, showCompleted, genreSearch]);

  // get all books
  useEffect(() => {
    fetch(`${baseUrl}/books`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((res) => {
        setBooks(res);
        const inputs = {};
        res.forEach((book) => {
          inputs[book._id] = {
            pagesRead: book.pagesRead,
            rating: book.rating,
            remarks: book.remarks,
          };
        });
        setBookInputs(inputs);
      })
      .catch((err) => setError("Please log in first"));
    // eslint-disable-next-line
  }, []);

  // delete book
  const handleDelete = (id) => {
    fetch(`${baseUrl}/books/${id}`, {
      method: "DELETE",
      credentials: "include",
    }).then(() => {
      setBooks(books.filter((b) => b._id !== id));
    });
  };

  // editing
  const handleEdit = (id, field, value) => {
    fetch(`${baseUrl}/books/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ [field]: value }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setBooks(books.map((b) => (b._id === id ? updated : b)));
      });
  };

  return (
    <div className="homepage">
      <Navbar />
      <h2 className="homepage-header">Your Books</h2>

      {error && <div className="error-div">{error}</div>}
      {books.length === 0 && <div className="error-div">Add a book</div>}
      <div className="details">
        <div className="stats">
          <label>Total Books - {books?.length}</label>
          <label>Completed Books - {completedBooksNumber}</label>
        </div>
        <div className="filters">
          <label>
            Filter By Completed Books
            <input
              type="checkbox"
              checked={showCompleted}
              onChange={(e) => setShowCompleted(e.target.checked)}
            />
          </label>
          <label>Filter By Genre</label>
          <input
            type="text"
            placeholder="Enter genre"
            value={genreSearch}
            onChange={(e) => setGenreSearch(e.target.value)}
          />
        </div>
      </div>

      {!error && books.length > 0 && (
        <div className="homepage-content">
          <div className="table-container">
            <table className="book-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Genre</th>
                  <th>Progress</th>
                  <th>Rating</th>
                  <th>Remarks</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book, i) => (
                  <tr key={book._id}>
                    <td>{i + 1}</td>
                    <td>{book.title}</td>
                    <td>{book.genre}</td>
                    <td>
                      <input
                        type="number"
                        className="progress-input"
                        value={bookInputs[book._id]?.pagesRead || ""}
                        onChange={(e) =>
                          setBookInputs({
                            ...bookInputs,
                            [book._id]: {
                              ...bookInputs[book._id],
                              pagesRead: e.target.value,
                            },
                          })
                        }
                        onBlur={(e) =>
                          handleEdit(book._id, "pagesRead", e.target.value)
                        }
                        style={{ width: "60px" }}
                      />{" "}
                      / {book.totalPages}
                    </td>
                    <td>
                      <select
                        value={bookInputs[book._id]?.rating || "-"}
                        onChange={(e) =>
                          setBookInputs({
                            ...bookInputs,
                            [book._id]: {
                              ...bookInputs[book._id],
                              rating: e.target.value,
                            },
                          })
                        }
                        onBlur={(e) =>
                          handleEdit(book._id, "rating", e.target.value)
                        }
                      >
                        <option value="-">-</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={bookInputs[book._id]?.remarks || ""}
                        onChange={(e) =>
                          setBookInputs({
                            ...bookInputs,
                            [book._id]: {
                              ...bookInputs[book._id],
                              remarks: e.target.value,
                            },
                          })
                        }
                        onBlur={(e) =>
                          handleEdit(book._id, "remarks", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(book._id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
