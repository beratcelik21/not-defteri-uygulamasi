const express = require('express');
const {
    registerUser,
    loginUser,
    changePassword,
    forgotPassword,
    resetPassword,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/changePassword', protect, changePassword);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:token', resetPassword);

module.exports = router;
