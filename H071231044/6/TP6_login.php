<?php
session_start();
$users = [
    [
        'email' => 'admin@gmail.com',
        'username' => 'adminxxx',
        'name' => 'Admin',
        'password' => password_hash('admin123', PASSWORD_DEFAULT),
    ],
    [
        'email' => 'nanda@gmail.com',
        'username' => 'nanda_aja',
        'name' => 'Wd. Ananda Lesmono',
        'password' => password_hash('nanda123', PASSWORD_DEFAULT),
        'gender' => 'Female',
        'faculty' => 'MIPA',
        'batch' => '2021',
    ],
    [
        'email' => 'arif@gmail.com',
        'username' => 'arif_nich',
        'name' => 'Muhammad Arief',
        'password' => password_hash('arief123', PASSWORD_DEFAULT),
        'gender' => 'Male',
        'faculty' => 'Hukum',
        'batch' => '2021',
    ],
    [
        'email' => 'eka@gmail.com',
        'username' => 'eka59',
        'name' => 'Eka Hanny',
        'password' => password_hash('eka123', PASSWORD_DEFAULT),
        'gender' => 'Female',
        'faculty' => 'Keperawatan',
        'batch' => '2021',
    ],
    [
        'email' => 'adnan@gmail.com',
        'username' => 'adnan72',
        'name' => 'Adnan',
        'password' => password_hash('adnan123', PASSWORD_DEFAULT),
        'gender' => 'Male',
        'faculty' => 'Teknik',
        'batch' => '2020',
    ]
];

// Jika sudah login, redirect ke dashboard
if (isset($_SESSION['user'])) {
    header('Location: TP6_Dash.php');
    exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = $_POST['login'];
    $password = $_POST['password'];

    foreach ($users as $user) {
        if (($user['email'] === $input || $user['username'] === $input) && password_verify($password, $user['password'])) {
            $_SESSION['user'] = $user;
            header('Location: TP6_Dash.php');
            exit;
        }
    }

    $error = 'Invalid email/username or password';
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="login-container">
        <h2>Login</h2>
        <form method="POST" action="TP6_Login.php">
            <input type="text" name="login" placeholder="Email or Username" required>
            <input type="password" name="password" placeholder="Password" required>
            <?php if ($error): ?>
                <p class="error"><?= $error ?></p>
            <?php endif; ?>
            <button type="submit">Login</button>
        </form>
    </div>
</body>
</html>
