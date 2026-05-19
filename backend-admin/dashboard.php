<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Security Check: Redirect to login if not authenticated
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: /backend-admin/login.php");
    exit;
}

$username = $_SESSION['admin_username'] ?? 'Linus';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/backend-admin/admin-style.css">
</head>
<body class="dashboard-body">

    <!-- Mobile Header -->
    <header class="mobile-header">
        <div class="brand-logo">CMS<span>Pro</span></div>
        <button class="hamburger-menu" id="hamburgerMenu" aria-label="Toggle Menu">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
    </header>

    <!-- Sidebar Navigation -->
    <aside class="dashboard-sidebar" id="dashboardSidebar">
        <div class="sidebar-header">
            <div class="brand-logo">CMS<span>Pro</span></div>
            <button class="close-menu" id="closeMenu" aria-label="Close Menu">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        </div>

        <nav class="sidebar-nav">
            <ul>
                <li>
                    <a href="#" class="nav-item active">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                        Overview
                    </a>
                </li>
                <li>
                    <a href="#" class="nav-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                        Content Library
                    </a>
                </li>
                <li>
                    <a href="#" class="nav-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        Content Editor
                    </a>
                </li>
                <li>
                    <a href="#" class="nav-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                        Assets Manager
                    </a>
                </li>
                <li>
                    <a href="#" class="nav-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                        Settings
                    </a>
                </li>
            </ul>
        </nav>

        <div class="sidebar-footer">
            <div class="user-profile">
                <div class="user-avatar">
                    <span>L</span>
                </div>
                <div class="user-info">
                    <span class="user-name"><?php echo htmlspecialchars($username); ?></span>
                    <span class="user-role">Administrator</span>
                </div>
            </div>
            <a href="/backend-admin/auth-handler.php?action=logout" class="logout-link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                Logout
            </a>
        </div>
    </aside>

    <!-- Main Content Frame -->
    <main class="dashboard-main">
        <!-- Top Navbar -->
        <div class="top-navbar">
            <div class="breadcrumb">
                <span class="breadcrumb-item">Workspace</span>
                <span class="breadcrumb-separator">/</span>
                <span class="breadcrumb-item active">Overview</span>
            </div>

            <div class="search-container">
                <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input type="text" class="search-input" placeholder="Search resources...">
            </div>
        </div>

        <!-- Bento Grid Structure -->
        <div class="dashboard-content">
            <div class="bento-grid">
                <!-- Content Cards as Visual Guides -->
                <div class="bento-card bento-hero">
                    <h3>Recent Activity</h3>
                    <div class="placeholder-content"></div>
                </div>

                <div class="bento-card">
                    <h3>Quick Stats</h3>
                    <div class="placeholder-content"></div>
                </div>

                <div class="bento-card">
                    <h3>System Health</h3>
                    <div class="placeholder-content"></div>
                </div>

                <div class="bento-card bento-wide">
                    <h3>Latest Publications</h3>
                    <div class="placeholder-content"></div>
                </div>

                <div class="bento-card">
                    <h3>User Growth</h3>
                    <div class="placeholder-content"></div>
                </div>

                <div class="bento-card">
                    <h3>Server Load</h3>
                    <div class="placeholder-content"></div>
                </div>
            </div>
        </div>
    </main>

    <div class="sidebar-overlay" id="sidebarOverlay"></div>

    <script>
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        const closeMenu = document.getElementById('closeMenu');
        const dashboardSidebar = document.getElementById('dashboardSidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');

        function toggleSidebar() {
            dashboardSidebar.classList.toggle('active');
            sidebarOverlay.classList.toggle('active');
            document.body.classList.toggle('sidebar-open');
        }

        hamburgerMenu.addEventListener('click', toggleSidebar);
        closeMenu.addEventListener('click', toggleSidebar);
        sidebarOverlay.addEventListener('click', toggleSidebar);
    </script>
</body>
</html>