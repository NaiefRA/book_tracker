import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const baseUrl = process.env.REACT_APP_URL;

    fetch(`${baseUrl}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) {
          console.log(res);
          throw new Error(res.error || `HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        setMessage("Signup Successful");
        navigate("/home");

        setForm({ username: "", password: "" });
      })
      .catch((err) => {
        setMessage(err.message);
        console.error(err);
      });
  };

  return (
    <div className="input-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="submit-button" type="submit">
          Sign Up
        </button>
      </form>
      <div>{message}</div>
    </div>
  );
};

export default Signup;
