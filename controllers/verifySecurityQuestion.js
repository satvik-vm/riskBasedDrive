const user = require("../models/user");
const permissionModel = require("../models/permission");

const verifySecurityQuestion = async(req, res) => {
	const {userName, securityAnswer} = req.body.credentials;
	const currUser = await user.findOne({userName: userName});
	const userID = currUser['userID'];
	const securityAnswerTrue = currUser['securityAnswer'];
	const dateTime = new Date();
	if(securityAnswer === securityAnswerTrue){
		const userPermission = new permissionModel({
			userID: userID,
			timeStamp: dateTime,
			permission: {
				priority: 0,
				type: 1,
			}
		})
		// var savedPermission;
		userPermission.save().then((permission) =>{
			console.log("Mutable permission for low sensitivity documents granted to user");
		});
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