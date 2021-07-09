
<?php

//Conexión a base de datos
$host = "localhost";
$user = "root";
$clave = "";
$bd = "landingpage";

$conectar = mysqli_connect($host,$user,$clave,$bd);

//Envio de datos a base de datos
$nombre = $_POST['nombre'];
$mail = $_POST['mail'];
$motivo = $_POST['motivo'];
$mensaje = $_POST['mensaje'];

$insertar = "INSERT INTO `clientes` VALUES ('$nombre', '$mail' , '$motivo' , '$mensaje' ) ";

$query = mysqli_query($conectar , $insertar);

?> 