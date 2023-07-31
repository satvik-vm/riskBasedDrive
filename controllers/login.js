const express = require('express');
const app = express();
const useragent = require('express-useragent');
const axios = require('axios');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const verifyOTP = require('./verifyOTP');
const userModel = require("../models/user");
const otpModel = require("../models/otp");
const ErrorResponse = require("../utils/errResponse");
const risk_analysis = require("../rbaCall");

app.use(useragent.express());

const len_of_otp = 6;
const risk_threshold_high = 10;
const risk_threshold_mid = 3;

const login = async (req, res, next) => {
	const {ip, userName, password} = req.body.credentials;
	const userAgent = req['useragent']['source'];
	const browser = req['useragent']['browser'];
	const version = req['useragent']['version'];
	const os = req['useragent']['os'];
	var country, asn;
	await axios.get(`https://ipapi.co/${ip}/json/`)
	.then(res => {
		country = res.data.country_code;
		asn = res.data.asn;
	});

	const user = await userModel.findOne({userName: userName});

	// console.log(user);

	if(!user){
		return next(new ErrorResponse("User not found", 401));
	}

	const isMatch = await user.comparePassword(password);

	if(!isMatch){
		return next(new ErrorResponse("Invalid Credentials", 401));
	}

	const userID = user['userID'];
	const browserNameVersion = browser + " " + version;
	const deviceType = 'Desktop';

	const data = {
		"User ID": [userID],
    "IP Address": [ip],
    "Country": [country],
    "ASN": [asn],
    "User Agent String": [userAgent],
    "Browser Name and Version": ["Android 2.3.3.2672"],
    "OS Name and Version": ["Linux"],
    "Device Type": [deviceType],
    "Login Successful": [true]
	}

	var response_from_flask = risk_analysis(data);
	console.log(response_from_flask);

	if(response_from_flask <= risk_threshold_high){		// initially all access will be immutable
		res.status(200).json({
			risk: "low",
			message: "Login successful"
		})
	}

	else{
		res.status(202).json({
			risk: "high",
			message: "Redirect to security question",
		})
	}
}

function mailer(otp, email){
	var dateTime = new Date();
	const transporter = nodemailer.createTransport({
		service: process.env.SERVICE,
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASSWORD,
		}
	});

	var mailOptions = {
		from: process.env.EMAIL,
		to: email,
		subject: "OTP for your login on " + dateTime.toISOString().slice(0,10) + " at " + dateTime.toISOString().slice(11,19) + " UTC",
		text: "Your OTP is " + otp,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log("Email sent: " + info.response);
		}
	});
}

module.exports = login;