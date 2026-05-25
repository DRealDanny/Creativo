import styles from "./topbar.module.css";

export default function TopBar() {
  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <button className={styles.mobileMenuBtn}>
          <i className="ri-menu-line"></i>
        </button>
        <h1 className={styles.title}>Home</h1>
      </div>
      <div className={styles.right}>
        <div className={styles.userProfile}>
          <i className="ri-user-line"></i>
          <span>Danny</span>
        </div>
      </div>
    </header>
  );
}
