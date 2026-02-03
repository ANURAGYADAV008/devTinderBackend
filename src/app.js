const express = require("express");
require("dotenv").config();
const { User } = require("./models/user")
const { connectDb } = require("./config/database")
const PORT = process.env.PORT 
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors=require("cors");
app.use(express.json());
app.use(cookieParser());
const {authRouter}=require("./Routes/auth");
const {profileRouter}=require("./Routes/profile");
const {requestRouter}=require("./Routes/request");
const {userRouter}=require("./Routes/user")

app.use(cors({
  origin: "http://localhost:5173", // frontend URL (Vite)
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS","PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));



app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);

connectDb()
    .then(() => {
        console.log("Data Base Connection established ...");
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server Start Listen at ${PORT} PORT`)
        })
    })
    .catch((error) => {
        console.log("Database Cannot be Connected !!!");
    })