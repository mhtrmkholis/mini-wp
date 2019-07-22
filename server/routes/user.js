const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user-controller');

// router.get('/', UserController.list)
router.post('/signin', UserController.signin)
router.post('/signinGoogle', UserController.googleSignin)
router.post('/signup', UserController.signup)

module.exports = router