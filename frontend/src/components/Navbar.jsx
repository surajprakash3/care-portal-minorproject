import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">CareFlow</div>
      <div className="navbar-actions">
        {token ? (
          <>
            {role === "patient" && (
              <>
                <a className="link" href="/patient">
                  Book Appointment
                </a>
                <a className="link" href="/patient">
                  View Appointment
                </a>
              </>
            )}
            <button className="btn small" type="button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <a className="link" href="/">
              Login
            </a>
            <a className="btn small" href="/register">
              Register
            </a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
