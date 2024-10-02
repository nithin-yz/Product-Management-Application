const express = require("express")
const router = express.Router()
const {signupPost,loginPost}= require("./../controllers/authcontroller")
const {addcategoryPost} = require("./../controllers/Acesscontroller")
const authenticate = require("../Middleware/authmiddleware")

router.post("/signup", signupPost)
router.post("/login",loginPost)
router.post("/addcategory", authenticate,addcategoryPost)





module.exports =router;