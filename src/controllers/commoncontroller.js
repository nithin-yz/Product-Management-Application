
const userschema = require("../models/user")


exports.signupGet =async(req,res)=>{

try{

res.status(200).render("signup",{ messages: req.flash('error')})


}catch(error){

   
res.status(500).send("server error")
}



}

exports.loginGet = async(req,res)=>{

    try {
        const errorMessages = req.flash('error'); 
     
        res.status(200).render("login", { messages: { error: errorMessages } })
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }



}

