/* eslint-disable react-hooks/set-state-in-effect */
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
import {
  getAdminDashboard,
  getActiveStaff,
  getActiveStudents,
  getActiveTeacher,
} from "../../services/api";
import AdminNavbar from "../../components/AdminNavbar";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [activeStudents, setActiveStudents] = useState(null);
  const [activeTeachers, setActiveTeachers] = useState(null);
  const [activeStaff, setActiveStaff] = useState(null);
  async function loadStudent(params) {
    const token = localStorage.getItem("token");
    const result = await getActiveStudents(token);
    setActiveStudents(result);
  }
  async function loadTeacher(params) {
    const token = localStorage.getItem("token");
    const result = await getActiveTeacher(token);
    setActiveTeachers(result);
  }
  async function loadStaff(params) {
    const token = localStorage.getItem("token");
    const result = await getActiveStaff(token);
    setActiveStaff(result);
  }
  async function loadDashboard() {
    const token = await localStorage.getItem("token");
    if (!token) {
      return navigate("/");
    }
    const result = await getAdminDashboard(token);

    setData(result);
  }
  useEffect(() => {
    loadDashboard();
    loadStaff();
    loadStudent();
    loadTeacher();
  }, []);

  const stats = [
    { key: "students", label: "Students" },
    { key: "teachers", label: "Teachers" },
    { key: "staff", label: "Staff" },
    { key: "classes", label: "Classes" },
  ];

  const activeStats = [
    { value: activeStudents, label: "Active Students" },
    { value: activeTeachers, label: "Active Teachers" },
    { value: activeStaff, label: "Active Staff" },
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

        <h2 className="dashboard-subtitle">Active Now</h2>
        <ul className="dashboard-active-stats">
          {activeStats.map(({ value, label }) => (
            <li className="active-stat-card" key={label}>
              <span className="active-stat-card__dot" />
              <span className="active-stat-card__value">
                {value === null ? "—" : value.count}
              </span>
              <span className="active-stat-card__label">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default AdminDashboard;
