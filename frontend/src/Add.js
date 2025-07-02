import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar";

const Add = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    genre: "",
    pagesRead: 0,
    totalPages: 0,
    rating: "",
    remarks: "",
  });

  const baseUrl = process.env.REACT_APP_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetch(`${baseUrl}/books`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => setError("Please log in first"));
    // eslint-disable-next-line
  }, []);

  // new book
  const handleAdd = (e) => {
    e.preventDefault();
    fetch(`${baseUrl}/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((newBook) => {
        navigate("/home");
        setForm({
          title: "",
          genre: "",
          pagesRead: 0,
          totalPages: 0,
          rating: "",
          remarks: "",
        });
      });
  };
  return (
    <>
      <Navbar />
      <h2 style={{ textAlign: "center" }}>Add Book</h2>

      {error && <div className="error-div">{error}</div>}

      {!error && (
        <div className="input-container">
          <form className="book-add-form" onSubmit={handleAdd}>
            <div className="input-div">
              <label>Title</label>
              <input
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-div">
              <label>Genre</label>

              <input
                name="genre"
                placeholder="Genre"
                value={form.genre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-div">
              <label>Pages Read</label>

              <input
                type="number"
                name="pagesRead"
                placeholder="Pages Read"
                value={form.pagesRead}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-div">
              <label>Total Pages</label>

              <input
                type="number"
                name="totalPages"
                placeholder="Total Pages"
                value={form.totalPages}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-div">
              <label>Rating</label>
              <select name="rating" value={form.rating} onChange={handleChange}>
                <option value="-">-</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="input-div">
              <label>Remarks</label>
              <input
                name="remarks"
                placeholder="Remarks"
                value={form.remarks}
                onChange={handleChange}
              />
            </div>
            <button className="submit-button" type="submit">
              Add Book
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Add;
