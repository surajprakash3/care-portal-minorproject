import { useState, useEffect } from "react";
import apiClient from "../api/client";
import "./DoctorDashboard.css";

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all"); // "all" or "accepted"
  const token = localStorage.getItem("token");

  // Handle URL hash to set filter
  useEffect(() => {
    const hash = window.location.hash.slice(1); // Remove the '#'
    console.log("Current hash:", hash);
    if (hash === "all" || hash === "accepted") {
      setFilter(hash);
      console.log("Setting filter to:", hash);
    } else {
      // Default to "all" and set the hash
      setFilter("all");
      console.log("No valid hash, defaulting to 'all'");
      if (window.location.pathname === "/doctor") {
        window.location.hash = "all";
      }
    }

    const handleHashChange = () => {
      const newHash = window.location.hash.slice(1);
      console.log("Hash changed to:", newHash);
      if (newHash === "all" || newHash === "accepted") {
        setFilter(newHash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await apiClient.get("/doctor-appointments", {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Fetched appointments:", res.data);
        setAppointments(res.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [token]);

  const updateStatus = async (id, status) => {
    try {
      console.log("Updating appointment", id, "to status:", status);
      const updateRes = await apiClient.put(
        `/appointment/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Update response:", updateRes.data);

      const res = await apiClient.get("/doctor-appointments", {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Refreshed appointments:", res.data);
      setAppointments(res.data);
    } catch (error) {
      console.error("Error updating appointment status:", error);
      alert("Failed to update appointment status. Please try again.");
    }
  };

  const filteredAppointments = filter === "accepted" 
    ? appointments.filter(a => a.status === "accepted")
    : appointments.filter(a => a.status !== "accepted" && a.status !== "rejected");

  console.log("All appointments:", appointments);
  console.log("Filter:", filter);
  console.log("Filtered appointments:", filteredAppointments);

  const pendingCount = appointments.filter(a => a.status !== "accepted" && a.status !== "rejected").length;
  const acceptedCount = appointments.filter(a => a.status === "accepted").length;

  return (
    <div className="page dashboard-page">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">Doctor Portal</p>
          <h1 className="page-title">
            {filter === "accepted" ? "Accepted Appointments" : "Appointment Requests"}
          </h1>
          <p className="subtle">
            {filter === "accepted" 
              ? "View all accepted appointments."
              : "Review and manage pending appointment requests."}
          </p>
        </div>
        <div className="header-card">
          <p className="header-label">
            {filter === "accepted" ? "Accepted Appointments" : "Pending Requests"}
          </p>
          <p className="header-value">
            {filter === "accepted" ? `${acceptedCount} accepted` : `${pendingCount} pending`}
          </p>
        </div>
      </header>

      <section className="card appointments-card">
        <h3 className="card-title">
          {filter === "accepted" ? "Accepted Appointments" : "Pending Appointment Requests"}
        </h3>
        <div className="list">
          {filteredAppointments.length === 0 ? (
            <p className="empty-state">
              {filter === "accepted" 
                ? "No accepted appointments yet."
                : "No pending appointment requests."}
            </p>
          ) : (
            filteredAppointments.map((a) => (
              <div className="list-item appointment-item" key={a._id}>
                <div className="appointment-info">
                  <p className="item-title">{a.patientName}</p>
                  <p className="item-meta">
                    {a.department} · {a.date?.slice(0, 10)} · {a.time}
                  </p>
                  <span className="status-pill" data-status={a.status || "pending"}>
                    {a.status || "pending"}
                  </span>
                </div>
                {filter !== "accepted" && (
                  <div className="doctor-actions">
                    <button
                      className="btn primary small"
                      onClick={() => updateStatus(a._id, "accepted")}
                      disabled={a.status === "accepted" || a.status === "rejected"}
                    >
                      Accept
                    </button>
                    <button
                      className="btn outline small"
                      onClick={() => updateStatus(a._id, "rejected")}
                      disabled={a.status === "accepted" || a.status === "rejected"}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default DoctorDashboard;
