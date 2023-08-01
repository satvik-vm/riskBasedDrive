const otpModel = require("../models/otp");

const verifyOTP = async (req, res) => {
	const {email, ip, risk, otp} = req.body.credentials;
	const otpData = await otpModel.findOne({email, ip});
	const user = await user.findOne({email: email});
	const userID = user['userID'];
	if(!otpData){
		res.status(400).json({
			message: "Cannot find credentials"
		})
	}
	const otpCorrect = await otpData.compareOTP(otp);
	if(otpCorrect){
		const userPermission = new permissionModel({
			userID: userID,
			timeStamp: dateTime,
			permission: {
				priority: 1,
				type: 1
			}
		})
		// var savedPermission;
		userPermission.save().then((permission) =>{
			console.log(permission);
			console.log("Basic permission granted to high risk user");
		});
		res.status(200).json({
			message: "OTP verified"
		})
	}
	else{
		res.status(400).json({
			message: "OTP not verified"
		})
	}
	await otpModel.deleteOne({email, ip});
}

module.exports = verifyOTP;