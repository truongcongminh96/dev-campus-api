const express = require('express');
const {register, login, getMe, forgotPassword, resetPassword, updateDetails, updatePassword} = require('../controllers/auth');
const {protect} = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/update_details', protect, updateDetails);
router.put('/update_password', protect, updatePassword);
router.post('/forgot_password', forgotPassword);
router.put('/reset_password/:resetToken', resetPassword);

module.exports = router;