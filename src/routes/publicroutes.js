const express = require("express")
const router = express.Router()
const authenticate = require("../Middleware/authmiddleware")

const {signupGet, loginGet} = require("../controllers/commoncontroller")
const {userhomeGet,productdescribGet} = require("../controllers/Acesscontroller")

router.get(["/", "/login"],loginGet)
router.get("/signup",signupGet)

router.get("/userhome",authenticate, userhomeGet)
router.get("/getproduct/:id",authenticate, productdescribGet)


module.exports =router;