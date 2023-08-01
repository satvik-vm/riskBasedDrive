const mongoose = require('mongoose');

const permissionTypeSchema = new mongoose.Schema({
	priority:{
		type: Number,
	},
	type:{
		type: Number,
	}
});

const permissionSchema = new mongoose.Schema({
	userID:{
		type: Number,
		// unique: true,
	},
	timeStamp:{
		type: Date,
	},
	permission: permissionTypeSchema
});

const permissionModel = new mongoose.model('permission', permissionSchema);

module.exports = permissionModel;