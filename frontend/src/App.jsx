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
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentSubject from "./pages/student/StudentSubject";
import StudentEvaluation from "./pages/student/StudentEvaluation";
function App() {
  var shit;
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<LoginPage />} />

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
        <Route path="/student/dashboard" element={<StudentDashboard/>} />
        <Route path="/student/subjects" element={<StudentSubject/>} />
        <Route path="/student/evaluations" element={<StudentEvaluation/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
