<?php
    session_start();

    if (!isset($_SESSION['user'])) {
        header('Location: index.php');
        exit();
    }

    $user = $_SESSION['user'];

    $users = [
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

    if (isset($_POST['logout'])) {
        session_destroy();
        header('Location: index.php');
        exit();
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <h3 class="text-center">Welcome, <?= htmlspecialchars($user['name']) ?>!</h3>
                        <?php if ($user['username'] === 'adminxxx'): ?>
                            <p><strong>Email</strong>: <?= htmlspecialchars($user['email']) ?></p>
                            <p><strong>UserName</strong>: <?= htmlspecialchars($user['username']) ?></p>
                            <form method="POST" action="">
                                <button type="submit" name="logout" class="btn btn-danger">Logout</button>
                            </form>
                            <h4 class="mt-4">All Users</h4>
                            <table class="table table-bordered">
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
                                    <?php foreach ($users as $usr): ?>
                                        <tr>
                                            <td><?= htmlspecialchars($usr['name']) ?></td>
                                            <td><?= htmlspecialchars($usr['email']) ?></td>
                                            <td><?= htmlspecialchars($usr['username']) ?></td>
                                            <td><?= htmlspecialchars($usr['gender'] ?? '-') ?></td>
                                            <td><?= htmlspecialchars($usr['faculty'] ?? '-') ?></td>
                                            <td><?= htmlspecialchars($usr['batch'] ?? '-') ?></td>
                                        </tr>
                                        <?php endforeach; ?>
                                </tbody>
                            </table>
                        <?php else: ?>
                            <p><strong>Email</strong>: <?= htmlspecialchars($user['email']) ?></p>
                            <p><strong>Username</strong>: <?= htmlspecialchars($user['username']) ?></p>
                            <p><strong>Gender</strong>: <?= htmlspecialchars($user['gender'] ?? '-') ?></p>
                            <p><strong>Faculty</strong>: <?= htmlspecialchars($user['faculty'] ?? '-') ?></p>
                            <p><strong>Batch</strong>: <?= htmlspecialchars($user['batch'] ?? '-') ?></p>
                            <form method="POST" action="">
                                <button type="submit" name="logout" class="btn btn-danger">Logout</button>
                            </form>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
