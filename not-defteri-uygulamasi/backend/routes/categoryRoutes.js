const express = require('express');
const { addCategory, deleteCategory, getCategories } = require('../controllers/categoryController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Kategori ekleme
router.post('/', protect, addCategory);

// Kategori silme
router.delete('/:id', protect, deleteCategory);

// Tüm kategorileri listeleme
router.get('/', protect, getCategories);

module.exports = router;
