import { useState } from "react";
import apiClient from "../api/client";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
    department: ""
  });

  const departmentOptions = [
    "Cardiology",
    "Dermatology",
    "Orthopedics",
    "Neurology",
    "Pediatrics",
    "General Medicine"
  ];
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const password = form.password.trim();

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (form.role === "doctor" && !form.department) {
      setError("Department is required for doctors.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await apiClient.post("/register", {
        ...form,
        name,
        email,
        password
      });
      alert("Registered Successfully");
      navigate("/");
    } catch (err) {
      const message = err?.response?.data?.message || "Registration failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page auth-page">
      <div className="auth-layout">
        <section className="auth-hero">
          <p className="eyebrow">Care Portal</p>
          <h1 className="page-title">Create your account</h1>
          <p className="subtle">
            Manage appointments, track visits, and connect with doctors in one
            calm, simple place.
          </p>
          <span className="hero-chip">Secure. Quick. Human.</span>
        </section>

        <section className="card auth-card">
          <h2 className="card-title">Register</h2>
          <form className="form-grid" onSubmit={handleSubmit}>
            {error && <p className="form-error">{error}</p>}
            <label className="field">
              <span className="field-label">Name</span>
              <input
                className="field-input"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>

            <label className="field">
              <span className="field-label">Email</span>
              <input
                className="field-input"
                placeholder="Email Id"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </label>

            <label className="field">
              <span className="field-label">Password</span>
              <input
                className="field-input"
                type="password"
                placeholder="Create a password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </label>

            <label className="field">
              <span className="field-label">Are you a doctor or patient?</span>
              <select
                className="field-input"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </label>

            {form.role === "doctor" && (
              <label className="field">
                <span className="field-label">Department</span>
                <select
                  className="field-input"
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                >
                  <option value="">Select department</option>
                  {departmentOptions.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <button className="btn primary" type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
            <p className="form-hint">
              Already have an account? <Link className="link" to="/">Login</Link>
            </p>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Register;
