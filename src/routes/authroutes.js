const express = require("express")
const router = express.Router()
const {signupPost,loginPost}= require("./../controllers/authcontroller")
const {addcategoryPost,addsubcategoryPost,addproductPost} = require("./../controllers/Acesscontroller")
const authenticate = require("../Middleware/authmiddleware")
const upload = require("../Middleware/multer")

router.post("/signup", signupPost)
router.post("/login",loginPost)
router.post("/addcategory", authenticate,addcategoryPost)
router.post("/addsubcategory",authenticate,addsubcategoryPost)
router.post("/addproduct",authenticate,upload.array('images'),addproductPost)





module.exports =router;