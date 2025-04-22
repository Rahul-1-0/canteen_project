import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    admissionNumber: "",
    branch: "",
    course: "",
    section: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {["name", "email", "password", "admissionNumber", "branch", "course", "section"].map((field) => (
          <div key={field}>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              placeholder={field}
              value={form[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
