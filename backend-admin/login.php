<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Check if already logged in
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header('Location: /backend-admin/dashboard.php');
    exit;
}

$error_msg = '';
if (isset($_SESSION['login_error'])) {
    $error_msg = $_SESSION['login_error'];
    unset($_SESSION['login_error']); // Clear after reading
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login</title>
    <!-- Importing fonts as per instructions (high-contrast serif for headings, sans-serif for inputs) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/backend-admin/admin-style.css">
</head>
<body>

<div class="login-container">
    <!-- Form Panel -->
    <div class="login-form-panel">
        <header>
            <h1>Welcome back!</h1>
            <p>Login to make changes on website</p>
        </header>

        <form action="/backend-admin/auth-handler.php" method="POST">
            <?php if ($error_msg): ?>
                <div class="error-msg show"><?php echo htmlspecialchars($error_msg); ?></div>
            <?php endif; ?>

            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" class="form-input" placeholder="Danny" required autocomplete="username">
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" class="form-input" placeholder="Enter password" required autocomplete="current-password">
                <button type="button" class="password-toggle" id="togglePassword" aria-label="Toggle password visibility">
                    <!-- Eye icon SVG -->
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                </button>
            </div>

            <button type="submit" class="btn-submit">Login</button>
        </form>
    </div>

    <!-- Visual Art Panel -->
    <div class="login-visual-panel">
        <div class="visual-art-bg"></div>
    </div>
</div>

<script>
    // Simple password toggle logic
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    togglePassword.addEventListener('click', function (e) {
        // Toggle the type attribute
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        // Optional: change icon based on state
        if(type === 'text') {
            this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
        } else {
            this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
        }
    });
</script>
</body>
</html>
