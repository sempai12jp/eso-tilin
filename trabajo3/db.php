<?php
$conn = new mysqli('localhost', 'root', '', 'blogMayer');
if ($conn->connect_error) {
  die("Conexión fallida: " . $conn->connect_error);
}
?>
