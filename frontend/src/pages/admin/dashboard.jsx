/* eslint-disable no-unused-vars */
import {
  Link,
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { use } from "react";
import { getAdminDashboard } from "../../services/api";
import AdminNavbar from "../../components/AdminNavbar";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadDashboard() {
      const token = localStorage.getItem("token");

      const result = await getAdminDashboard(token);

      setData(result);
    }

    loadDashboard();
  }, []);

  const stats = [
    { key: "students", label: "Students" },
    { key: "teachers", label: "Teachers" },
    { key: "staff", label: "Staff" },
    { key: "classes", label: "Classes" },
  ];

  return (
    <div className="dashboard-page">
      <AdminNavbar />

      <div className="dashboard-page__container">
        <p className="dashboard-eyebrow">Admin / Overview</p>
        <h1 className="dashboard-title">Admin Dashboard</h1>

        {data ? (
          <ul className="dashboard-stats">
            {stats.map(({ key, label }, i) => (
              <li className="stat-card" key={key}>
                <span className="stat-card__index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="stat-card__value">{data[key]}</span>
                <span className="stat-card__label">{label}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="dashboard-loading">Loading dashboard…</p>
        )}
      </div>
    </div>
  );
}
export default AdminDashboard;
