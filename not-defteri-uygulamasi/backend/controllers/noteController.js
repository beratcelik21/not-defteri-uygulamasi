const Note = require('../models/Note');

// Not oluşturma
const createNote = async (req, res) => {
    const { title, content, category } = req.body;

    try {
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

// Tüm notları listeleme (sayfalama ile)
const getNotes = async (req, res) => {
    const pageSize = 10; // Her sayfada 10 not gösterilecek
    const page = Number(req.query.pageNumber) || 1;

    try {
        const count = await Note.countDocuments({ user: req.user._id });
        const notes = await Note.find({ user: req.user._id })
            .sort({ category: 1, title: 1 })
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        res.json({ notes, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Not güncelleme
const updateNote = async (req, res) => {
    const { title, content, category } = req.body;

    try {
        const note = await Note.findById(req.params.id);

        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        note.title = title || note.title;
        note.content = content || note.content;
        note.category = category || note.category;

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

        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await note.remove();
        res.json({ message: 'Note removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createNote, getNotes, updateNote, deleteNote };
