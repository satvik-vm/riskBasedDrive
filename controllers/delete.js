const fs = require("fs");

const deleteFunction = async(req, res) => {
	const {userName, fileName, highSensitivity} = req.body.file;
	const userPath = __dirname + "/../uploads/" + userName;
	var dir;
	if(highSensitivity){
		dir = userPath + "/highSensitivity";
	}
	else{
		dir = userPath + "/lowSensitivity";
	}
	const filePath = dir + "/" + fileName;
	console.log(filePath);
	fs.unlink(filePath, (err) => {
		if(err){
			res.status(400).json({
				message: "cannot delete file",
			})
		}
	});
	res.status(200).json({
		message: "file deleted"
	})
}

module.exports = deleteFunction;