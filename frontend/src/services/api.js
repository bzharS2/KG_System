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
  const response= await fetch("http://localhost:5000/admin/dashboard", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization :`Bearer ${token}` 
    },
  })
  const data = await response.json();
  return data
}

export {login,getAdminDashboard};