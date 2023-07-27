const mongoose = require("mongoose");
const bcrpyt = require("bcrypt");

const userSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true,
		unique: true,
	},
	userName:{
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	passkey: {
		type: String,
		required: true,
		immutable: true,
	},
	securityQuestion: {
		type: String,
		required: true,
		immutable: true,
	},
	securityAnswer: {
		type: String,
		required: true,
		immutable: true,
	}
});

userSchema.pre('save', async function(next) {
	if(!this.isModified("password")){
		next();
	}

	const salt = await bcrpyt.genSalt(10);
	this.password = await bcrpyt.hash(this.password, salt);
	next();
})

userSchema.methods.comparePassword = async function(password) {
	return await bcrpyt.compare(password, this.password);
}

const userModel = new mongoose.model("user", userSchema);

module.exports = userModel;