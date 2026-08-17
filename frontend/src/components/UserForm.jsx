/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import "./UserForm.css";
function UserForm({ user, classes, onSubmit, onCancel }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [status, setStatus] = useState("active");
  const [classId, setClassId] = useState("");

  // If user exists, we're editing
  useEffect(() => {
    if (user) {
      const formattedDate = user.date_of_birth.split("T")[0];

      setUsername(user.username || "");
      setEmail(user.email || "");
      setRole(user.role || "student");
      setDateOfBirth(formattedDate || "");
      setStatus(user.status || "active");
      setClassId(user.class_id || "");
      setPassword("");
    } else {
      setUsername("");
      setEmail("");
      setPassword("");
      setRole("student");
      setDateOfBirth("");
      setStatus("active");
      setClassId("");
    }
  }, [user]);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      id: user?.id,
      username,
      email,
      password,
      role,
      date_of_birth: dateOfBirth,
      status,
      class_id: classId,
    };

    await onSubmit(formData);
  }

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="user-form__header">
        <span className="user-form__tag">{user ? "EDIT" : "NEW"}</span>
        <h2 className="user-form__title">
          {user ? "Update User" : "Create User"}
        </h2>
      </div>

      <div className="user-form__grid">
        <div className="user-form__field">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="user-form__field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="user-form__field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={user ? "Leave empty to keep current password" : ""}
          />
        </div>

        <div className="user-form__field">
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="user-form__field">
          <label>Date of birth</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>

        <div className="user-form__field">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {role === "student" && (
          <div className="user-form__field">
            <label>Class</label>
            <select
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
            >
              <option value="">Select a class</option>
              {classes.map((classItem) => (
                <option key={classItem.id} value={classItem.id}>
                  {classItem.name}
                </option>
              ))}
            </select>
          </div>
        )}
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
          {user ? "Update User" : "Create User"}
        </button>
      </div>
    </form>
  );
}

export default UserForm;
