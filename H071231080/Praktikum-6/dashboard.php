<?php
session_start();

if (!isset($_SESSION['user'])) {
    header("Location: login.php");
    exit;
}

$user = $_SESSION['user'];

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
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <title>Dashboard</title>
    <style>
        * {
            box-sizing: border-box;
        }
        body {
            font-family: Poppins;
            background-color: #fbe0d9;
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
        }
        .container {
            width: 90%;
            max-width: 800px;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        h2, h3 {
            color: #333;
            margin-bottom: 10px;
        }
        .user-details {
            margin-bottom: 20px;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #f9f9f9;
        }
        .user-details p {
            margin: 5px 0;
            font-size: 16px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        table, th, td {
            border: 1px solid #ddd;
        }
        th, td {
            padding: 12px;
            text-align: left;
        }
        th {
            background-color: #efa9a9;
            color: white;
        } 
        .logout-btn {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 15px;
            color: #fff;
            background-color: #f0bfc1;
            text-decoration: none;
            border-radius: 4px;
            transition: background-color 0.3s ease;
        }
        .logout-btn:hover {
            background-color: #b89597;
        }
        </style>
</head>

<body>
    <div class="container">
        <h2>Welcome, <?php echo htmlspecialchars($user['name']); ?>!</h2>
        <div class="user-details">
            <p><strong>Email:</strong> <?php echo htmlspecialchars($user['email']); ?></p>
            <p><strong>Username:</strong> <?php echo htmlspecialchars($user['username']); ?></p>
            
            <?php if ($user['username'] != 'adminxxx') : ?>
                <p><strong>Gender:</strong> <?php echo htmlspecialchars($user['gender'] ?? ''); ?></p>
                <p><strong>Faculty:</strong> <?php echo htmlspecialchars($user['faculty'] ?? ''); ?></p>
                <p><strong>Batch:</strong> <?php echo htmlspecialchars($user['batch'] ?? ''); ?></p>
            <?php endif; ?>
        </div>

        <?php if ($user['username'] == 'adminxxx') : ?>
            <h3>All Users</h3>
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
                    
                    <?php foreach ($users as $u) : ?>
                        <?php if ($u['username'] !== 'adminxxx') : ?>
                            <tr>
                                <td><?php echo htmlspecialchars($u['name']); ?></td>
                                <td><?php echo htmlspecialchars($u['email']); ?></td>
                                <td><?php echo htmlspecialchars($u['username']); ?></td>
                                <td><?php echo htmlspecialchars($u['gender'] ?? ''); ?></td>
                                <td><?php echo htmlspecialchars($u['faculty'] ?? ''); ?></td>
                                <td><?php echo htmlspecialchars($u['batch'] ?? ''); ?></td>
                            </tr>
                        <?php endif; ?>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>

        <a href="logout.php" class="logout-btn">Logout</a>
    </div>
</body>
</html>





