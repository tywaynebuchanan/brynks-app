const User = require("../models/users")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const ErrorHandler = require("../middleware/errorHandler")

exports.register = async (req, res,next ) => {
	try {
		const {email} = req.body
		const userCheck = await User.findOne({email})
		if (userCheck) {
			return next(new ErrorHandler("This user already exists",400))
		}
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(req.body.password, salt)
		req.body.password = hashedPassword
		const user = await User.create(req.body)
		if (user) {
			res.status(201).json({
				success: true,
				msg: "The user as been created. Please wait to be verified",
				data: null,
			})
		} else {
			return next (new ErrorHandler("Unable to create new user",400))
		}
	} catch (error) {
		res.status(400).json({
			success: false,
			msg: error.message,
		})
	}
}

exports.login = async (req,res,next) => {
	try {

		//check if user is already in db
	
		const {email, password} = req.body
		if (!email || !password) {
			return next(new ErrorHandler("All fields are mandatory",400))
		}
		const user = await User.findOne({email}).select("+password")
		if (!user) {
			failedAttempts++
			return next (new ErrorHandler("Incorrect email or password",400))
		}

		
		//if there is a user, check the password against the db
		const isPasswordValid = await bcrypt.compare(password, user.password)
		if (!isPasswordValid) {
			return res.status(400).json({
				success: false,
				msg: "Username or Password is incorrect",
			})
		}

		if (!user.isVerified) {
			return next(new ErrorHandler("You are not verified",404))
		}

		
		//generate token
		const token = jwt.sign(
			{
				user: {
					email: user.email,
					id: user._id,
				},
			},
			process.env.TOKEN_SECRET,
			{
				expiresIn: "1h",
			}
		)

		res.status(200).json({
			success: true,
			msg: "User logged in!",
			data: token,
		})
	} catch (error) {
		res.status(400).json({
			success: false,
			msg: "Unknown error occured",
		})
	}
}

exports.getUserInfo = async (req, res) => {
	try {
		const user = await User.findById(req.user.id)
		user.password = undefined
		if(!user){
			res.status(404).json({
				success: false,
				msg: "Unable to find user"
			})
		}
		res.status(200).json({
			success: true,
			data: user
		})
	} catch (error) {
		res.status(400).json({
			success: false,
			msg: error.message
		})
	}
}

exports.getUsers = async(req,res)=>{
	try {
		const users = await User.find()
		if(!users){
			res.status(400).json({
				success: false,
				msg: "Unable to fetch users"
			})
		}

		res.status(200).json({
			success: true,
			msg: "Users fetched successfully",
			data: users
		})
	} catch (error) {
		res.status(200).json({
			success: true,
			msg: error.message,
			data: null
		})
	}
}

//update user status i.e verified

exports.updateUserStatus = async(req,res)=>{
	try {
		const verified = await User.findByIdAndUpdate(req.body.selectedUser,{
			isVerified: req.body.isVerified
		})

		res.status(200).send({
			data: null,
			msg: "User status was updated",
			success: true,
		})
		
	} catch (error) {
		res.status(400).json({
			success:false,
			msg: error.message
		})
	}
}

exports.changePassword = async(req,res,next)=>{
	try {
		const {currentpassword, password, conpassword} = req.body

		const user = await User.findById(req.user.id).select("+password")
		const isCorrectPassword = await bcrypt.compare(currentpassword,user.password)
		if(!isCorrectPassword){
			return res.status(400).json({
				success: false,
				msg: "The current password you provide is incorrect!"
			})
		}
		
		const hashedPassword = await bcrypt.hash(password,10)

		user.password = hashedPassword

		await user.save()

		res.status(200).json({
			success: true,
			msg:"Your Password has been updated"
		})

	} catch (error) {
		res.status(404).json({
			success:false,
			msg: "Internal Server Error"
		})
	}
}

exports.ResetPasswordByEmail = async(req,res,next)=>{
	try {
		const {email} = req.body
		const userEmail = await User.findOne({email})
		if(!userEmail){
			return res.status(400).json({
				success: false,
				msg: "We do not have that email on file"
			})
		}

		res.status(200).json({
			success: true,
			msg:"Email was sent to your email address."
		})
	} catch (error) {
		res.status(400).json({
			success:false,
			msg: error.message
		})
	}
}

