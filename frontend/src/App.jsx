/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/admin/dashboard";
import Users from "./pages/admin/users";
import Classes from "./pages/admin/classes";
import Subjects from "./pages/admin/subjects";
import Assignments from "./pages/admin/assignments";
import Evaluations from "./pages/admin/Evaluations";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import Students from "./pages/teacher/students";
import TeacherEvaluations from "./pages/teacher/teacherEvaluations";
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
        <Route path="/admin/classes" element={<Classes />} />
        <Route path="/admin/subjects" element={<Subjects />} />
        <Route path="/admin/assignments" element={<Assignments />} />
        <Route path="/admin/evaluations" element={<Evaluations />} />

        {/* Teacher */}
        <Route path="/teacher/dashboard" element={<TeacherDashboard/>} />
        <Route path="/teacher/students" element={<Students/>} />
        <Route path="/teacher/evaluations" element={<TeacherEvaluations/>} />

        {/* Student */}
        <Route path="/student/dashboard" element={<h1>Student Dashboard</h1>} />
        <Route path="/student/subjects" element={<h1>Subjects</h1>} />
        <Route path="/student/evaluations" element={<h1>Evaluations</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
