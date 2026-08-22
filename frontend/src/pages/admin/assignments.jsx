/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import {
  Link,
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { use } from "react";
import {
  getAssignments,
  getClasses,
  getSubjects,
  getTeachers,
  createAssignment,
  deleteAssignment,
  updateAssignment,
} from "../../services/api";
import AdminNavbar from "../../components/AdminNavbar";
import AssignmentForm from "../../components/AssignmentForm";
import "./Assignments.css";

function Assignments() {
    const navigate=useNavigate();

  const [assignments, setAssignments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [fromUpdate, setFromUpdate] = useState(false);
  const [Assignment, setAssignment] = useState(null);

  async function createA(data) {
    const token = localStorage.getItem("token");
    const result = await createAssignment(token, data);
    if (result.error) {
      alert(result.error);
    }
    loadAssignments();
  }
  async function updateA(data) {
    const token = localStorage.getItem("token");
    const id = data.id;
    const result = await updateAssignment(token, data, id);
    if (result.error) {
      alert(result.error)
    }
    loadAssignments();
  }
  async function deleteA(id) {
    const ans = window.confirm(`do you want to delete that assignment`);
    if (!ans) {
      return;
    }
    const token = localStorage.getItem("token");
    const result = await deleteAssignment(token, id);
    if (result.error) {
      alert(result.error);
    }
    loadAssignments();
  }

  async function loadClasses() {
    const token = localStorage.getItem("token");
    const result = await getClasses(token);
    setClasses(result);
  }
  async function loadAssignments() {
    const token = localStorage.getItem("token");
    if (!token) {
      return  navigate('/')
    }
    const result = await getAssignments(token);
    setAssignments(result);
  }
  async function loadSubjects() {
    const token = localStorage.getItem("token");
    const result = await getSubjects(token);
    setSubjects(result);
  }
  async function loadTeachers() {
    const token = localStorage.getItem("token");
    const result = await getTeachers(token);
    setTeachers(result);
  }
  useEffect(() => {
    loadAssignments();
    loadClasses();
    loadSubjects();
    loadTeachers();
  }, []);
  return (
    <div className="assignments-page">
      <AdminNavbar />

      <div className="assignments-page__container">
        <p className="assignments-eyebrow">Admin / Directory</p>
        <h1 className="assignments-title">Assignments</h1>
        <button
          className="classes-create-btn"
          onClick={() => {
            setShowForm(true);
          }}
        >
          Create Assignment
        </button>
        {showForm && (
          <AssignmentForm
            assignment={null}
            teachers={teachers}
            classes={classes}
            subjects={subjects}
            onSubmit={createA}
            onCancel={() => setShowForm(false)}
          />
        )}
        {fromUpdate && (
          <AssignmentForm
            assignment={Assignment}
            teachers={teachers}
            classes={classes}
            subjects={subjects}
            onSubmit={updateA}
            onCancel={() => setFromUpdate(false)}
          />
        )}

        <div className="assignments-list">
          {assignments.length === 0 && (
            <p className="assignments-empty">No assignments yet.</p>
          )}
          {assignments.map((assignment) => (
            <div key={assignment.id} className="assignment-card">
              <div className="assignment-card__field">
                <span className="assignment-card__label">Teacher</span>
                <span className="assignment-card__value">
                  {assignment.teacher}
                </span>
              </div>
              <div className="assignment-card__field">
                <span className="assignment-card__label">Subject</span>
                <span className="assignment-card__value">
                  {assignment.subject}
                </span>
              </div>
              <div className="assignment-card__field">
                <span className="assignment-card__label">Class</span>
                <span className="assignment-card__value">
                  {assignment.class}
                </span>
              </div>
              <div className="assignment-card__actions">
                <button
                  className="assignment-card__update-btn"
                  onClick={() => {
                    setAssignment(assignment);
                    setFromUpdate(true);
                  }}
                >
                  Update
                </button>
                <button
                  className="assignment-card__delete-btn"
                  onClick={() => {
                    deleteA(assignment.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Assignments;