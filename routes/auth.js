const express = require('express');

const router = express.Router();

const login = require('../controllers/login');
const signup = require('../controllers/signup');
const upload = require("../controllers/uploads");
const download = require("../controllers/downloads");
const deleteFunction = require("../controllers/delete");
const verifyOTP = require('../controllers/verifyOTP');
const verifyPassKey = require('../controllers/verifyPassKey');
const verifySecurityQuestion = require('../controllers/verifySecurityQuestion');
const permissionEnquiry = require("../controllers/permissionEnquiry");

router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/upload").post(upload);
router.route("/download").get(download);
router.route("/delete").post(deleteFunction);
router.route("/verifyOTP").post(verifyOTP);
router.route("/verifyPassKey").post(verifyPassKey);
router.route("/verifySecurityQuestion").post(verifySecurityQuestion);
router.route("/permissionEnquiry").get(permissionEnquiry);

module.exports = router;