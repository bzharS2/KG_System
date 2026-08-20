/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { getEvaluations } from "../../services/api";
import "./Evaluations.css";

function Evaluations() {
  const [evaluations, setEvaluations] = useState([]);

  async function loadEvaluations(params) {
    const token = localStorage.getItem("token");
    const result = await getEvaluations(token);
    if (result.error) {
      alert(result.error);
    }
    setEvaluations(result);
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadEvaluations();
  }, []);
  return (
    <div className="evaluations-page">
      <AdminNavbar />

      <div className="evaluations-page__container">
        <p className="evaluations-eyebrow">Admin / Directory</p>
        <h1 className="evaluations-title">Evaluations</h1>

        <div className="evaluations-list">
          {evaluations.length === 0 && (
            <p className="evaluations-empty">No evaluations found.</p>
          )}

          {evaluations.map((evaluation) => (
            <div key={evaluation.id} className="evaluation-card">
              <div className="evaluation-card__header">
                <h2 className="evaluation-card__title">{evaluation.title}</h2>
                <span className="evaluation-card__date">
                  Updated {evaluation.updated_at.split("T")[0]}
                </span>
              </div>

              <div className="evaluation-card__grid">
                <div className="evaluation-card__field">
                  <span className="evaluation-card__label">Student</span>
                  <span className="evaluation-card__value">
                    {evaluation.student}
                  </span>
                </div>
                <div className="evaluation-card__field">
                  <span className="evaluation-card__label">Teacher</span>
                  <span className="evaluation-card__value">
                    {evaluation.teacher}
                  </span>
                </div>
                <div className="evaluation-card__field">
                  <span className="evaluation-card__label">Subject</span>
                  <span className="evaluation-card__value">
                    {evaluation.subject}
                  </span>
                </div>
                <div className="evaluation-card__field">
                  <span className="evaluation-card__label">Grade</span>
                  <span className="evaluation-card__value">
                    {evaluation.grade}
                  </span>
                </div>
                <div className="evaluation-card__field">
                  <span className="evaluation-card__label">Class</span>
                  <span className="evaluation-card__value">
                    {evaluation.class}
                  </span>
                </div>
              </div>

              <div className="evaluation-card__description">
                <span className="evaluation-card__label">Teacher's opinion:</span>
                <p className="evaluation-card__opinion">{evaluation.opinion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Evaluations;
