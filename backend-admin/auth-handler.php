<?php
session_start();

// Handle Logout
if (isset($_GET['action']) && $_GET['action'] === 'logout') {
    $_SESSION = array();
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }
    session_destroy();
    header("Location: /backend-admin/login.php");
    exit;
}

// Handle Login
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    // Secure mock check as requested
    if ($username === 'Danny' && $password === 'Danny123') {
        // Regenerate session ID for security
        session_regenerate_id(true);
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_username'] = $username;

        header("Location: /backend-admin/dashboard.php");
        exit;
    } else {
        // Set error in session to display on login page
        $_SESSION['login_error'] = "Invalid username or password.";
        header("Location: /backend-admin/login.php");
        exit;
    }
}

// If accessed directly without POST or logout GET, redirect to login
header("Location: /backend-admin/login.php");
exit;
