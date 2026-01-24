const express=require("express");
const PORT=3000;

const app=express();

app.use("/get",(req,res)=>{
    res.send({message:"Hello From Server"})
})

app.listen(PORT ,()=>{
    console.log(`server Start Listen at ${PORT}`)
})
