
const mongoose = require("mongoose")
const env = require("dotenv");
env.config();


const Mongodburl=process.env.MongoUrl
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

