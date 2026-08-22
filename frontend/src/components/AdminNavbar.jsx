import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./AdminNavbar.css";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }
  const links = [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/users", label: "Users" },
    { to: "/admin/classes", label: "Classes" },
    { to: "/admin/subjects", label: "Subjects" },
    { to: "/admin/assignments", label: "Assignments" },
    { to: "/admin/evaluations", label: "Evaluations" },
  ];

  return (
    <nav className="admin-nav">
      <div className="admin-nav__mark">ADMIN</div>

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
