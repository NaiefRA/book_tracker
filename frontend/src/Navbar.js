import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { User } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const baseUrl = process.env.REACT_APP_URL;

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${baseUrl}/auth/username`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUsername(data.username))
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    fetch(`${baseUrl}/auth/logout`, {
      method: "GET",
      credentials: "include",
    })
      .then(() => navigate("/"))
      .catch((err) => console.error("Logout failed", err));
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="title">Book Tracker!</h2>

        <a href="/home" className="nav-link">
          Dashboard
        </a>
        <a href="/add" className="nav-link">
          Add Book
        </a>
      </div>
      <div className="nav-right">
        {username && (
          <span className="username">
            <User /> {username}
          </span>
        )}
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
