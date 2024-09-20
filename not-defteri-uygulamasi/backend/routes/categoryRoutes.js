// routes/categoryRoutes.js
const express = require('express');
const { createCategory, getCategories, deleteCategory } = require('../controllers/categoryController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createCategory);      // Kategori oluşturma
router.get('/', protect, getCategories);        // Kategorileri listeleme
router.delete('/:id', protect, deleteCategory); // Kategori silme

module.exports = router;
