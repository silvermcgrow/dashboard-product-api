const { registerUser, loginUser } = require('../controllers/userController');
const { userRegisterValidate, userLoginValidate } = require('../utils/userValidation');

const router = require('express').Router();

router.post('/register', userRegisterValidate, registerUser);
router.post('/login', userLoginValidate, loginUser);

module.exports = router;