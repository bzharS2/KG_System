/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/admin/dashboard";
import Users from "./pages/admin/users";
import Classes from "./pages/admin/classes";
import Subjects from "./pages/admin/subjects";
import Assignments from "./pages/admin/assignments";

function App() {
  var shit;
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication */}
        <Route path="/login" element={<LoginPage />} />

        {/* Admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/classes" element={<Classes/>} />
        <Route path="/admin/subjects" element={<Subjects/>} />
        <Route
          path="/admin/assignments"
          element={< Assignments/>}
        />

        {/* Teacher */}
        <Route path="/teacher/dashboard" element={<h1>Teacher Dashboard</h1>} />
        <Route path="/teacher/students" element={<h1>Students</h1>} />
        <Route path="/teacher/evaluations" element={<h1>Evaluations</h1>} />

        {/* Student */}
        <Route path="/student/dashboard" element={<h1>Student Dashboard</h1>} />
        <Route path="/student/subjects" element={<h1>Subjects</h1>} />
        <Route path="/student/evaluations" element={<h1>Evaluations</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
