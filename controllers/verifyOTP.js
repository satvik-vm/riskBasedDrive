//TODO: handle globalOTP
const otpModel = require("../models/otp");

const verifyOTP = async (req, res) => {
	const {email, ip, otp} = req.body.credentials;
	const otpData = otpModel.findOne({email, ip});
	const actualOtp = otpData['otp'];
	if(actualOtp.compareOTP(otp)){
		res.status(200).json({
			message: "OTP verified"
		})
	}
	else{
		res.status(400).json({
			message: "OTP not verified"
		})
	}
	otpModel.deleteOne({email, ip});
}

module.exports = verifyOTP;