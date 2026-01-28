const express=require("express");
const authRouter=express.Router();
require("dotenv").config();
const { User } = require("../models/user")
const { userAuth } = require("../middlewares/authmiddlewares")
const app = express();
const { validateSignup } = require("../utils/validation");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(cookieParser());


authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        console.log(`${emailId}  ${password} `);

        if (!emailId || !password) throw new Error("Fields Are Required");

        const user = await User.findOne({ emailId: emailId });

        if (!user) throw new Error("Invalid Emailid or Password");

       //mongodbmethods
        const isPasswordValid = await user.getValidatePassword(password);

        if (isPasswordValid) {
            //crete jwt token from schema methods
            console.log("generate Ho gaya")
            const token = await user.getJWT();
            console.log("generate Ho gaya")

            //send back token to the user
            res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) });

            res.status(200).send({ message: "User Login Successfully" })
        }


    } catch (error) {
        res.status(400).send({ message: error.message });

    }



})

authRouter.post("/signup", async (req, res) => {
    try {

        const { firstName, lastName, emailId, password, age } = req.body;
        validateSignup(req);
        //hashPassword



        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = new User({
            fistName: firstName,
            lastName: lastName,
            emailId: emailId,
            password: hashPassword,
            age: age
        });
        await user.save();
        res.status(200).send({
            message: "User added Successfully",
            user: user
        });

    }
    catch (error) {
        res.status(400).send({ message: error.message });

    }

})

authRouter.delete("/deleteuser", userAuth, async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).send({ message: "Invalid emailId" })
        }
        const { deleteCount } = await User.findOneAndDelete({ _id: id });

        if (deleteCount === 0) return res.status(404).send({ message: "User not found" });

        res.status(200).send({ message: "User deleted Successfully" })

    }
    catch (error) {
        res.status(404).send({ message: `Someething went wrong ${error.message}` })
    }

})

authRouter.post("/logOut",async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now())
    })
    res.status(200).send({message:"You Are LoggedOut Successfully"})

})


module.exports={authRouter}