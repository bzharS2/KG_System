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
import { getClasses } from "../../services/api";
import AdminNavbar from "../../components/AdminNavbar";
function Classes() {
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    async function loadClasses() {
      const token = localStorage.getItem("token");
      const result = await getClasses(token);
      setClasses(result);
    }
    loadClasses();
  }, []);
  return (
    <div>
      <AdminNavbar />

      {classes.map((level) => (
        <div key={level.id}>
          <p>{level.name}</p>
        </div>
      ))}
    </div>
  );
}
export default Classes;
