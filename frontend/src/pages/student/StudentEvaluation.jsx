/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { getStudentEvaluation } from "../../services/api";
import "./StudentEvaluation.css";
import StudentNavbar from "../../components/StudentNavbar";

function StudentEvaluation() {
  const [data, setData] = useState(null);
  async function loadEvaluations() {
    const token = localStorage.getItem("token");
    const result = await getStudentEvaluation(token);
    console.log(result);
    setData(result);
  }
  useEffect(() => {
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
