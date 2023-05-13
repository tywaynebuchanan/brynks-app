const express = require("express")
const app = express()
require("dotenv").config()

const cors = require("cors")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const helmet = require("helmet")
const mongoSanitize = require("express-mongo-sanitize")
const path = require("path")
const rateLimit = require("express-rate-limit")

const errorMiddleware = require("./middleware/errors")

const DB = require("./config/dbconfig")

const UserRoutes = require("./routes/usersRoutes")
const TransactionRoutes = require("./routes/transactionsRoutes")
const Payments = require("./routes/paymentRoutes")
const Requests = require("./routes/requestRoutes")

const PORT = process.env.PORT || 5000
const MODE = process.env.NODE_ENV

//Security HTTP Header 
app.use(helmet())

//Heroku Deployment
_dirname = path.resolve()
if(MODE === "PRODUCTION"){
	app.use(express.static("client/build"));
	app.get("*", (req,res)=>{
		res.sendFile(path.resolve(__dirname,"client","build","index.html"))
	})
}

//Handle Uncaught Exception 
process.on("uncaughtException",err=>{
	console.log(`Error: ${err.message}`)
	console.log(`Shutting down the server due to Uncaught Rejection`)
	process.exit(1)

})

DB.on("error", err => {
	console.log(err)
})

DB.once("open", () => {
	console.log("DB connected success")
})

const limiter = rateLimit({
	max: 200,
	windowMs: 60 * 60 * 1000,
	message: 'Unknown Error Occuried. Error 401A'
})

// app.use('/api',limiter)
app.use(cors())
app.use(express.json({limit: "10kb"}))
app.use(cookieParser())
app.use(mongoSanitize())


app.use("/api", UserRoutes)
app.use("/api/transactions", TransactionRoutes)
app.use("/api/payments", Payments)
app.use("/api/requests", Requests)

//Middleware to handle errors
app.use(errorMiddleware);

const server = app.listen(PORT, () => {
	console.log(`Server running on PORT ${PORT} in ${MODE}`)
})

process.on("unhandledRejection", err => {
	console.log(`Error: ${err.message}`)
	console.log(`Shutting down the server due to Unhandled Rejection`)
	server.close(() => process.exit(1))
})
