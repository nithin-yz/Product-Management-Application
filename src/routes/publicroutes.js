const express = require("express")
const router = express.Router()
const {signupGet, loginGet} = require("../controllers/commoncontroller")

router.get(["/", "/login"],loginGet)
router.get("/signup",signupGet)

module.exports =router;