/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import "./UserForm.css";
function EvaluationForm({
  evaluation,
  students,
  subjects,
  onSubmit,
  onCancel,
}) {
 // const [classId, setClassId] = useState("");
  const [subjectsId, setSubjectsId] = useState("");
  const [grade, setGrade] = useState("");
  const [opinion, setOpinion] = useState(0);
  const [studentId, setStudentId] = useState("");

  // If user exists, we're editing
  useEffect(() => {
    if (evaluation) {
      setSubjectsId(evaluation.subject_id || "");
      // setClassId(evaluation.class_id || "");
      setGrade(evaluation.grade || "");
      setOpinion(evaluation.opinion || "");
      setStudentId(evaluation.student_id || "");
    } else {
      setSubjectsId("");
      // setClassId("");
      setGrade("");
      setOpinion("");
      setStudentId("");
    }
  }, [evaluation]);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      id: evaluation?.id,
      subject_id: subjectsId,
      grade: grade,
      opinion: opinion,
      student_id: studentId,
    };

    await onSubmit(formData);
  }

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="user-form__header">
        <span className="user-form__tag">{evaluation ? "EDIT" : "NEW"}</span>
        <h2 className="user-form__title">
          {evaluation ? "Update Evaluation" : "Create Evaluation"}
        </h2>
      </div>

      <div className="user-form__grid">
        <div className="user-form__field">
          <label>Class</label>
          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          >
            <option value="">Select a student</option>
            {students.map((std) => (
              <option key={std.id} value={std.id}>
                {std.username}
              </option>
            ))}
          </select>
        </div>

        <div className="user-form__field">
          <label>Subject</label>
          <select
            value={subjectsId}
            onChange={(e) => setSubjectsId(e.target.value)}
          >
            <option value="">Select a subject</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        <div className="user-form__field">
          <label>Opinion</label>
          <input
          value={opinion}
            type="text"
            required
            onChange={(e) => {
              setOpinion(e.target.value);
            }}
          />
        </div>

        <div className="user-form__field">
          <label>Grade</label>
          <input
          value={grade}
            type="number"
            required
            max={100}
            min={0}
            onChange={(e) => {
              setGrade(Number(e.target.value));
            }}
          />
        </div>
      </div>

      <div className="user-form__actions">
        <button
          type="button"
          className="user-form__btn user-form__btn--ghost"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="user-form__btn user-form__btn--primary"
        >
          {evaluation ? "Update evaluation" : "Create evaluation"}
        </button>
      </div>
    </form>
  );
}
export default EvaluationForm;
