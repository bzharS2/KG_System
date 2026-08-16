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
import { getAdminDashboard } from "../../services/api";

function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadDashboard() {
      const token = localStorage.getItem("token");

      const result = await getAdminDashboard(token);

      setData(result);
    }

    loadDashboard();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {data && (
        <p>
          <ul>
            <li>students: {data.students}</li>
            <li>teachers: {data.teachers}</li>
            <li>staff: {data.staff}</li>
            <li>classes: {data.classes}</li>
          </ul>
        </p>
      )}

      
    </div>
  );
}
export default AdminDashboard;
