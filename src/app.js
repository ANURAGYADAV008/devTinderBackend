const express = require("express");
require("dotenv").config();
const { User } = require("./models/user")
const { connectDb } = require("./config/database")
const PORT = 3000;
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(cookieParser());
const {authRouter}=require("./Routes/auth");
const {profileRouter}=require("./Routes/profile");
const {requestRouter}=require("./Routes/request");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);

connectDb()
    .then(() => {
        console.log("Data Base Connection established ...");
        app.listen(PORT, () => {
            console.log(`server Start Listen at ${PORT} PORT`)
        })
    })
    .catch((error) => {
        console.log("Dtabase Cannot be Connected !!!");
    })
