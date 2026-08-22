import { NavLink } from "react-router-dom";
import "./AdminNavbar.css";

export default function TeacherNavbar() {
  const links = [
    { to: "/teacher/dashboard", label: "Dashboard" },
    { to: "/teacher/students", label: "Students" },
    { to: "/teacher/evaluations", label: "Evaluations" },
  ];

  return (
    <nav className="admin-nav">
      <div className="admin-nav__mark">TEACHER</div>
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
