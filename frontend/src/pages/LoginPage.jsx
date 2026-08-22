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
import { login } from "../services/api";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const data = await login(email, password);
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.role == "admin") {
        return navigate("/admin/dashboard");
      } else if (data.role == "student") {
        return navigate("/student/dashboard");
      } else if (data.role == "teacher") {
        return navigate("/teacher/dashboard");
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }


  return (
    <div className="login-page">
      <div className="login-card">
        <aside className="login-card__tab" aria-hidden="true">
          <span className="login-card__tab-mark">01</span>
          <span className="login-card__tab-role">Student</span>
          <span className="login-card__tab-divider" />
          <span className="login-card__tab-mark">02</span>
          <span className="login-card__tab-role">Teacher</span>
          <span className="login-card__tab-divider" />
          <span className="login-card__tab-mark">03</span>
          <span className="login-card__tab-role">Admin</span>
        </aside>

        <div className="login-card__body">
          <p className="login-eyebrow">Sign in</p>
          <h1 className="login-title">Welcome back</h1>
          <p className="login-subtitle">
            One login, three portals. We'll route you to the right one.
          </p>

          <form className="login-form" onSubmit={handleLogin} noValidate>
            <div className="login-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@school.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="login-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="login-error" role="alert">
                {error}
              </p>
            )}

            <button
              className="login-submit"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
