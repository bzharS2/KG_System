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
import {getAdminDashboard} from "../../services/api";

function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadDashboard() {
      const token = localStorage.getItem("token");

      const result = await getAdminDashboard(token);

      console.log(result);
      setData(result);
    }

    loadDashboard();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {data && <p>students: {data.students}
        teachers: {data.teachers}
        staff: {data.staff}
        classes: {data.classes}
        </p>}
    </div>
  );
}
export default AdminDashboard;
