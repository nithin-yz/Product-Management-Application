exports.signupGet =async(req,res)=>{

try{

res.status(200).render("signup")


}catch(error){

    console.log("hi")
res.status(500).send("server error")
}



}

exports.loginGet = async(req,res)=>{

    try{
console.log("hi")
        res.status(200).render("login")
        
        
        }catch(error){
        console.log(error)
        res.status(500).send("server error")
        
        }
        
        
        
        }
        

exports.loginpost =async(req,res)=>{

try{


}
catch{



}

}