// models/Note.js
const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category',
    },
}, {
    timestamps: true,
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
