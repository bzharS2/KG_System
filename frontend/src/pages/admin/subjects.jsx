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
import { getSubjects } from "../../services/api";
import AdminNavbar from "../../components/AdminNavbar";
function Subjects() {
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    async function loadClasses() {
      const token = localStorage.getItem("token");
      const result = await getSubjects(token);
      setSubjects(result);
    }
    loadClasses();
  }, []);
  return (
    <div>
      <AdminNavbar />
      subjects:
      {subjects.map((subject) => (
        <div key={subject.id}>
          <h2>{subject.name}</h2>
          </div>
      ))}
    </div>
  );
}

export default Subjects;
