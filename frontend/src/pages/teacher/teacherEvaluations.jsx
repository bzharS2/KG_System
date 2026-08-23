/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import {
  getTeacherEvaluations,
  //getTeacherClasses,
  getTeacherSubjects,
  getStudents,
  createEvaluation,
  updateEvaluations,
  deleteEvaluations,
} from "../../services/api";
import "./TeacherEvaluations.css";
import TeacherNavbar from "../../components/TeacherNavbar";
import CreateEvaluation from "../../components/CreateEvaluation";
import { useNavigate } from "react-router-dom";

function TeacherEvaluations() {
  const navigate = useNavigate();

  const [evaluations, setEvaluations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  // const [levels, setLevels] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [fromUpdate, setFromUpdate] = useState(false);
  const [single, setSingle] = useState(null);

  async function loadEvaluations() {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }

    const result = await getTeacherEvaluations(token);
    setEvaluations(result);
  }
  async function loadSubjects() {
    const token = localStorage.getItem("token");
      if (!token) {
      return navigate("/");
    }
    const result = await getTeacherSubjects(token);
    setSubjects(result);
  }
  // async function loadClasses() {
  //   const token = localStorage.getItem("token");
  //   const result = await getTeacherClasses(token);
  //   setLevels(result);
  // }
  async function loadStudents() {
    const token = localStorage.getItem("token");
      if (!token) {
      return navigate("/");
    }
    const result = await getStudents(token);
    setStudents(result);
  }

  async function create(data) {
    const token = localStorage.getItem("token");
      if (!token) {
      return navigate("/");
    }
    const result = await createEvaluation(token, data);
    if (result.error) {
      return alert(result.error);
    }
    loadEvaluations();
  }
  async function update(data) {
    const id = data.id;
    const token = localStorage.getItem("token");
      if (!token) {
      return navigate("/");
    }
    const result = await updateEvaluations(token, data, id);
    if (result.error) {
      return alert(result.error);
    }
    loadEvaluations();
  }
  async function remove(data) {
    const ans = window.confirm(
      `are you sure you want to delete ${data.student}`,
    );
    if (!ans) {
      return;
    }
    const id = data.id;
    const token = localStorage.getItem("token");
      if (!token) {
      return navigate("/");
    }
    const result = await deleteEvaluations(token, id);
    if (result.error) {
      return alert(result.error);
    }
    loadEvaluations();
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/");
    }
    loadEvaluations();
    // loadClasses();
    loadSubjects();
    loadStudents();
  }, []);
  return (
    <div className="teacher-evals-page">
      <TeacherNavbar />

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
        {showForm && (
          <CreateEvaluation
            evaluation={null}
            students={students}
            subjects={subjects}
            onSubmit={create}
            onCancel={() => {
              setShowForm(false);
            }}
          />
        )}
        {fromUpdate && (
          <CreateEvaluation
            evaluation={single}
            students={students}
            subjects={subjects}
            onSubmit={update}
            onCancel={() => {
              setFromUpdate(false);
            }}
          />
        )}

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

                <div className="teacher-eval-card__actions">
                  <button
                    className="teacher-eval-card__update-btn"
                    onClick={() => {
                      setFromUpdate(true);
                      setSingle(evaluation);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="teacher-eval-card__delete-btn"
                    onClick={() => {
                      remove(evaluation);
                    }}
                  >
                    Delete
                  </button>
                </div>
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
