"use client";

import { useState } from "react";
import styles from "./login.module.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container}>
      <div className={styles.glassPanel}>
        <div className={styles.logo}>
          <i className="ri-sun-line"></i>
        </div>

        <h1 className={styles.title}>Welcome back!</h1>
        <p className={styles.subtitle}>
          Sign in to access your guided meditations, daily practices,<br />and personal journey
        </p>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              className={styles.input}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className={styles.input}
                placeholder="••••••"
                required
              />
              <button
                type="button"
                className={styles.toggleVisibility}
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"}></i>
              </button>
            </div>
          </div>

          <div className={styles.optionsRow}>
            <label className={styles.rememberMe}>
              <input type="checkbox" className={styles.checkbox} defaultChecked />
              <span className={styles.checkboxLabel}>Remember me</span>
            </label>
            <a href="#" className={styles.forgotPassword}>Forgot password?</a>
          </div>

          <button type="submit" className={styles.loginBtn}>
            Log In
          </button>
        </form>

        <div className={styles.divider}>
          <span>Or</span>
        </div>

        <button type="button" className={styles.googleBtn}>
          <i className="ri-google-fill"></i> Sign In with Google
        </button>

        <p className={styles.signupText}>
          Don't have an account? <a href="#" className={styles.signupLink}>Sign Up</a>
        </p>
      </div>
    </div>
  );
}
