const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

/**
* - user register controller
* - POST /api/auth/register
*/


async function userRegisterController(req, res){
    const {email, password, name} = req.body
    const isExist = await userModel.findOne({
        email:email
    })

    if(isExist){
        return res.status(422).json({
            message:"User already existing.",
            status:"failed"
        })
    }

    const user = await userModel.create({
        email, password, name
    })

    const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET,{expiresIn:"2d"})
    res.cookie("token", token)

    res.status(201).json({
        user:{
            _id:user._id,
            email:user.email,
            name:user.name
        },
        token
    })
}

module.exports = {userRegisterController}