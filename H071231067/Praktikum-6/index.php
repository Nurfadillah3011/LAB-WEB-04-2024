<?php
    session_start();

    if (isset($_SESSION['user'])) {
        header('Location: dashboard.php');
        exit();
    }

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

    if (isset($_POST['login'])) {
        $emailOrUsername = $_POST['emailOrUsername'];
        $password = $_POST['password'];
    
        foreach ($users as $user) {
            if (($user['email'] === $emailOrUsername || $user['username'] === $emailOrUsername) && password_verify($password, $user['password'])) {
                $_SESSION['user'] = $user;
                header('Location: dashboard.php');
                exit();
            }
        }
        $error = "Invalid email/username or password.";
    } 
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h3 class="text-center mb-4">LOGIN</h3>
                        <?php if (isset($error)): ?>
                            <div class="alert alert-danger"><?= $error ?></div>
                        <?php endif; ?>
                        <form method="POST" action="">
                            <div class="mb-3">
                                <label for="emailOrUsername" class="form-label">Email or Username</label>
                                <input type="text" class="form-control" id="emailOrUsername" name="emailOrUsername" required>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" id="password" name="password" required>
                            </div>
                            <button type="submit" name="login" class="btn btn-primary w-100">Submit</button>
                        </form>
                        <div class="text-center mt-3">
                            <a href="#">Don't have an account? Register here.</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
