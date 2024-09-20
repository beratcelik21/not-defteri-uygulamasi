// controllers/noteController.js
const Note = require('../models/Note');
const Category = require('../models/Category');

// Not oluşturma
const createNote = async (req, res) => {
    const { title, content, category } = req.body;

    try {
        // Kategorinin geçerli olup olmadığını kontrol et
        const categoryExists = await Category.findOne({ _id: category, user: req.user._id });

        if (!categoryExists) {
            return res.status(400).json({ message: 'Invalid category' });
        }

        const note = await Note.create({
            user: req.user._id,
            title,
            content,
            category,
        });

        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Notları listeleme (sayfalama ile)
const getNotes = async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    try {
        const count = await Note.countDocuments({ user: req.user._id });
        const notes = await Note.find({ user: req.user._id })
            .populate('category', 'name') // Kategori adını dahil et
            .sort({ createdAt: -1 })
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        res.json({ notes, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tek bir notu getirme
const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
            .populate('category', 'name');

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Not güncelleme
const updateNote = async (req, res) => {
    const { title, content, category } = req.body;

    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Kategori doğrulaması
        if (category) {
            const categoryExists = await Category.findOne({ _id: category, user: req.user._id });

            if (!categoryExists) {
                return res.status(400).json({ message: 'Invalid category' });
            }

            note.category = category;
        }

        note.title = title || note.title;
        note.content = content || note.content;

        const updatedNote = await note.save();
        res.json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Not silme
const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await note.remove();
        res.json({ message: 'Note removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote,
};
