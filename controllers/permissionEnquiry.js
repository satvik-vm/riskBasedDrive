const permissionModel = require("../models/permission");

const permissionEnquiry = async(req, res) => {
	const {userID} = req.body.credentials;
	const permission = await permissionModel.findOne({userID: userID});
	if(!permission){
		res.status(400).json({
			message: "Permissions not found",
		});
	}
	else{
		const priority = permission['permission']['priority'];
		const type = permission['permission']['type'];
		res.status(200).json({
			message: "Permission found",
			permissions: {priority, type}
		});
	}
}

module.exports = permissionEnquiry;