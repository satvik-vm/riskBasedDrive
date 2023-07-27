const mongoose = require("mongoose");
const bcrpyt = require("bcrypt");

const otpSchema = new mongoose.Schema({
	email:{
		type: String,
		required: true,
	},
	ip:{
		type: String,
		required: true,
	},
	otp:{
		type: String,
		required: true,
		immutable: true,
	}
})

otpSchema.pre('save', async function(next) {
	const salt = await bcrpyt.genSalt(10);
	this.otp = await bcrpyt.hash(this.otp, salt);
	next();
})

otpSchema.method.compareOTP = async function(otp){
	return bcrpyt.compare(otp, this.otp);
}

const otpModel = new mongoose.model("otp", otpSchema);

module.exports = otpModel;