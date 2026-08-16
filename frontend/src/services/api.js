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


export { login, getAdminDashboard, getUsers, getClasses,getSubjects,getAssignments };