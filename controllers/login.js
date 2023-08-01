const express = require('express');
const app = express();
const useragent = require('express-useragent');
const axios = require('axios');
const crypto = require('crypto');
const userModel = require("../models/user");
const permissionModel = require("../models/permission");
const ErrorResponse = require("../utils/errResponse");
const risk_analysis = require("../rbaCall");

app.use(useragent.express());

const len_of_otp = 6;
const risk_threshold_mid = 3;
const risk_threshold_high = 10;

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

	//? flask part
	// var response_from_flask = risk_analysis(data);
	var response_from_flask = 11;
	console.log(response_from_flask);
	//? flat part end

	const dateTime = new Date();

	if(response_from_flask <= risk_threshold_high){		// initially all access will be immutable
		var permissionType, riskLevel;
		if(response_from_flask < risk_threshold_mid){
			riskLevel = "low";
			permissionType = 1;
		}
		else{
			riskLevel = "mid";
			permissionType = 0;
		}
		const userPermission = new permissionModel({
			userID: userID,
			timeStamp: dateTime,
			permission: {
				priority: 0,
				type: permissionType,
			}
		})
		userPermission.save().then((savedPermission) =>{
			console.log("Basic permission granted");
		});
		res.status(200).json({
			risk: riskLevel,
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

module.exports = login;