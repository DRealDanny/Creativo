<?php
session_start();

$request_uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Simple router based on the requested file or default to dashboard
if (strpos($request_uri, '/backend-admin/login') !== false) {
    if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
        header('Location: /backend-admin/dashboard.php');
        exit;
    }
    require_once 'login.php';
    exit;
}

if (strpos($request_uri, '/backend-admin/auth-handler.php') !== false) {
    require_once 'auth-handler.php';
    exit;
}

// All other routes within /backend-admin, require auth
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: /backend-admin/login.php');
    exit;
}

// If authenticated and no specific sub-page requested, default to dashboard
require_once 'dashboard.php';
exit;
