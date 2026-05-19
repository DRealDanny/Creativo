<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Security Check: Redirect to login if not authenticated
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: /backend-admin/login.php");
    exit;
}

$username = $_SESSION['admin_username'] ?? 'Admin';
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
    <style>
        /* Basic stub styling for the dashboard shell */
        body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f8f8f8;
            color: #333;
        }

        .dashboard-header {
            background-color: #fff;
            padding: 1.5rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #eee;
        }

        .dashboard-header h1 {
            font-family: 'Playfair Display', serif;
            margin: 0;
            font-size: 1.5rem;
        }

        .logout-btn {
            background-color: #2060FF; /* Using standard brand blue here */
            color: white;
            padding: 0.5rem 1rem;
            text-decoration: none;
            border-radius: 50px;
            font-size: 0.875rem;
            font-weight: 500;
            transition: background-color 0.2s ease;
        }

        .logout-btn:hover {
            background-color: #5285FF;
        }

        .dashboard-content {
            padding: 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }

        .welcome-card {
            background: #fff;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
    </style>
</head>
<body>

    <header class="dashboard-header">
        <h1>Headless CMS Workspace</h1>
        <a href="/backend-admin/auth-handler.php?action=logout" class="logout-btn">Logout</a>
    </header>

    <main class="dashboard-content">
        <div class="welcome-card">
            <h2>Welcome back, <?php echo htmlspecialchars($username); ?>!</h2>
            <p>This is the new decoupled Headless CMS admin workspace.</p>
        </div>
    </main>

</body>
</html>
