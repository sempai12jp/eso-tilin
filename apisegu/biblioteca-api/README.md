# Biblioteca API

API RESTful para la gestión de una biblioteca escolar.

## Descripción
Esta API permite gestionar autores, libros y usuarios, así como las relaciones entre ellos. Está desarrollada con Node.js, Express y utiliza almacenamiento en memoria.

## Instalación

1. Clona el repositorio o descarga el proyecto.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```
   O en modo producción:
   ```bash
   npm start
   ```

## Estructura del proyecto

```
biblioteca-api/
├── app.js
├── controllers/
│   ├── autorController.js
│   ├── libroController.js
│   └── usuarioController.js
├── routes/
│   ├── autorRoutes.js
│   ├── libroRoutes.js
│   └── usuarioRoutes.js
├── validators/
│   ├── autorValidator.js
│   ├── libroValidator.js
│   └── usuarioValidator.js
├── middleware/
│   ├── validate.js
│   └── errorHandler.js
├── data/
│   └── storage.js
├── package.json
└── README.md
```

## Endpoints principales

### Autores
- `GET /autores` — Lista todos los autores
- `GET /autores/:id` — Obtiene un autor por ID
- `POST /autores` — Crea un nuevo autor
- `PUT /autores/:id` — Actualiza un autor
- `DELETE /autores/:id` — Elimina un autor

### Libros
- `GET /libros` — Lista todos los libros
- `GET /libros/:id` — Obtiene un libro por ID
- `POST /libros` — Crea un nuevo libro
- `PUT /libros/:id` — Actualiza un libro
- `DELETE /libros/:id` — Elimina un libro

### Usuarios
- `GET /usuarios` — Lista todos los usuarios
- `GET /usuarios/:id` — Obtiene un usuario por ID
- `POST /usuarios` — Crea un nuevo usuario
- `PUT /usuarios/:id` — Actualiza un usuario
- `DELETE /usuarios/:id` — Elimina un usuario

## Ejemplo de petición para crear un autor
```json
POST /autores
{
  "nombre": "Gabriel García Márquez",
  "nacionalidad": "Colombiana",
  "fechaNacimiento": "1927-03-06"
}
```

## Notas
- El almacenamiento es en memoria, por lo que los datos se pierden al reiniciar el servidor.
- Puedes extender la API agregando más validaciones, relaciones y lógica de negocio.

---

Autor: Tu Nombre 