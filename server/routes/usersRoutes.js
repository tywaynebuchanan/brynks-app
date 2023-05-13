const express = require("express")
const router = express.Router()
const {register, login, getUserInfo, getUsers, updateUserStatus, changePassword,ResetPasswordByEmail } = require("../controllers/auth")
const { validateToken,authorizedRoles } = require("../middleware/validate")

router.post("/auth/register",register)
router.post("/auth/login",login)
router.post("/auth/password",validateToken,changePassword)
router.post("/auth/email-forgot-password",ResetPasswordByEmail )


router.get("/auth/user",validateToken,getUserInfo)
router.get("/auth/admin/users",validateToken,getUsers)
router.post("/auth/admin/verify-user",validateToken,authorizedRoles('admin'),updateUserStatus)

module.exports = router