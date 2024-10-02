const express = require("express")
const router = express.Router()
const authenticate = require("../Middleware/authmiddleware")

const {signupGet, loginGet} = require("../controllers/commoncontroller")
const {userhomeGet} = require("../controllers/Acesscontroller")

router.get(["/", "/login"],loginGet)
router.get("/signup",signupGet)

router.get("/userhome",authenticate, userhomeGet)


module.exports =router;