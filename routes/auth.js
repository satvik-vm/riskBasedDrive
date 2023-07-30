const express = require('express');

const router = express.Router();

const login = require('../controllers/login');
const verifyOTP = require('../controllers/verifyOTP');
const signup = require('../controllers/signup');
const upload = require("../controllers/uploads");
const download = require("../controllers/downloads");
const deleteFunction = require("../controllers/delete");

router.route("/login").post(login);
router.route("/verifyOTP").post(verifyOTP);
router.route("/signup").post(signup);
router.route("/upload").post(upload);
router.route("/download").get(download);
router.route("/delete").post(deleteFunction);

module.exports = router;