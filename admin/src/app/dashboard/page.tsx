import styles from "./page.module.css";

export default function DashboardPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.card}>
        <p className={styles.placeholderText}>
          Welcome home, Danny. Select a module from the sidebar to begin editing.
        </p>
      </div>
    </div>
  );
}
