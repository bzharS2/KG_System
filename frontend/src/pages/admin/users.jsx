/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import UserForm from "../../components/UserForm";
import {
  getUsersByRole,
  getUsersByStatus,
  updateUser,
  createStaff,
  createStudent,
  createTeacher,
  getUsers,
  getClasses,
  getUserByName,
} from "../../services/api";

import "./Users.css";

function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [fromUpdate, setFromUpdate] = useState(false);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");

  async function loadUsers() {
    const token = localStorage.getItem("token");
     if (!token) {
      return navigate("/");
    }
    const result = await getUsers(token);
    setUsers(result);
  }
  async function loadClasses() {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/login");
    }
    const result = await getClasses(token);
    setClasses(result);
  }
  async function sortRole(role) {
    const token = localStorage.getItem("token");
     if (!token) {
      return navigate("/");
    }
    const result = await getUsersByRole(token, role);
    setUsers(result);
  }
  async function sortStatus(status) {
    const token = localStorage.getItem("token");
     if (!token) {
      return navigate("/");
    }
    const result = await getUsersByStatus(token, status);
    setUsers(result);
  }
  async function searchByName(name) {
    if (name.trim() === "") {
      loadUsers();
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate(`/`);
    }
    const result = await getUserByName(token, name);
    if (result.error) {
      alert(result.error);
      return;
    }
    setUsers(result);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
     if (!token) {
      return navigate("/");
    }
    loadClasses();
    loadUsers();
  }, []);

  async function createUser(fromData) {
    const token = localStorage.getItem("token");
     if (!token) {
      return navigate("/");
    }
    if (fromData.role == "student") {
      await createStudent(token, fromData);
    } else if (fromData.role == "teacher") {
      const result = await createTeacher(token, fromData);
      console.log(result);
    } else {
    await createStaff(token, fromData);
    }
    loadUsers();
  }
  async function update(fromData) {
    const id = fromData.id;
    const token = localStorage.getItem("token");
     if (!token) {
      return navigate("/");
    }
    const result = await updateUser(token, fromData, id);
    if (!result.message) {
      alert(`${result.error}`);
    }
    loadUsers();
    setShowForm(false);
    setFromUpdate(false);
  }

  return (
    <div className="users-page">
      <AdminNavbar />

      <div className="users-page__container">
        <div className="users-page__header">
          <div>
            <p className="users-eyebrow">Admin / Directory</p>
            <h1 className="users-title">Users</h1>
          </div>
          <button
            className="users-create-btn"
            onClick={() => {
              setShowForm(true);
            }}
          >
            Create User
          </button>
        </div>

        <div className="users-filter-bar">
          <div className="users-filter-group">
            <span className="users-filter-label">Status</span>
            <button
              className="filter-chip filter-chip--status-active"
              onClick={() => {
                sortStatus("active");
              }}
            >
              Active
            </button>
            <button
              className="filter-chip filter-chip--status-inactive"
              onClick={() => {
                sortStatus("inactive");
              }}
            >
              Inactive
            </button>
          </div>

          <div className="users-filter-divider" />

          <div className="users-filter-group">
            <span className="users-filter-label">Role</span>
            <button
              className="filter-chip filter-chip--role-teacher"
              onClick={() => {
                sortRole("teacher");
              }}
            >
              Teacher
            </button>
            <button
              className="filter-chip filter-chip--role-student"
              onClick={() => {
                sortRole("student");
              }}
            >
              Student
            </button>
            <button
              className="filter-chip filter-chip--role-staff"
              onClick={() => {
                sortRole("staff");
              }}
            >
              Staff
            </button>
          </div>

          <button
            className="users-filter-reset"
            onClick={() => {
              setSearch("");
              loadUsers();
            }}
          >
            Reset
          </button>
        </div>
        <input
          type="text"
          value={search}
          placeholder="search by name..."
          onChange={(e) => {
            setSearch(e.target.value);
            searchByName(e.target.value);
          }}
        />
        {showForm && (
          <UserForm
            user={null}
            classes={classes}
            onSubmit={createUser}
            onCancel={() => setShowForm(false)}
          />
        )}
        {fromUpdate && (
          <UserForm
            user={user}
            classes={classes}
            onSubmit={update}
            onCancel={() => {
              setShowForm(false);
              setFromUpdate(false);
            }}
          />
        )}

        <div className="users-list">
          {users.length === 0 && <p className="users-empty">No users found.</p>}
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <div className="user-card__main">
                <h2 className="user-card__name">{user.username}</h2>
                <p className="user-card__email">{user.email}</p>
              </div>
              <div className="user-card__meta">
                <span className={`user-badge user-badge--role-${user.role}`}>
                  {user.role}
                </span>
                <span
                  className={`user-badge user-badge--status-${user.status}`}
                >
                  {user.status}
                </span>
              </div>
              <button
                className="user-card__update-btn"
                onClick={() => {
                  setFromUpdate(true);
                  setUser(user);
                }}
              >
                Update
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Users;
