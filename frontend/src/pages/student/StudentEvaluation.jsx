/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { getStudentEvaluation } from "../../services/api";
import "./StudentEvaluation.css";
import StudentNavbar from "../../components/StudentNavbar";
import { useNavigate } from "react-router-dom";

function StudentEvaluation() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  async function loadEvaluations() {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate('/')
    }
    const result = await getStudentEvaluation(token);
    console.log(result);
    setData(result);
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/");
    }
    loadEvaluations();
  }, []);
  return (
    <div className="student-evals-page">
        <StudentNavbar/>
      <div className="student-evals-page__container">
        <p className="student-evals-eyebrow">Student / Directory</p>
        <h1 className="student-evals-title">Your Evaluations</h1>

        {data && data.length > 0 ? (
          <div className="student-evals-list">
            {data.map((item) => (
              <div key={item.id} className="student-eval-card">
                <div className="student-eval-card__header">
                  <h2 className="student-eval-card__subject">
                    {item.subject}
                  </h2>
                  <span className="student-eval-card__grade">
                    {item.grade}
                  </span>
                </div>

                <p className="student-eval-card__teacher">{item.teacher}</p>

                <p className="student-eval-card__opinion">{item.opinion}</p>
              </div>
            ))}
          </div>
        ) : data && data.length === 0 ? (
          <div className="student-evals-empty">
            <span className="student-evals-empty__icon">🌱</span>
            <h2 className="student-evals-empty__title">
              No evaluations yet
            </h2>
            <p className="student-evals-empty__text">
              Your teachers haven't written any evaluations for you yet.
              Check back later!
            </p>
          </div>
        ) : (
          <p className="student-evals-loading">Loading evaluations…</p>
        )}
      </div>
    </div>
  );
}
export default StudentEvaluation;
