const express = require('express');
const app = express();
const useragent = require('express-useragent');
const axios = require('axios');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const verifyOTP = require('./verifyOTP');
const userModel = require("../models/user");
const otpModel = require("../models/otp");
const errResponse = require("../utils/errResponse");

app.use(useragent.express());

const len_of_otp = 6;
const risk_threshold = 0.8;

const login = async (req, res) => {
	console.log(req);
	const {ip, email, password} = req.body.credentials;
	const {userAgent} = req.useragent.source;
	const {browser} = req.useragent.browser;
	const {version} = req.useragent.version;
	var country, region, city, asn;
	console.log(`ip: ${ip}`);
	await axios.get(`https://ipapi.co/${ip}/json/`)
	.then(res => {
		console.log(res);
		country = res.data.country_code;
		region = res.data.region;
		city = res.data.city;
		asn = res.data.asn;
	});

	const user = userModel.findOne({email: email});

	if(!user){
		return next(new errResponse("User not found", 401));
	}

	const isMatch = user.comparePassword(password);

	if(!isMatch){
		return next(new errResponse("Invalid Credentials", 401));
	}

	//? send data to flask server

	var response_from_flask = 0.9;
	// ? record response form flask and then use it set user risk
	// ? if risk more than 0.8: high risk

	if(response_from_flask <= risk_threshold){
		res.status(200).json({
			risk: "low",
			message: "Login successful"
		})
	}

	else{
		var otp = "";

		for(var i = 0; i < len_of_otp; i++){
			otp += crypto.randomInt(0, 10);
		}

		const otpRes = await otpModel.create({
			email,
			ip,
			otp,
		});

		mailer(otp, email);

		res.status(200).json({
			risk: "high",
			message: "OTP sent to your email",
			otp: otp,
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