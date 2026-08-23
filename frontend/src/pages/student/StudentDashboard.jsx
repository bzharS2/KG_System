/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { getStudentDashboard } from "../../services/api";
import "./StudentDashboard.css";
import StudentNavbar from "../../components/StudentNavbar";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  async function loadDashboard() {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/");
    }
    const result = await getStudentDashboard(token);
    setData(result);
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/");
    }
    loadDashboard();
  }, []);
  return (
    <div className="student-dashboard-page">
      <StudentNavbar />
      <div className="student-dashboard-page__container">
        <p className="student-dashboard-eyebrow">Student / Overview</p>
        <h1 className="student-dashboard-title">Hello</h1>

        {data ? (
          <div className="student-profile-card">
            <div className="student-profile-card__avatar">
              {data.username ? data.username.charAt(0).toUpperCase() : "?"}
            </div>

            <div className="student-profile-card__body">
              <h2 className="student-profile-card__name">{data.username}</h2>
              <p className="student-profile-card__email">{data.email}</p>

              <div className="student-profile-card__grid">
                <div className="student-profile-card__field">
                  <span className="student-profile-card__label">
                    Date of Birth
                  </span>
                  <span className="student-profile-card__value">
                    {data.date_of_birth.split("T")[0]}
                  </span>
                </div>
                <div className="student-profile-card__field">
                  <span className="student-profile-card__label">Class</span>
                  <span className="student-profile-card__value">
                    {data.class}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="student-dashboard-loading">Loading dashboard…</p>
        )}
      </div>
    </div>
  );
}
export default StudentDashboard;
