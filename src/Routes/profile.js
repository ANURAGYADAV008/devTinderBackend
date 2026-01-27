const express=require("express");
const profileRouter=express.Router();
require("dotenv").config();
const { User } = require("./models/user")
const { userAuth } = require("./middlewares/authmiddlewares")
const app = express();
const { validateSignup } = require("./utils/validation");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(cookieParser());



profileRouter.get("/profile", userAuth, async (req, res) => {
    try {
        const { user } = req

        console.log(user);
        res.status(200).send({ message: user });

    } catch (error) {
        res.status(400).send({ message: `Someething went wrong : ${error.message}` });


    }

})
profileRouter.get("/user", userAuth, async (req, res) => {
    try {
        const { emailId } = req.body;

        if (!emailId) return res.status(500).send({ message: "Email id Is Required" });

        const user = await User.findOne({ emailId: emailId });

        if (!user) res.status(404).send({ message: "User Not Found" })

        res.status(200).send({ message: user });
    }
    catch (error) {
        res.status(400).send({ message: `Someething went wrong ${error.message}` })
    }
})

profileRouter.get("/feed", userAuth, async (req, res) => {
    try {
        const users = await User.find({});

        if (!users) return res.status(404).send({ message: "User Not Found" })

        res.status(200).send({ message: users });


    } catch (error) {
        res.status(400).send({ message: `Someething went wrong ${error.message}` });

    }
})

module.exports={profileRouter};