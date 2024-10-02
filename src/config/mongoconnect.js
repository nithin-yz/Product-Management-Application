
const mongoose = require("mongoose")
const Mongodburl="mongodb+srv://tomshift22:hmIIGiOuw7v8zKNe@bestbuy.zxclmeg.mongodb.net/Production-Management?retryWrites=true&w=majority&appName=Bestbuy"  
const Mongodbconnect =async()=>{
try{
  
    await mongoose.connect(Mongodburl)

    console.log("Database is connected")
    
    
    }
    catch (error){
  
    console.log("database is not connected",error)
    
    
    }
    
    
    
}

module.exports = Mongodbconnect

