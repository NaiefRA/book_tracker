import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ isLoading, setIsLoading, setMessage }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setMessage("");

    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const baseUrl = process.env.REACT_APP_URL;
    setIsLoading(true);

    fetch(`${baseUrl}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(form),
    })
      .then(async (res) => {
        const data = await res.json();
        console.log(data);
        if (!res.ok) throw new Error(data.error || "Login failed");
        return data;
      })
      .then((res) => {
        setIsLoading(false);
        navigate("/add");
        alert("Signup Successful");
        setForm({ username: "", password: "" });
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.message.includes("E11000")) {
          setMessage("User already exists");
        } else {
          setMessage(err.message);
        }
        console.log(err);
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
        <button className="submit-button" type="submit" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
