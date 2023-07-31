const express = require("express");
const crypto = require('crypto');
const user = require("../models/user");
const docs = require("../models/docs");

const passkey_len = 20;
var global_userID = 0;

const signup = async(req, res) => {
	const {name, email, userName, password, securityQuestion, securityAnswer} = req.body.credentials;

	const passkey = crypto.randomBytes(passkey_len).toString('hex');
	console.log(passkey);
	const userID = global_userID++;

	const userCreate = await user.create({
		name,
		email,
		userName,
		userID,
		password,
		passkey,
		securityQuestion,
		securityAnswer
	});

	const doc = await docs.create({
		userName: userName,
	});

	mailer(passkey, email);

	res.status(201).json({
		message: "User create",
		passkey: passkey,
	})
}

function mailer(passkey, email){
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
		subject: "Your passkey",
		text: "Your passkey is " + passkey,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log("Email sent: " + info.response);
		}
	});
}

module.exports = signup;