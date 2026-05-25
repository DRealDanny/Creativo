import { Plus_Jakarta_Sans } from "next/font/google";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import { MobileMenuProvider } from "./components/MobileMenuContext";
import { ToastProvider } from "../../components/Toast/ToastContext";
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
    <ToastProvider>
      <MobileMenuProvider>
        <div className={`${styles.layoutWrapper} ${plusJakartaSans.variable}`}>
          <Sidebar />
          <main className={styles.mainColumn}>
            <TopBar />
            <div className={styles.content}>
              {children}
            </div>
          </main>
        </div>
      </MobileMenuProvider>
    </ToastProvider>
  );
}
