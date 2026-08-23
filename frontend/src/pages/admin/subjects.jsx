/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import {

  useNavigate,
} from "react-router-dom";
import { useEffect,  useState } from "react";
import {
  getSubjects,
  createSubjects,
  deleteSubjects,
  updateSubjects,
} from "../../services/api";
import AdminNavbar from "../../components/AdminNavbar";
import CreateClassForm from "../../components/CreateClassForm";

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [fromUpdate, setFromUpdate] = useState(false);
  const [subject, setSubject] = useState(null);

  async function loadSubjects() {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/");
    }
    const result = await getSubjects(token);
    setSubjects(result);
  }
  async function createSubject(data) {
    const token = localStorage.getItem("token");
     if (!token) {
      return navigate("/");
    }
    const result = await createSubjects(token, data);
    if (result.error) {
      alert(result.error);
      return;
    }
    loadSubjects();
  }
  async function updateSubject(data) {
    const id = data.id;
    const token = localStorage.getItem("token");
     if (!token) {
      return navigate("/");
    }
    const result = await updateSubjects(token, data, id);
    if (result.error) {
      alert(result.error);
      return;
    }
    loadSubjects();
  }
  async function deleteSubject(id) {
    const ans = window.confirm(`do you want to delete that class`);
    if (!ans) {
      return;
    }
    const token = localStorage.getItem("token");
     if (!token) {
      return navigate("/");
    }
    const result = await deleteSubjects(token, id);
    if (result.error) {
      alert(result.error);
      return;
    }
    loadSubjects();
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/");
    }
    loadSubjects();
  }, []);
  return (
    <div className="classes-page">
      <AdminNavbar />

      <div className="classes-page__container">
        <div className="classes-page__header">
          <div>
            <p className="classes-eyebrow">Admin / Directory</p>
            <h1 className="classes-title">Subjects</h1>
          </div>
          <button
            className="classes-create-btn"
            onClick={() => {
              setShowForm(true);
            }}
          >
            Create Subject
          </button>
        </div>

        {showForm && (
          <CreateClassForm
            level={null}
            onSubmit={createSubject}
            onCancel={() => setShowForm(false)}
            subjects={true}
          />
        )}
        {fromUpdate && (
          <CreateClassForm
            level={subject}
            onSubmit={updateSubject}
            onCancel={() => setFromUpdate(false)}
            subjects={true}
          />
        )}

        <div className="classes-list">
          {subjects.length === 0 && (
            <p className="classes-empty">No classes yet.</p>
          )}
          {subjects.map((subject) => (
            <div key={subject.id} className="class-card">
              <p className="class-card__name">{subject.name}</p>
              <div className="class-card__actions">
                <button
                  className="class-card__update-btn"
                  onClick={() => {
                    setSubject(subject);
                    setFromUpdate(true);
                  }}
                >
                  Update
                </button>
                <button
                  className="class-card__delete-btn"
                  onClick={() => {
                    deleteSubject(subject.id);
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

export default Subjects;
