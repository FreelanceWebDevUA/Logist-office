<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['form']['name'];
    $lastName = $_POST['form']['last-name'];
    $phone = $_POST['form']['phone'];
    $email = $_POST['form']['email'];
    $text = $_POST['form']['text'];

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('uk', 'phpmailer/language/');
    $mail->IsHTML(true);

    $mail->setFrom($email, $name);
    $mail->addAddress('vyacheslavs2022@gmail.com'); // Вкажіть свою поштову скриньку
		$mail->setFrom('from@gmail.com', 'Замовлення');

    $mail->Subject = 'Нове замовлення';

    $body = '<h1>Деталі замовлення:</h1>';
    $body .= '<p><strong>Ім’я:</strong> '.$name.'</p>';
    $body .= '<p><strong>Прізвище:</strong> '.$lastName.'</p>';
    $body .= '<p><strong>Телефон:</strong> '.$phone.'</p>';
    $body .= '<p><strong>E-mail:</strong> '.$email.'</p>';
    $body .= '<p><strong>Замовлення:</strong> '.$text.'</p>';

    $mail->Body = $body;

    if (!$mail->send()) {
        $message = 'Помилка при відправленні повідомлення';
    } else {
        $message = 'Замовлення надіслане успішно';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
}
?>
