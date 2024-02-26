const jwt = require("jsonwebtoken")
require("dotenv").config

exports = {}

exports.getToken = async(email, user)=>{
    const token = jwt.sign({email},process.env.SECRET,{
        expiresIn:"2h"
      })
    return token
}

module.exports = exports