const express=require("express");
const PORT=3000;

const app=express();

// app.get(/^\/us(e)?r$/,(req,res,next)=>{
//     console.log("HI there")
//      next();
//      console.log("Yeah Baby again !!!!")
//     //res.send({message:"get User Data"});
 
// },(req,res,next)=>{
//     console.log("Second")
//     next();
//     console.log("Yeah Baby");
//     //res.send({message:"get User Data From second Route Handling"});

// },(req,res)=>{
//     res.send({message:"This is Third level Bro"})
// })


// app.post("/user/post",(req,res)=>{
//     res.send({message:"Save User Data"})
// })
// app.use("/get",(req,res)=>{
//     res.send({message:"Hello From Server"})
// })

//Its Also Work Like this We can define Like this 

app.use("/",(req,res,next)=>{
    next();
    console.log("Waps mai a Gaya !!!")
    //res.send("Hello Bro");
})
app.get("/user",(req,res,next)=>{
    console.log("First Route");
    next();
})

app.get("/user",(req,res,next)=>{
    console.log("Seconnd Route");
    res.send({message:"2nd Route Handler"});
    next();//there is No route After This is returning back So its Not do anythings
})



app.listen(PORT ,()=>{
    console.log(`server Start Listen at ${PORT} PORT`)
})
