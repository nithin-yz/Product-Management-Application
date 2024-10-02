const express = require("express")
const router = express.Router()
const {signupPost}= require("./../controllers/authcontroller")

router.post("/signup", signupPost)




module.exports =router;