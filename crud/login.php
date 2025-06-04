<?php
session_start();
include 'db.php';


$error = '';
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $username = $_POST['username'];
  $password = md5($_POST['password']);


  $sql = "SELECT * FROM users WHERE username='$username' AND password='$password'";
  $result = $conn->query($sql);


  if ($result->num_rows === 1) {
    $_SESSION['user'] = $username;
    header("Location: index.php");
    exit();
  } else {
    $error = "Credenciales incorrectas.";
  }
}


?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Iniciar Sesión</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <div class="login-container">
    <h2>Iniciar Sesión</h2>
    <?php if ($error): ?>
      <div class="error"><?php echo $error; ?></div>
    <?php endif; ?>
    <form method="post">
      <input type="text" name="username" placeholder="Usuario" required><br>
      <input type="password" name="password" placeholder="Contraseña" required><br>
      <button type="submit">Iniciar Sesión</button>
    </form>
  </div>
</body>
</html>
