import { NavLink } from "react-router-dom";
import "./AdminNavbar.css";

export default function AdminNavbar() {
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
    </nav>
  );
}
