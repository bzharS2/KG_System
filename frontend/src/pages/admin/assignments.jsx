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
import { getAssignments } from "../../services/api";

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  useEffect(() => {
    async function loadAssignments() {
      const token = localStorage.getItem("token");
      const result = await getAssignments(token);
      setAssignments(result);
    }
    loadAssignments();
  }, []);
  return (
    <div>
      {assignments.map((assignment) => (
        <div key={assignment.id}>
          <h1>{assignment.teacher}</h1>
          <h1>{assignment.subject}</h1>
          <h1>{assignment.class}</h1>
        </div>
      ))}
    </div>
  );
}
export default Assignments;
