/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { getTeacherDashboard } from "../../services/api";
import "./TeacherDashboard.css";
import TeacherNavbar from "../../components/TeacherNavbar";
import { useNavigate } from "react-router-dom";

function TeacherDashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  async function loadDashboard() {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/");
    }
    const result = await getTeacherDashboard(token);
    console.log(result);
    setData(result);
  }
  useEffect(() => {
    loadDashboard();
  }, []);
  return (
    <div className="teacher-dashboard-page">
      <TeacherNavbar />

      <div className="teacher-dashboard-page__container">
        <p className="teacher-dashboard-eyebrow">Teacher / Overview</p>
        <h1 className="teacher-dashboard-title">My Dashboard</h1>

        {data ? (
          <div className="teacher-profile-card">
            <div className="teacher-profile-card__avatar">
              {data.username ? data.username.charAt(0).toUpperCase() : "?"}
            </div>

            <div className="teacher-profile-card__body">
              <h2 className="teacher-profile-card__name">{data.username}</h2>
              <p className="teacher-profile-card__email">{data.email}</p>

              <div className="teacher-profile-card__grid">
                <div className="teacher-profile-card__field">
                  <span className="teacher-profile-card__label">
                    Date of Birth
                  </span>
                  <span className="teacher-profile-card__value">
                    {data.date_of_birth.split("T")[0]}
                  </span>
                </div>
                <div className="teacher-profile-card__field">
                  <span className="teacher-profile-card__label">Subject</span>
                  <span className="teacher-profile-card__value">
                    {data.assignments.map((data) => (
                      <p key={data.id}>{data.subject}</p>
                    ))}
                  </span>
                </div>
                <div className="teacher-profile-card__field">
                  <span className="teacher-profile-card__label">Class</span>
                  <span className="teacher-profile-card__value">
                    {data.assignments.map((data) => (
                      <p key={data.id}>{data.class}</p>
                    ))}{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="teacher-dashboard-loading">Loading dashboard…</p>
        )}
      </div>
    </div>
  );
}
export default TeacherDashboard;
