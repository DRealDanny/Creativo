import Link from "next/link";
import styles from "./sidebar.module.css";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h2>Dashboard</h2>
      </div>

      <nav className={styles.nav}>
        <Link href="/dashboard" className={styles.navLinkActive}>
          <i className="ri-home-5-line"></i>
          <span>Home</span>
        </Link>

        <hr className={styles.divider} />

        <div className={styles.sectionHeading}>
          <i className="ri-briefcase-line"></i>
          <span>WORK</span>
        </div>
        <Link href="#" className={styles.navLink}>
          <span>Branding</span>
        </Link>
        <Link href="#" className={styles.navLink}>
          <span>Web Development</span>
        </Link>
        <Link href="#" className={styles.navLink}>
          <span>Video Editing</span>
        </Link>

        <hr className={styles.divider} />

        <div className={styles.sectionHeading}>
          <i className="ri-user-settings-line"></i>
          <span>PROFILE</span>
        </div>
        <Link href="#" className={styles.navLink}>
          <span>Profile Picture</span>
        </Link>
        <Link href="#" className={styles.navLink}>
          <span>Watch Showreel</span>
        </Link>
        <Link href="#" className={styles.navLink}>
          <span>Skills</span>
        </Link>

        <hr className={styles.divider} />

        <Link href="#" className={styles.navLinkBold}>
          <span>Socials</span>
        </Link>
      </nav>

      <div className={styles.footer}>
        <button className={styles.logoutBtn}>
          <i className="ri-logout-box-line"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
