const express = require('express');

const router = express.Router();

const login = require('../controllers/login');
const verifyOTP = require('../controllers/verifyOTP');
const signup = require('../controllers/signup');

router.route("/login").post(login);
router.route("/verifyOTP").post(verifyOTP);
router.route("/signup").post(signup);

module.exports = router;