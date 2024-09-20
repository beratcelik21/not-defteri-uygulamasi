// Tüm notları listeleme (kullanıcı bazında ve sayfalama ile)
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
