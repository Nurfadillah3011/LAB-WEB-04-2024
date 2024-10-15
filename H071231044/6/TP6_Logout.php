<?php
session_start();
session_destroy();
header('Location: TP6_Login.php');
exit;
?>
