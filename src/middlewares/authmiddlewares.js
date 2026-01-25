const adminAuth=(req,res,next)=>{
    console.log("Admin is autorized")
    const token="xyz";
    if(token==="xyz")next();
    else res.status(400).send({message:"Unothorized Action"});
}
const userAuth=(req,res,next)=>{
    console.log("user is autorized")
    const token="xyz";
    if(token==="xyz")next();
    else res.status(400).send({message:"Unothorized Action"});
}
module.exports={adminAuth,userAuth};