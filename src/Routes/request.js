const express=require("express");
const requestRouter=express.Router();
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

requestRouter.post("/")

module.exports={requestRouter}