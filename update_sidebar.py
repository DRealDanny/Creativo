import re

with open('admin/src/app/dashboard/components/Sidebar.tsx', 'r') as f:
    content = f.read()

content = content.replace('''<Link href="#" className={styles.navLink}>
          <span>Skills</span>
        </Link>''', '''<Link href="/dashboard/skills" className={pathname === "/dashboard/skills" ? styles.navLinkActive : styles.navLink} onClick={closeMobileMenu}>
          <span>Skills</span>
        </Link>''')

with open('admin/src/app/dashboard/components/Sidebar.tsx', 'w') as f:
    f.write(content)
