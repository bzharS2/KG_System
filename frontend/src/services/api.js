/* eslint-disable no-unused-vars */
async function login(email, password) {
  const response = await fetch("http://localhost:5000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();
  return data;

}
async function getAdminDashboard(token) {
  const response = await fetch("http://localhost:5000/admin/dashboard", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  })
  const data = await response.json();
  return data
}
async function getUsers(token) {
  const response = await fetch("http://localhost:5000/admin/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  })
  const data = await response.json();
  return data
}
async function getClasses(token) {
  const response = await fetch("http://localhost:5000/admin/classes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  })
  const data = await response.json();
  return data;
}
async function getSubjects(token) {
  const response = await fetch("http://localhost:5000/admin/subjects", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  })
  const data = await response.json();
  return data;
}

async function getAssignments(token) {
  const response = await fetch("http://localhost:5000/admin/teacher_assignments", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  })
  const data = await response.json();
  return data;
}
async function createStudent(token, formData) {
  const response = await fetch("http://localhost:5000/admin/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }, body: JSON.stringify({
      Username: formData.username,
      Email: formData.email,
      Password: formData.password,
      DoB: formData.date_of_birth,
      Class_id: formData.class_id
    })
  })
  const data = await response.json();
  return data;
}
async function createTeacher(token, formData) {
  const response = await fetch("http://localhost:5000/admin/teacher", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }, body: JSON.stringify({
      Username: formData.username,
      Email: formData.email,
      Password: formData.password,
      DoB: formData.date_of_birth,
    })
  })
  const data = await response.json();
  return data;
}
async function createStaff(token, formData) {
  const response = await fetch("http://localhost:5000/admin/staff", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }, body: JSON.stringify({
      Username: formData.username,
      Email: formData.email,
      Password: formData.password,
      DoB: formData.date_of_birth,
    })
  })
  const data = await response.json();
  return data;
}
async function updateUser(token, formData, id) {
  const response = await fetch(`http://localhost:5000/admin/updateUser/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }, body: JSON.stringify({
      username: formData.username,
      email: formData.email,
      role: formData.role,
      password: formData.password,
      date_of_birth: formData.date_of_birth,
      status: formData.status
    })
  })
  const data = await response.json();
  return data;
}
async function getUsersByRole(token, role) {
  const response = await fetch(`http://localhost:5000/admin/user/sort/role/${role}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  })
  const data = await response.json();
  return data
}
async function getUsersByStatus(token, status) {
  const response = await fetch(`http://localhost:5000/admin/user/sort/status/${status}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },

  })
  const data = await response.json();
  return data
}
async function createClass(token, className) {
  const response = await fetch("http://localhost:5000/admin/createClass", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }, body: JSON.stringify({
      name: className.name
    })
  })
  const data = await response.json();
  return data;
}
async function deleteClass(token, id) {
  const response = await fetch(`http://localhost:5000/admin/class/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json();
  return data;
}
async function updateClass(token, formData, id) {
  const response = await fetch(`http://localhost:5000/admin/class/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }, body: JSON.stringify({
      name: formData.name
    })
  })
  const data = await response.json();
  return data;
}
async function createSubjects(token, className) {
  const response = await fetch("http://localhost:5000/admin/subjects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }, body: JSON.stringify({
      name: className.name
    })
  })
  const data = await response.json();
  return data;
}
async function deleteSubjects(token, id) {
  const response = await fetch(`http://localhost:5000/admin/subjects/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json();
  return data;
}
async function updateSubjects(token, formData, id) {
  const response = await fetch(`http://localhost:5000/admin/subjects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }, body: JSON.stringify({
      name: formData.name
    })
  })
  const data = await response.json();
  return data
}
async function getTeachers(token) {
  const response = await fetch("http://localhost:5000/admin/teachers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  })
  const data = await response.json();
  return data;
}
async function createAssignment(token, values) {
  const response = await fetch("http://localhost:5000/admin/teacher_assignments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }, body: JSON.stringify({

      teacher_id: values.teacher_id,
      subject_id: values.subject_id,
      class_id: values.class_id
    })
  })
  const data = await response.json();
  return data;
}
async function deleteAssignment(token, id) {
  const response = await fetch(`http://localhost:5000/admin/teacher_assignments/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json();
  return data;
}
async function updateAssignment(token, formData, id) {
  const response = await fetch(`http://localhost:5000/admin/teacher_assignments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }, body: JSON.stringify({
      teacher_id: formData.teacher_id,
      subject_id:formData.subject_id,
      class_id:formData.class_id
    })
  })
  const data = await response.json();
  return data;
}
async function getEvaluations(token) {
  const response = await fetch("http://localhost:5000/admin/evaluations", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  })
  const data = await response.json();
  return data;
}
async function getActiveStudents(token) {
  const response = await fetch("http://localhost:5000/admin/statistics/active-students", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  })
  const data = await response.json();
  return data;
}
async function getActiveTeacher(token) {
  const response = await fetch("http://localhost:5000/admin/statistics/active-teachers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  })
  const data = await response.json();
  return data;
}
async function getActiveStaff(token) {
  const response = await fetch("http://localhost:5000/admin/statistics/active-staff", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  })
  const data = await response.json();
  return data;
}
export {
  login,
  getAdminDashboard,
  getUsers,
  getClasses,
  getSubjects,
  getAssignments,
  createStaff,
  createStudent,
  createTeacher,
  updateUser,
  getUsersByRole,
  getUsersByStatus,
  createClass,
  deleteClass,
  updateClass,
  createSubjects,
  deleteSubjects,
  updateSubjects,
  getTeachers,
  createAssignment,
  deleteAssignment,
  updateAssignment,
  getEvaluations,
  getActiveStaff,
  getActiveStudents,
  getActiveTeacher
}