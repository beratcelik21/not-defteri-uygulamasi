const express = require('express');
const { registerUser, loginUser, changePassword, forgotPassword, resetPassword } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/changePassword', protect, changePassword); // Şifre değiştirme
router.post('/forgotPassword', forgotPassword); // Şifre sıfırlama isteği
router.post('/resetPassword/:token', resetPassword); // Şifre sıfırlama

module.exports = router;
