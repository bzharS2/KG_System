import { NavLink, useNavigate } from "react-router-dom";
import "./AdminNavbar.css";
import { useState } from "react";

export default function StudentNavbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function logout() {
    const ans = window.confirm(`are you sure you want to logout `);
    if (!ans) {
      return;
    }
    localStorage.removeItem("token");
    navigate("/");
  }
  const links = [
    { to: "/student/dashboard", label: "Dashboard" },
    { to: "/student/subjects", label: "Subjects" },
    { to: "/student/evaluations", label: "Evaluations" },
  ];

  return (
    <nav className="admin-nav">
      <div className="admin-nav__mark">Student</div>
      <div className="admin-nav__links">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              "admin-nav__link" + (isActive ? " admin-nav__link--active" : "")
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
      <button className="admin-nav__logout" onClick={logout}>
        Logout
      </button>
      
      <button
        className="admin-nav__toggle"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        <span className="admin-nav__toggle-line" />
        <span className="admin-nav__toggle-line" />
        <span className="admin-nav__toggle-line" />
      </button>
      {menuOpen && (
        <div className="admin-nav__dropdown">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                "admin-nav__dropdown-link" +
                (isActive ? " admin-nav__dropdown-link--active" : "")
              }
            >
              {label}
            </NavLink>
          ))}
          <button
            className="admin-nav__dropdown-logout"
            onClick={() => {
              setMenuOpen(false);
              logout();
            }}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
