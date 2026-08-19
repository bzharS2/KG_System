/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import "./UserForm.css";
function AssignmentForm({
  assignment,
  teachers,
  classes,
  subjects,
  onSubmit,
  onCancel,
}) {
  const [classId, setClassId] = useState("");
  const [teachersId, setTeacherId] = useState("");
  const [subjectsId, setSubjectsId] = useState("");

  // If user exists, we're editing
  useEffect(() => {
    if (assignment) {
      setTeacherId(assignment.teacher_id || "");
      setSubjectsId(assignment.subject_id || "");
      setClassId(assignment.class_id || "");
    } else {
      setSubjectsId("");
      setTeacherId("");
      setClassId("");
    }
  }, [assignment]);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      id: assignment?.id,
      teacher_id: teachersId,
      subject_id: subjectsId,
      class_id: classId,
    };

    await onSubmit(formData);
  }

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="user-form__header">
        <span className="user-form__tag">{assignment ? "EDIT" : "NEW"}</span>
        <h2 className="user-form__title">
          {assignment ? "Update User" : "Create User"}
        </h2>
      </div>

      <div className="user-form__grid">
        <div className="user-form__field">
          <label>Class</label>
          <select value={classId} onChange={(e) => setClassId(e.target.value)}>
            <option value="">Select a class</option>
            {classes.map((classItem) => (
              <option key={classItem.id} value={classItem.id}>
                {classItem.name}
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
          <label>Teacher</label>
          <select
            value={teachersId}
            onChange={(e) => setTeacherId(e.target.value)}
          >
            <option value="">Select a Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.username}
              </option>
            ))}
          </select>
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
          {assignment ? "Update Assignment" : "Create Assignment"}
        </button>
      </div>
    </form>
  );
}
export default AssignmentForm;
