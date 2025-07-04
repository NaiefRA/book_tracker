import { useState, useEffect } from "react";

const EditBookPopup = ({ book, onClose, onSubmit }) => {
  const baseUrl = process.env.REACT_APP_URL;

  const [form, setForm] = useState({
    title: "",
    genre: "",
    totalPages: 0,
    pagesRead: 0,
    rating: "-",
    remarks: "",
  });

  useEffect(() => {
    if (book) {
      setForm({ ...book });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    fetch(`${baseUrl}/books/${book._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((updated) => {
        onSubmit(updated);
        onClose();
      })
      .catch((err) => console.error("Failed to update book", err));
  };

  if (!book) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <h3>Edit Book</h3>
        <div className="input-group">
          <label>Title</label>
          <input name="title" value={form.title} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Genre</label>
          <input name="genre" value={form.genre} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Total Pages</label>
          <input
            type="number"
            name="totalPages"
            value={form.totalPages}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label>Pages Read</label>
          <input
            type="number"
            name="pagesRead"
            value={form.pagesRead}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
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
        <div className="input-group">
          <label>Remarks</label>
          <input name="remarks" value={form.remarks} onChange={handleChange} />
        </div>

        <div className="popup-actions">
          <button className="edit-btn" onClick={handleSave}>
            Save
          </button>
          <button className="delete-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBookPopup;
