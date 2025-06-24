import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    name: { firstname: "", lastname: "" },
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email || !emailRegex.test(form.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!form.username || form.username.length < 4) {
      newErrors.username = "Username must be at least 4 characters";
    }
    if (!form.password || form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!form.name.firstname) {
      newErrors.firstname = "First name is required";
    }
    if (!form.name.lastname) {
      newErrors.lastname = "Last name is required";
    }
    if (!form.phone || !/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["firstname", "lastname"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        name: { ...prev.name, [name]: value },
      }));
    } else if (name === "phone") {
      const onlyDigits = value.replace(/\D/g, "");
      setForm((prev) => ({ ...prev, phone: onlyDigits }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validate()) return;

    setLoading(true);
    try {
      const res = await axios.post("https://fakestoreapi.com/users", form);
      const newUser = { ...form, id: res.data.id };
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));
      setMessage("User registered successfully.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setMessage("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md border border-blue-200">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>

          <div>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div className="flex gap-3">
            <div className="w-1/2">
              <input
                name="firstname"
                value={form.name.firstname}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
              {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
            </div>
            <div className="w-1/2">
              <input
                name="lastname"
                value={form.name.lastname}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
              {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
            </div>
          </div>

          <div>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              onKeyDown={(e) => {
                const allowed = ["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"];
                if (!/[0-9]/.test(e.key) && !allowed.includes(e.key)) {
                  e.preventDefault();
                }
              }}
              maxLength={10}
              placeholder="Phone Number"
              className="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {message && (
            <p className="text-center text-sm text-gray-700 mt-2">{message}</p>
          )}
        </form>

        <p className="text-center text-sm text-gray-700 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
