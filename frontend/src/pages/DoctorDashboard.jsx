import { useState, useEffect } from "react";
import apiClient from "../api/client";
import "./DoctorDashboard.css";

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem("token");

  const fetchAppointments = async () => {
    const res = await apiClient.get("/doctor-appointments", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setAppointments(res.data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    await apiClient.put(
      `/appointment/${id}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchAppointments();
  };

  return (
    <div className="page dashboard-page">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">Doctor Portal</p>
          <h1 className="page-title">Appointment requests</h1>
          <p className="subtle">
            Review patient requests and confirm the schedule.
          </p>
        </div>
        <div className="header-card">
          <p className="header-label">Today</p>
          <p className="header-value">{appointments.length} requests</p>
        </div>
      </header>

      <section className="card">
        <h3 className="card-title">Pending Requests</h3>
        <div className="list">
          {appointments.length === 0 ? (
            <p className="empty-state">No requests yet.</p>
          ) : (
            appointments.map((a) => (
              <div className="list-item" key={a._id}>
                <div>
                  <p className="item-title">{a.patientName}</p>
                  <p className="item-meta">
                    {a.department} · {a.status}
                  </p>
                </div>
                <div className="doctor-actions">
                  <button
                    className="btn primary small"
                    onClick={() => updateStatus(a._id, "accepted")}
                  >
                    Accept
                  </button>
                  <button
                    className="btn outline small"
                    onClick={() => updateStatus(a._id, "rejected")}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default DoctorDashboard;
