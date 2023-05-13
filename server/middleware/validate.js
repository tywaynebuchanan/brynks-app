const jwt = require("jsonwebtoken");
const ErrorHandler = require("./errorHandler");

exports.validateToken = async(req,res,next)=>{
  let token;
    let authHeader = req.headers.Authorization || req.headers.authorization
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.TOKEN_SECRET,(err,decoded)=>{
            if(err){
                res.status(401).json({
                    success: false,
                    msg: "You have been logged out!"
                })
            }
            req.user = decoded.user
            console.log(decoded.user)
            next()
        });

        if(!token){
            res.status(401).json({
                success: false,
                msg: "User is not authorized or token is missing in the resquest"
            })
        }
    }
}

exports.authorizedRoles = (...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.body.role)){
            new ErrorHandler("You are not authorized!",403)
        }
        next()
    }
}

