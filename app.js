const express = require('express')
const app = express()
const session = require("express-session")
const flash = require("connect-flash")
const cache = require("nocache")
const env =require("dotenv")

const path = require("path")
const Mongodbconnect= require("../ProductManagementApp/src/config/mongoconnect")
Mongodbconnect()

app.use(flash())
env.config()

const PORT = process.env.PORT||3200
const RKEY = process.env.RKEY


app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use(cache())
app.listen(PORT,()=>{

    console.log("http://localhost:"+PORT+""+ " "+"serverstarted")
})