import React from 'react';
import styles from './Toast.module.css';

interface ToastProps {
  variant: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
}

const Toast: React.FC<ToastProps> = ({ variant, title, message }) => {
  return (
    <div className={`${styles.toast} ${styles[variant]}`}>
      <div className={styles.icon}>
        {variant === 'success' && <i className="ri-checkbox-circle-fill"></i>}
        {variant === 'error' && <i className="ri-error-warning-fill"></i>}
        {variant === 'warning' && <i className="ri-alert-fill"></i>}
        {variant === 'info' && <i className="ri-information-fill"></i>}
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.message}>{message}</div>
      </div>
    </div>
  );
};

export default Toast;
