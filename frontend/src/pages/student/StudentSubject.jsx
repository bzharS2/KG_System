/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { getStudentSubjects } from "../../services/api";
import "./StudentSubject.css";
import StudentNavbar from "../../components/StudentNavbar";
import { useNavigate } from "react-router-dom";

function StudentSubject() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  async function loadSubjects() {
    const token = localStorage.getItem("token");
    if (!token ) {
      return navigate('/')
    }
    const result = await getStudentSubjects(token);
    console.log(result);
    setData(result);
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/");
    }
    loadSubjects();
  }, []);
  return (
    <div className="student-subjects-page">
      <StudentNavbar/>
      <div className="student-subjects-page__container">
        <p className="student-subjects-eyebrow">Student / Directory</p>
        <h1 className="student-subjects-title">Your Subjects</h1>

        {data && data.length > 0 ? (
          <div className="student-subjects-list">
            {data.map((item) => (
              <div key={item.id} className="student-subject-card">
                <span className="student-subject-card__mark">✎</span>
                <div className="student-subject-card__body">
                  <h2 className="student-subject-card__subject">
                    {item.subject}
                  </h2>
                  <p className="student-subject-card__teacher">
                    {item.teacher}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : data && data.length === 0 ? (
          <div className="student-subjects-empty">
            <span className="student-subjects-empty__icon">📚</span>
            <h2 className="student-subjects-empty__title">
              No subjects yet
            </h2>
            <p className="student-subjects-empty__text">
              Once you're assigned to a class, your subjects and teachers
              will show up here.
            </p>
          </div>
        ) : (
          <p className="student-subjects-loading">Loading subjects…</p>
        )}
      </div>
    </div>
  );
}
export default StudentSubject;
