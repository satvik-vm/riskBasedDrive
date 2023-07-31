const user = require("../models/user");

const verifyPassKey = async(req, res) => {
	const {userName, enteredPasskey} = req.body.credentials;
	const userDoc = await user.findOne({userName : userName});
	if(userDoc['passkey'] === enteredPasskey){
		res.status(200).json({
			message: "Passkey verified",
		})
	}
	else{
		res.status(400).json({
			message: "Verification failed",
		})
	}
}

module.exports = verifyPassKey;