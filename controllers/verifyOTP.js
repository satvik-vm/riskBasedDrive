const otpModel = require("../models/otp");

const verifyOTP = async (req, res) => {
	const {email, ip, otp} = req.body.credentials;
	const otpData = await otpModel.findOne({email, ip});
	if(!otpData){
		res.status(400).json({
			message: "Cannot find credentials"
		})
	}
	const otpCorrect = await otpData.compareOTP(otp);
	console.log(otpCorrect);
	if(otpCorrect){
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