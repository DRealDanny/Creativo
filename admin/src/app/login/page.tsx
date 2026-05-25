'use client';

import React, { useState } from 'react';
import styles from './login.module.css';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>
          sign in to access your website content management system and control changes
        </p>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" className={styles.input} />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className={styles.input}
              />
              <button
                type="button"
                className={styles.toggleButton}
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
              </button>
            </div>
          </div>

          <button type="submit" className={styles.primaryButton}>Log In</button>
        </form>

        <div className={styles.divider}>
          <span className={styles.dividerLine}></span>
          <span className={styles.dividerText}>Or</span>
          <span className={styles.dividerLine}></span>
        </div>

        <button type="button" className={styles.secondaryButton}>
          <i className="ri-google-fill"></i> Sign In with Google
        </button>
      </div>
    </div>
  );
}
