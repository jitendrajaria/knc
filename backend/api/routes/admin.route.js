const express = require('express');
const { adminLogin } = require('../controllers/admin.controller');
const { generateOtp, sendMessage, getAllMessages } = require('../controllers/message.controller');
const { getUsers } = require('../controllers/user.controller');
const { validateJwt } = require('../middlewares/jwt.middleware');
const { inputAdminValidate, inputGetUserValidate } = require('./admin.input.schema');
const { getOtpInputValidate, postMessageInputValidate, getAllMessageInputValidate } = require('./message.input.schema');

const router = express.Router();

router.post('/auth', inputAdminValidate, adminLogin);
router.get('/:id/users', validateJwt, inputGetUserValidate, getUsers);
router.get('/:id/users/:userId/otp', validateJwt, getOtpInputValidate, generateOtp);
router.post('/:id/users/:userId/message', validateJwt, postMessageInputValidate, sendMessage);
router.get('/:id/messages', validateJwt, getAllMessageInputValidate, getAllMessages);
module.exports = router;
