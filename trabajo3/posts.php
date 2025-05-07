<?php require 'db.php'; ?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Lista de Posts</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    .posts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      padding: 20px 0;
    }
    .post-image {
      width: 100%;
      height: auto;
      max-height: 300px;
      object-fit: contain;
      background-color: rgb(235, 240, 245);
    }
    .card-img-container {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f8f9fa;
      padding: 15px;
      width: 100%;
    }
    .card {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      border: 1px solid rgba(0,0,0,.125);
      border-radius: 0.25rem;
    }
    .card-body {
      flex: 1;
      padding: 1.25rem;
    }
  </style>
</head>
<body class="bg-light">
<div class="container mt-5">
  <h2 class="mb-4">Posts del Blog</h2>
  <a href="create.php" class="btn btn-primary mb-3">Crear nuevo post</a>
  <a href="index.html" class="btn btn-secondary mb-3">Inicio</a>

  <div class="posts-grid">
    <?php
    $result = $conn->query("SELECT * FROM posts ORDER BY created_at DESC");
    while($row = $result->fetch_assoc()):
    ?>
      <div class="card">
        <?php if (!empty($row['image_path'])): ?>
          <div class="card-img-container">
            <img src="<?php echo htmlspecialchars($row['image_path']); ?>" class="post-image" alt="Imagen del post">
          </div>
        <?php endif; ?>
        <div class="card-body">
          <h5 class="card-title"><?php echo htmlspecialchars($row['title']); ?></h5>
          <p class="card-text"><?php echo nl2br(htmlspecialchars($row['content'])); ?></p>
          <p class="card-text"><small class="text-muted">Publicado: <?php echo $row['created_at']; ?></small></p>
        </div>
      </div>
    <?php endwhile; ?>
  </div>
</div>
</body>
</html>
