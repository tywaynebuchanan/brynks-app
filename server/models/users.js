const mongoose = require("mongoose")
var validator = require('validator');

const UserSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, "A first name is required"],
			trim: true,
			min: 3,
		},
		lastName: {
			type: String,
			required: [true, "A last name is required"],
			trim: true,
			min: 3,
		},
		email: {
			type: String,
			required: [true, "An email is required"],
			unique: true,
			trim: true,
			validate: [validator.isEmail,'The email is invalid']
		},
		cellPhone: {
			type: String,
			required: [true, "A phone number is required"],
			 match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
		},
		idType: {
			type: String,
			required: [true, "An Id is required"],
		},
		idNumber: {
			type: String,
			required: [true, "An Id number is required"],
		},
		address: {
			type: String,
			min: 3,
			max: 250,
		},
		address2: {
			type: String,
			min: 3,
			max: 250,
		},

		city: {
			type: String,
			min: 3,
			max: 250,
		},
		parish: {
			type: String,
			min: 3,
			max: 250,
		},
		password: {
			type: String,
			required: [true, "A password is required"],
		},

        isVerified:{
            type: Boolean,
            default: false

        },
        role:{
            type: String,
            default: 'user'
        },
		balance:{
			type: Number,
			default: 0
		}
	},
	{timestamps: true}
)

module.exports = mongoose.model("users", UserSchema)
