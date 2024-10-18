<?php
session_start();

if (isset($_GET['logout']) && $_GET['logout'] === 'true') {
    session_destroy();
    header('Location: index.php');
    exit();
}

if (!isset($_SESSION['user'])) {
    header('Location: index.php');
    exit();
}

$current_user = $_SESSION['user'];

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
?>

<!-- Halaman Dashboard -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f7f7f7;
        }
        .container {
            max-width: 800px;
            margin: 50px auto;
            background-color: #fff;
            padding: 20px;
            box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
        }
        h1, h2 {
            text-align: center;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        table, th, td {
            border: 1px solid #ccc;
        }
        th, td {
            padding: 10px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        .logout {
            text-align: center;
            margin-top: 20px;
        }
        .logout a {
            background-color: #d9534f;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
        }
        .logout a:hover {
            background-color: #c9302c;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome, <?= $current_user['name'] ?>!</h1>
        <p>Email: <?= $current_user['email'] ?></p>
        <p>Username: <?= $current_user['username'] ?></p>

        <!-- Jika admin yang login -->
        <?php if ($current_user['username'] === 'adminxxx') : ?>
            <h2>All Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Gender</th>
                        <th>Faculty</th>
                        <th>Batch</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($users as $user) : ?>
                        <!-- Jangan tampilkan admin dalam daftar pengguna -->
                        <?php if ($user['username'] !== 'adminxxx') : ?>
                            <tr>
                                <td><?= $user['name'] ?></td>
                                <td><?= $user['email'] ?></td>
                                <td><?= $user['username'] ?></td>
                                <td><?= isset($user['gender']) ? $user['gender'] : '-' ?></td>
                                <td><?= isset($user['faculty']) ? $user['faculty'] : '-' ?></td>
                                <td><?= isset($user['batch']) ? $user['batch'] : '-' ?></td>
                            </tr>
                        <?php endif; ?>
                    <?php endforeach; ?>
                </tbody>
            </table>

        <!-- Jika user biasa yang login -->
        <?php else : ?>
            <h2>Your Details</h2>
            <table>
                <tr>
                    <th>Email</th>
                    <td><?= $current_user['email'] ?></td>
                </tr>
                <tr>
                    <th>Username</th>
                    <td><?= $current_user['username'] ?></td>
                </tr>
                <tr>
                    <th>Gender</th>
                    <td><?= isset($current_user['gender']) ? $current_user['gender'] : '-' ?></td>
                </tr>
                <tr>
                    <th>Faculty</th>
                    <td><?= isset($current_user['faculty']) ? $current_user['faculty'] : '-' ?></td>
                </tr>
                <tr>
                    <th>Batch</th>
                    <td><?= isset($current_user['batch']) ? $current_user['batch'] : '-' ?></td>
                </tr>
            </table>
        <?php endif; ?>

        <div class="logout">
            <a href="dashboard.php?logout=true">Logout</a>
        </div>
    </div>
</body>
</html>
