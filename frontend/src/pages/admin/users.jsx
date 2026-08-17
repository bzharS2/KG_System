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
import { getUsers } from "../../services/api";
import AdminNavbar from "../../components/AdminNavbar";
import { getClasses } from "../../services/api";
import UserForm from "../../components/UserForm";
import { createStaff } from "../../services/api";
import { createStudent } from "../../services/api";
import { createTeacher } from "../../services/api";
import { updateUser } from "../../services/api";

function Users() {
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [fromUpdate, setFromUpdate] = useState(false);
  const [user, setUser] = useState("");
  async function loadUsers() {
    const token = localStorage.getItem("token");
    const result = await getUsers(token);
    setUsers(result);
  }
  async function loadClasses() {
    const token = localStorage.getItem("token");
    const result = await getClasses(token);
    setClasses(result);
  }

  useEffect(() => {
    loadClasses();
    loadUsers();
  }, []);

  async function createUser(fromData) {
    const token = localStorage.getItem("token");
    if (fromData.role == "student") {
      const result = await createStudent(token, fromData);
    } else if (fromData.role == "teacher") {
      const result = await createTeacher(token, fromData);
    } else {
      const result = await createStaff(token, fromData);
    }
    loadUsers();
  }
  async function update(fromData) {
    const id = fromData.id;
    const token = localStorage.getItem("token");
    const result = await updateUser(token, fromData, id);
    if (!result.message) {
      alert(`${result.error}`)
    }
    loadUsers();
    setShowForm(false);
    setFromUpdate(false);
  }

  return (
    <div>
      <AdminNavbar />

      <button
        onClick={() => {
          setShowForm(true);
        }}
      >
        Create-User
      </button>
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
      <h3>users: </h3>
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.username}</h2>
          <p>{user.email}</p>
          <p>{user.role}</p>
          <p>{user.status}</p>
          <button
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
  );
}

export default Users;
