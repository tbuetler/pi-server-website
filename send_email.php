<?php
$to = "tim.buetler@protonmail.ch";
$subject = "Anmeldung zum Osterlager 2025";
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";

-mail($to, $subject, $message, $headers);

header("Location: ../index.html?success=1");
?>