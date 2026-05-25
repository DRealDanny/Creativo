import { Plus_Jakarta_Sans } from "next/font/google";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import styles from "./layout.module.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${styles.layoutWrapper} ${plusJakartaSans.variable}`}>
      <aside className={styles.sidebarColumn}>
        <Sidebar />
      </aside>
      <main className={styles.mainColumn}>
        <TopBar />
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
}
