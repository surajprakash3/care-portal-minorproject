import { useState } from "react";
import apiClient from "../api/client";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "", role: "patient" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = form.email.trim();
    const password = form.password.trim();

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await apiClient.post("/login", {
        ...form,
        email,
        password
      });

      if (res.data.role !== form.role) {
        setError("Selected role does not match your account.");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "patient") {
        navigate("/patient");
      } else {
        navigate("/doctor");
      }
    } catch (err) {
      const message = err?.response?.data?.message || "Login failed.";
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
          <h1 className="page-title">Welcome back</h1>
          <p className="subtle">
            Pick up where you left off and keep care moving forward.
          </p>
          <span className="hero-chip">Appointments. Updates. Answers.</span>
        </section>

        <section className="card auth-card">
          <h2 className="card-title">Login</h2>
          <form className="form-grid" onSubmit={handleSubmit}>
            {error && <p className="form-error">{error}</p>}
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
                placeholder="Your password"
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

            <button className="btn primary" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            <p className="form-hint">
              New here? <Link className="link" to="/register">Create account</Link>
            </p>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Login;
