const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User= require("../models/user")
require('dotenv').config()

exports.loginpost =async(req,res)=>{

    try{
    
    
    }
    catch{
    
    
    
    }
    
    }
    
    exports.signupPost=async(req,res)=>{
        const { username, email, password } = req.body;   



        try {
        
            let user = await User.findOne({ email });
            if (user) {
              return res.status(400).redirect("/signup",{ message: 'User already exists, please login' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const NewUserEntry = new User({
                username,
                email,
                password: hashedPassword,
              });

res.status(201).redirect()
        }
    catch(error){




    }
    
    }