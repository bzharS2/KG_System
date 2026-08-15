import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication */}
        <Route path="/login" element={<LoginPage/>} />

        {/* Admin */}
        <Route path="/admin/dashboard" element={<h1>Admin Dashboard</h1>} />
        <Route path="/admin/users" element={<h1>Users</h1>} />
        <Route path="/admin/classes" element={<h1>Classes</h1>} />
        <Route path="/admin/subjects" element={<h1>Subjects</h1>} />
        <Route
          path="/admin/assignments"
          element={<h1>Teaching Assignments</h1>}
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