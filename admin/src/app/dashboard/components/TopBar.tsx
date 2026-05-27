
"use client";

import { useMobileMenu } from "./MobileMenuContext";
import { useCommit } from "./CommitContext";
import styles from "./topbar.module.css";

export default function TopBar() {
  const { toggleMobileMenu } = useMobileMenu();
  const { pendingCommits, commitAll } = useCommit();

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <button className={styles.mobileMenuBtn} onClick={toggleMobileMenu}>
          <i className="ri-menu-line"></i>
        </button>
        <h1 className={styles.title}>Home</h1>
      </div>
      <div className={styles.right}>
        <button
          className={`${styles.commitAllButton} ${pendingCommits > 1 ? styles.active : ''}`}
          disabled={pendingCommits <= 1}
          onClick={commitAll}
        >
          Commit All {pendingCommits > 0 ? `(${pendingCommits})` : ''}
        </button>
        <div className={styles.userProfile}>
          <i className="ri-user-line"></i>
          <span>Danny</span>
        </div>
      </div>
    </header>
  );
}
