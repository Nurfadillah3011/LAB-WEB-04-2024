<?php
session_start();

if (!isset($_SESSION['user'])) {
    header('Location: TP_Login.php');
    exit;
}

$user = $_SESSION['user'];
$users = [
    // Users array here, the same as in index.php
];

function displayUser($user) {
    echo "<div class='user'>";
    echo "<p>Name: " . $user['name'] . "</p>";
    echo "<p>Email: " . $user['email'] . "</p>";
    if (isset($user['gender'])) {
        echo "<p>Gender: " . $user['gender'] . "</p>";
        echo "<p>Faculty: " . $user['faculty'] . "</p>";
        echo "<p>Batch: " . $user['batch'] . "</p>";
    }
    echo "</div>";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="dashboard-container">
        <h2>Welcome, <?= $user['name'] ?></h2>
        <form action="TP6_logout.php" method="POST">
            <button type="submit" class="logout-btn">Logout</button>
        </form>
        <div class="user-data">
            <?php
            if ($user['username'] === 'adminxxx') {
                header('Location: TP6_Admin.php');
            } else {
                displayUser($user);
            }
            ?>
        </div>
    </div>
</body>
</html>
