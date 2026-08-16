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

function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function loadUsers() {
      const token = localStorage.getItem("token");
      const result = await getUsers(token);
      setUsers(result);
    }
    loadUsers();
  }, []);
  return (
    <div>
      <h3>users: </h3>
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.username}</h2>
          <p>{user.email}</p>
          <p>{user.role}</p>
          <p>{user.status}</p>
        </div>
      ))}
    </div>
  );
}

export default Users;
