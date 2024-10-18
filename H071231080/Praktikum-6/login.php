<?php
session_start();


// Data pengguna
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
    ],
];

// Proses login
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $usernameOrEmail = $_POST['username_email'];
    $password = $_POST['password'];

    foreach ($users as $user) {
        if (($user['email'] == $usernameOrEmail || $user['username'] == $usernameOrEmail) &&
            password_verify($password, $user['password'])) {
            $_SESSION['user'] = $user;
            header("Location: dashboard.php");
            exit;
        }
    }
    $error = "Invalid login credentials";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
    <title>Login</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Poppins', sans-serif;
            background-color: #fdd0d2;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .container {
            display: flex;
            width: 900px;
            height: 500px;
            box-shadow: 0 4px 12px rgba(255, 192, 203, 0.6);
            border-radius: 8px;
            overflow: hidden;
            margin: 60px;
        }
        .welcome-section {
            background-image: url(image/bg.jpeg);
            background-size: cover;
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #efa9a9;
            font-size: 24px;
            font-weight: bold;
            text-align: center;
        }
        .login-section {
            background-color: #fff;
            padding: 40px;
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .login-section h2 {
            margin-bottom: 20px;
            color: #333;
        }
        .login-section label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #555;
        }
        .login-section input[type="text"], 
        .login-section input[type="password"] {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
        }
        .login-section button {
            background-color: #f0bfc1;
            color: #ffff;
            padding: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            width: 100%;
        }
        .login-section button:hover {
            background-color: #b89597;
            color: #000;
        }
        .login-section .error {
            color: red;
            margin-top: 10px;
            font-size: 14px;
        }
        .login-section .signup {
            margin-top: 20px;
            font-size: 14px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="welcome-section">
            <p>Hy Welcome !</p>

        </div>
        <div class="login-section">
            <h2>Login</h2>
            <form method="post" action="">
                <label>Email or Username</label>
                <input type="text" name="username_email" required>

                <label>Password</label>
                <input type="password" name="password" required>

                <button type="submit">Login</button>
                <?php if (isset($error)) echo "<p class='error'>$error</p>"; ?>
            </form>
            
            <div class="signup">
                New User? <a href="#">Signup</a>
            </div>
        </div>
    </div>
</body>
</html>
