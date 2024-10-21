<?php
session_start();

if (!isset($_SESSION['user'])) {
    header('Location: TP6_Admin.php');
    exit;
}

$user = $_SESSION['user'];
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

function displayUserTable($users) {
    echo "<table border='1'>";
    echo "<tr>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Gender</th>
            <th>Faculty</th>
            <th>Batch</th>
          </tr>";

    foreach ($users as $user) {
        echo "<tr>";
        echo "<td>" . $user['name'] . "</td>";
        echo "<td>" . $user['email'] . "</td>";
        echo "<td>" . $user['username'] . "</td>";
        if (isset($user['gender'])) {
            echo "<td>" . $user['gender'] . "</td>";
            echo "<td>" . $user['faculty'] . "</td>";
            echo "<td>" . $user['batch'] . "</td>";
        } else {
            echo "<td colspan='3'>N/A</td>";
        }
        echo "</tr>";
    }
    echo "</table>";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="style.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
        }
        .dashboard-container {
            max-width: 700px;
            margin: auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h2 {
            text-align: center;
            color: #333;
        }
        a {
            text-decoration: none;
            color: #f00;
            font-weight: bold;
            display: block;
            margin-bottom: 20px;
            text-align: center;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        table, th, td {
            border: 1px solid #ddd;
        }
        th, td {
            padding: 12px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        .logout-btn {
            background-color: #f00;
            color: #fff;
            padding: 10px 15px;
            border: none;
            cursor: pointer;
            display: block;
            margin: 10px auto;
            width: 100px;
        }
    </style>
</head>
<body>
    <div class="dashboard-container">
        <h2>Welcome, <?= $user['name'] ?>!</h2>
        <p>Email: <?= $user['email'] ?></p>
        <p>Username: <?= $user['username'] ?></p>
        <form action="TP6_logout.php" method="POST">
            <button type="submit" class="logout-btn">Logout</button>
        </form>
        <h3>All Users</h3>
        <div class="user-data">
            <?php
            if ($user['username'] === 'adminxxx') {
                displayUserTable($users);
            }
            ?>
        </div>
    </div>
</body>
</html>
