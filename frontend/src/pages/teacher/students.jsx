/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { getStudents } from "../../services/api";
import "./Students.css";

function Students() {
  const [kids, setKids] = useState([]);
  async function loadStudents() {
    const token = localStorage.getItem("token");
    const result = await getStudents(token);
    setKids(result);
  }
  useEffect(() => {
    loadStudents();
  }, []);
  return (
    
    <div className="students-page">
      <div className="students-page__container">
        <p className="students-eyebrow">Teacher / Directory</p>
        <h1 className="students-title">Your Students</h1>

        <div className="students-list">
          {kids.length === 0 && (
            <p className="students-empty">No students yet.</p>
          )}
          {kids.map((user) => (
            <div key={user.id} className="student-card">
              <div className="student-card__avatar">
                {user.username ? user.username.charAt(0).toUpperCase() : "?"}
              </div>

              <div className="student-card__main">
                <h2 className="student-card__name">{user.username}</h2>
                <p className="student-card__email">{user.email}</p>
              </div>

              <div className="student-card__meta">
                <span className="student-card__dob">
                  {user.date_of_birth.split("T")[0]}
                </span>
                <span className="student-card__class">{user.class}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Students;
