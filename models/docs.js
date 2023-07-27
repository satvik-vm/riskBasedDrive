const mongoose = require("mongoose");

const docCollectionSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	doc: [{
		type: Buffer,
		// required: true,
	}]
});

const docCollectionModel = new mongoose.model("doc", docCollectionSchema);

module.exports = docCollectionModel;