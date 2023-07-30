const user = require("../models/user");

const verifySecurityQuestion = async(req, res) => {
	const {userName, securityAnswer} = req.body.credentials;
	const currUser = user.findOne({userName: userName});
	const securityAnswerTrue = currUser['securityAnswer'];
	if(securityAnswer === securityAnswerTrue){
		res.status(200).json({
			message: "Security Answer verified",
		})
	}
	else{
		res.status(400).json({
			message: "Security Answer wrong",
		})
	}
}

module.exports = verifySecurityQuestion;