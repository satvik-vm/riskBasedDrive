const fs = require('fs');
const document = require("../models/docs");

const download = async (req, res) => {
	const {userName, fileName} = req.body.file;
	const dir = __dirname + '/../uploads/' + userName;
	const fileAddress = dir + "/" + fileName;
	console.log(fileAddress);
	res.download(fileAddress, (err) => {
		if(err){
			res.status(404).json({ error: 'File not found' });
		}
	})
}

module.exports = download;