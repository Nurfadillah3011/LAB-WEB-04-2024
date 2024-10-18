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
    ],
];

function authenticate($email_or_username, $password, $users) {
    foreach ($users as $user) {
        if (($user['email'] === $email_or_username || $user['username'] === $email_or_username) && password_verify($password, $user['password'])) {
            return $user;
        }
    }
    return null;
}

if (isset($_POST['login'])) {
    $email_or_username = $_POST['email_or_username'];
    $password = $_POST['password'];
    $user = authenticate($email_or_username, $password, $users);
    if ($user) {
        $_SESSION['user'] = $user;
        header('Location: dashboard.php');
        exit();
    } else {
        $error = "Email/Username atau Password salah!";
    }
}

if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: index.php');
    exit();
}
?>

<!-- Halaman Login -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f7f7f7;
        }
        .container {
            max-width: 400px;
            margin: 100px auto;
            background-color: #fff;
            padding: 20px;
            box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
        }
        h1 {
            text-align: center;
            font-size: 24px;
        }
        input[type="text"], input[type="password"] {
            width: 100%;
            padding: 5px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        input[type="submit"] {
            width: 100%;
            padding: 10px;
            background-color: blue;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        input[type="submit"]:hover {
            background-color: lightblue;
        }
        .error {
            color: red;
            text-align: center;
        }
        .link {
            text-align: center;
            margin-top: 20px;
            text-decoration: underline;
            color : blue;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>LOGIN</h1>
        <form action="index.php" method="post">
            <input type="text" name="email_or_username" placeholder="Email or Username" required>
            <input type="password" name="password" placeholder="Password" required>
            <input type="submit" name="login" value="Submit">
            <?php if (isset($error)) : ?>
                <p class="error"><?= $error ?></p>
            <?php endif; ?>
        </form>
        <div class="link">
            <p>Don't have an account? Register here.</p>
        </div>
    </div>
</body>
</html>
