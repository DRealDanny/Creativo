
"use client";

import { usePathname } from "next/navigation";
import { useMobileMenu } from "./MobileMenuContext";
import { useCommit } from "./CommitContext";
import styles from "./topbar.module.css";

export default function TopBar() {
  const { toggleMobileMenu } = useMobileMenu();
  const { pendingCommits, commitAll } = useCommit();
  const pathname = usePathname();

  const getPageTitle = () => {
    if (!pathname) return "Home";
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 1 && segments[0] === "dashboard") {
      return "Home";
    }
    // E.g., /dashboard/socials -> "socials"
    const lastSegment = segments[segments.length - 1];
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  };

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <button className={styles.mobileMenuBtn} onClick={toggleMobileMenu}>
          <i className="ri-menu-line"></i>
        </button>
        <h1 className={styles.title}>{getPageTitle()}</h1>
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
