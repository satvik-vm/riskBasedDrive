const mongoose = require("mongoose");

const docCollectionSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: true,
		unique: true,
	},
	doc: [{
		address:{
			type: String,
		},
		name:{
			type: String,
		},
		dateTime:{
			type: Date,
		},
		// required: true,
	}]
});

const docCollectionModel = new mongoose.model("doc", docCollectionSchema);

module.exports = docCollectionModel;