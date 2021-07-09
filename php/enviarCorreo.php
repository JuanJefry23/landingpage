


<?php 

//Enviara al correo especificado en "$to" la informacion suministrada en el formulario
$nombre = $_POST['nombre'];
$mail = $_POST['mail'];
$motivo = $_POST['motivo'];
$mensaje = $_POST['mensaje'];

$header = 'From: ' .$mail. " \r\n";
$header .= "X-Mailer: PHP/" .phpversion() . " \r\n";
$header .= "Mime-Version: 1.0 \r\n";
$header .= "Content-Type: text/plain";

$mensaje = "Este mensaje fue enviado por: " .$name . " \r\n";
$mensaje .= "Su e-mail es: " . $mail . " \r\n";
$mensaje .= "Motivo: " .$motivo . " \r\n";
$mensaje .= "Mensaje: " . $_POST['mensaje'] . " \r\n";
$mensaje .= "Enviado el: " . date('d/m/Y' , time());

$to = "og.jjoa@gmail.com";
$subject = "Asunto del mensaje: " . $motivo;

mail($to, $subject, utf8_decode($mensaje), $header);

?> 