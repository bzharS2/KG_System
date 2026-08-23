/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { getStudents, getStudentByName } from "../../services/api";
import "./Students.css";
import TeacherNavbar from "../../components/TeacherNavbar";
import { useNavigate } from "react-router-dom";

function Students() {
  const [kids, setKids] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  async function loadStudents() {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/");
    }
    const result = await getStudents(token);
    setKids(result);
  }
  async function searchByName(name) {
    if (name.trim() === "") {
      loadStudents();
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate(`/`);
    }
    const result = await getStudentByName(token, name);
    if (result.error) {
      alert(result.error);
      return;
    }
    setKids(result);
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/");
    }
    loadStudents();
  }, []);
  return (
    <div className="students-page">
      <TeacherNavbar />

      <div className="students-page__container">
        <p className="students-eyebrow">Teacher / Directory</p>
        <h1 className="students-title">Your Students</h1>
        <input
          type="text"
          value={search}
          placeholder="search by name..."
          onChange={(e) => {
            setSearch(e.target.value);
            searchByName(e.target.value);
          }}
        />
        
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
