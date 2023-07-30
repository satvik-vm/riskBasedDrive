const express = require("express");
const crypto = require('crypto');
const user = require("../models/user");
const docs = require("../models/docs");

const passkey_len = 20;

const signup = async(req, res) => {
	const {name, email, userName, password, securityQuestion, securityAnswer} = req.body.credentials;

	const passkey = crypto.randomBytes(passkey_len).toString('hex');
	console.log(passkey);

	const userCreate = await user.create({
		name,
		email,
		userName,
		password,
		passkey,
		securityQuestion,
		securityAnswer
	});

	const doc = await docs.create({
		userName: userName,
	});

	res.status(201).json({
		message: "User create",
		passkey: passkey,
	})
}

module.exports = signup;