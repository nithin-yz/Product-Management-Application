const express = require("express")
const router = express.Router()
const {signupPost,loginPost}= require("./../controllers/authcontroller")

router.post("/signup", signupPost)
router.post("/login",loginPost)




module.exports =router;