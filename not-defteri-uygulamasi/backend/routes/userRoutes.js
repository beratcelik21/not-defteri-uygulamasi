const express = require('express');
const { changePassword, forgotPassword, resetPassword } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/changePassword', protect, changePassword);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:token', resetPassword);

module.exports = router;
