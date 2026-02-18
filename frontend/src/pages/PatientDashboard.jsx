import { useState, useEffect } from "react";
import apiClient from "../api/client";
import "./PatientDashboard.css";

function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("book"); // "book" or "appointments"
  const [appointments, setAppointments] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const [form, setForm] = useState({
    doctorName: "",
    department: "",
    date: "",
    time: ""
  });

  const departmentOptions = [
    "Cardiology",
    "Dermatology",
    "Orthopedics",
    "Neurology",
    "Pediatrics",
    "General Medicine"
  ];

  const timeOptions = [
    "09:00 AM",
    "10:30 AM",
    "12:00 PM",
    "02:00 PM",
    "04:30 PM",
    "06:00 PM"
  ];

  const token = localStorage.getItem("token");

  const filteredDoctors = form.department
    ? allDoctors.filter((d) => d.department === form.department)
    : [];

  // Handle URL hash to set active tab
  useEffect(() => {
    const hash = window.location.hash.slice(1); // Remove the '#'
    if (hash === "book" || hash === "appointments") {
      setActiveTab(hash);
    }

    const handleHashChange = () => {
      const newHash = window.location.hash.slice(1);
      if (newHash === "book" || newHash === "appointments") {
        setActiveTab(newHash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await apiClient.get("/doctors");
        setAllDoctors(res.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    const fetchAppointments = async () => {
      try {
        const res = await apiClient.get("/my-appointments", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAppointments(res.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchDoctors();
    fetchAppointments();
  }, [token]);

  const handleBook = async (e) => {
    e.preventDefault();

    try {
      await apiClient.post("/appointment", form, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Appointment booked successfully! The doctor will review your request.");
      
      // Reset form
      setForm({
        doctorName: "",
        department: "",
        date: "",
        time: ""
      });

      // Refresh appointments list
      const res = await apiClient.get("/my-appointments", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(res.data);

      // Switch to appointments tab to show the booked appointment
      setActiveTab("appointments");
      window.location.hash = "appointments";
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  return (
    <div className="page dashboard-page">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">Patient Portal</p>
          <h1 className="page-title">
            {activeTab === "book" ? "Book an Appointment" : "My Appointments"}
          </h1>
          <p className="subtle">
            {activeTab === "book" 
              ? "Schedule a visit with your preferred doctor." 
              : "Track and manage your upcoming appointments."}
          </p>
        </div>
        <div className="header-card">
          <p className="header-label">Total Appointments</p>
          <p className="header-value">{appointments.length} booked</p>
        </div>
      </header>

      <div className="dashboard-content">
        {activeTab === "book" && (
          <section className="card booking-card">
            <h3 className="card-title">Book Appointment</h3>
            <form className="form-grid" onSubmit={handleBook}>
              <label className="field">
                <span className="field-label">Department</span>
                <select
                  className="field-input"
                  value={form.department}
                  onChange={(e) =>
                    setForm({ ...form, department: e.target.value, doctorName: "" })
                  }
                  required
                >
                  <option value="">Select department</option>
                  {departmentOptions.map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span className="field-label">Doctor Name</span>
                <select
                  className="field-input"
                  value={form.doctorName}
                  onChange={(e) =>
                    setForm({ ...form, doctorName: e.target.value })
                  }
                  disabled={!form.department}
                  required
                >
                  <option value="">
                    {form.department ? "Select doctor" : "Select department first"}
                  </option>
                  {filteredDoctors.map((doctor) => (
                    <option key={doctor.name} value={doctor.name}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span className="field-label">Date</span>
                <input
                  className="field-input"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  required
                />
              </label>

              <label className="field">
                <span className="field-label">Time</span>
                <select
                  className="field-input"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  required
                >
                  <option value="">Select time</option>
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </label>

              <button className="btn primary" type="submit">
                Book Appointment
              </button>
            </form>
          </section>
        )}

        {activeTab === "appointments" && (
          <section className="card appointments-list-card">
            <h3 className="card-title">My Appointments</h3>
            <div className="list">
              {appointments.length === 0 ? (
                <p className="empty-state">No appointments yet. Book your first appointment!</p>
              ) : (
                appointments.map((a) => (
                  <div className="list-item" key={a._id}>
                    <div>
                      <p className="item-title">{a.doctorName}</p>
                      <p className="item-meta">
                        {a.department} · {a.date?.slice(0, 10)} · {a.time}
                      </p>
                    </div>
                    <span className="status-pill" data-status={a.status || "pending"}>
                      {a.status || "pending"}
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default PatientDashboard;
