const express = require('express');
const router = express.Router();
const {
  getAllAutores,
  getAutorById,
  createAutor,
  updateAutor,
  deleteAutor
} = require('../controllers/autorController');
const { autorSchema } = require('../validators/autorValidator');
const validate = require('../middleware/validate');

router.get('/', getAllAutores);
router.get('/:id', getAutorById);
router.post('/', validate(autorSchema), createAutor);
router.put('/:id', validate(autorSchema), updateAutor);
router.delete('/:id', deleteAutor);

module.exports = router; 