"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import styles from "./sidebar.module.css";

import { useMobileMenu } from "./MobileMenuContext";

export default function Sidebar() {
  const { isMobileMenuOpen, closeMobileMenu } = useMobileMenu();
  const pathname = usePathname();

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
  };

  return (
    <>
      {isMobileMenuOpen && (
        <div className={styles.mobileOverlay} onClick={closeMobileMenu}></div>
      )}
      <div className={`${styles.sidebar} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
        <div className={styles.header}>
        <h2>Dashboard</h2>
      </div>

      <nav className={styles.nav}>
        <Link href="/dashboard" className={pathname === "/dashboard" ? styles.navLinkActive : styles.navLink}>
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
        <Link href="/dashboard/showreel" className={pathname === "/dashboard/showreel" ? styles.navLinkActive : styles.navLink} onClick={closeMobileMenu}>
          <span>Watch Showreel</span>
        </Link>
        <Link href="/dashboard/skills" className={pathname === "/dashboard/skills" ? styles.navLinkActive : styles.navLink} onClick={closeMobileMenu}>
          <span>Skills</span>
        </Link>

        <hr className={styles.divider} />

        <Link href="/dashboard/socials" className={`${styles.navLinkSocials} ${pathname === "/dashboard/socials" ? styles.navLinkActive : ''}`} onClick={closeMobileMenu}>
          <i className="ri-links-line"></i>
          <span>Socials</span>
        </Link>
      </nav>

      <div className={styles.footer}>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <i className="ri-logout-box-line"></i>
          <span>Logout</span>
        </button>
      </div>
      </div>
    </>
  );
}
