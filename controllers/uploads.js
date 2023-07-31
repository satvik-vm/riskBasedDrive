const fs = require('fs');

const upload = async (req, res)  => {
	const {userName, fileName, fileBody, highSensitivity} = req.body.file;
	const dir = __dirname + '/../uploads/' + userName;
	const highSensitivityDir = dir + "/highSensitivity"
	const lowSensitivityDir = dir + "/lowSensitivity";
	var fileAddress;
	if(highSensitivity == true){
		fileAddress = highSensitivityDir + "/" + fileName;
	}
	else{
		fileAddress = lowSensitivityDir + "/" + fileName;
	}
	fs.mkdirSync(highSensitivityDir, { recursive: true });
	fs.mkdirSync(lowSensitivityDir, { recursive: true });
	console.log(fileAddress);
	fs.writeFileSync(fileAddress, fileBody);
	res.status(200).json({
		message: "File saved successfully",
	})
}

module.exports = upload;