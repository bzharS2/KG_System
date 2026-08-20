/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { getTeacherEvaluations } from "../../services/api";
import "./TeacherEvaluations.css";


function TeacherEvaluations() {
  const [evaluations, setEvaluations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  async function loadEvaluations() {
    const token = localStorage.getItem("token");
    const result = await getTeacherEvaluations(token);
    setEvaluations(result);
  }
  useEffect(() => {
    loadEvaluations();
  }, []);
  return (
    
    <div className="teacher-evals-page">
      
      <div className="teacher-evals-page__container">
        <p className="teacher-evals-eyebrow">Teacher / Directory</p>
        <h1 className="teacher-evals-title">Evaluations</h1>
           <button
            className="users-create-btn"
            onClick={() => {
              setShowForm(true);
            }}
          >
            Create evaluation
          </button>

        {evaluations && evaluations.length > 0 ? (
          <div className="teacher-evals-list">
            {evaluations.map((evaluation, i) => (
              <div key={i} className="teacher-eval-card">
                <div className="teacher-eval-card__header">
                  <h2 className="teacher-eval-card__student">
                    {evaluation.student}
                  </h2>
                  <span className="teacher-eval-card__grade">
                    {evaluation.grade}
                  </span>
                </div>

                <p className="teacher-eval-card__subject">
                  {evaluation.subject}
                </p>

                <p className="teacher-eval-card__opinion">
                  {evaluation.opinion}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="teacher-evals-empty">
            <span className="teacher-evals-empty__icon">✎</span>
            <h2 className="teacher-evals-empty__title">No evaluations yet</h2>
            <p className="teacher-evals-empty__text">
              Once you write an evaluation for a student, it'll show up here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
export default TeacherEvaluations;
