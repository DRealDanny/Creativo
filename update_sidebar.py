import sys

def main():
    filepath = "admin/src/app/dashboard/components/Sidebar.tsx"
    with open(filepath, 'r') as f:
        content = f.read()

    search_str = """        <div className={styles.sectionHeading}>
          <i className="ri-briefcase-line"></i>
          <span>WORK</span>
        </div>"""

    replace_str = """        <div className={styles.sectionHeading}>
          <i className="ri-briefcase-line"></i>
          <span>WORK</span>
        </div>
        <Link href="/dashboard/work" className={pathname === "/dashboard/work" ? styles.navLinkActive : styles.navLink} onClick={closeMobileMenu}>
          <span>All Work</span>
        </Link>"""

    if search_str in content:
        new_content = content.replace(search_str, replace_str)
        with open(filepath, 'w') as f:
            f.write(new_content)
        print("Updated Sidebar.tsx")
    else:
        print("Could not find search string in Sidebar.tsx")

if __name__ == "__main__":
    main()
