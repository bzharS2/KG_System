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
  getClasses,
  createClass,
  deleteClass,
  updateClass,
} from "../../services/api";
import AdminNavbar from "../../components/AdminNavbar";
import CreateClassForm from "../../components/CreateClassForm";
import "./Classes.css";

function Classes() {
  const [classes, setClasses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [fromUpdate, setFromUpdate] = useState(false);
  const [level, setLevel] = useState(null);

  async function createC(fromData) {
    const token = localStorage.getItem("token");
    const result = await createClass(token, fromData);
    if (result.error) {
      alert(result.error);
      return;
    }
    loadClasses();
  }
  async function updateC(fromData) {
    const id = fromData.id;
    const token = localStorage.getItem("token");
    const result = await updateClass(token, fromData, id);
     if (result.error) {
      alert(result.error);
      return;
    }
    loadClasses();
  }
  async function deleteC(id) {
    const ans = window.confirm(`do you want to delete that class`);
    if (!ans) {
      return;
    }
    const token = localStorage.getItem("token");
    const result = await deleteClass(token, id);
    if (result.error) {
      alert(result.error);
      return;
    }
    loadClasses();
  }

  async function loadClasses() {
    const token = localStorage.getItem("token");
    const result = await getClasses(token);
    setClasses(result);
  }
  useEffect(() => {
    loadClasses();
  }, []);
  return (
    <div className="classes-page">
      <AdminNavbar />

      <div className="classes-page__container">
        <div className="classes-page__header">
          <div>
            <p className="classes-eyebrow">Admin / Directory</p>
            <h1 className="classes-title">Classes</h1>
          </div>
          <button
            className="classes-create-btn"
            onClick={() => {
              setShowForm(true);
            }}
          >
            Create Class
          </button>
        </div>

        {showForm && (
          <CreateClassForm
            assignment={null}
            onSubmit={createC}
            onCancel={() => setShowForm(false)}
            subjects={false}
          />
        )}
        {fromUpdate && (
          <CreateClassForm
            level={level}
            onSubmit={updateC}
            onCancel={() => setFromUpdate(false)}
            subjects={false}
          />
        )}

        <div className="classes-list">
          {classes.length === 0 && (
            <p className="classes-empty">No classes yet.</p>
          )}
          {classes.map((level) => (
            <div key={level.id} className="class-card">
              <p className="class-card__name">{level.name}</p>
              <div className="class-card__actions">
                <button
                  className="class-card__update-btn"
                  onClick={() => {
                    setLevel(level);
                    setFromUpdate(true);
                  }}
                >
                  Update
                </button>
                <button
                  className="class-card__delete-btn"
                  onClick={() => {
                    deleteC(level.id);
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
export default Classes;
