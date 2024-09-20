const Category = require('../models/Category');

// Kategori ekleme
const addCategory = async (req, res) => {
    const { name } = req.body;

    try {
        const categoryExists = await Category.findOne({ name, user: req.user._id });

        if (categoryExists) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        const category = await Category.create({
            name,
            user: req.user._id,
        });

        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Kategoriyi silme
const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        if (category.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await category.remove();
        res.json({ message: 'Category removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tüm kategorileri listeleme
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ user: req.user._id }).sort({ name: 1 });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addCategory, deleteCategory, getCategories };
