const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required : true
    },
    lastName:{
        type:String,
        required : true
    },
    email:{
        type:String,
        required : true
    },
    password:{
        type:String,
        required : true
    },
    userName:{
        type:String,
        required : true
    },
    likedSongs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Liked' 
    }],
    likedPlaylists:{
        type:String,
        default:""
    },
    subscribedArtists:{
        type:String,
        default:""
    }
})

const UserModel = mongoose.model("User",userSchema);

module.exports = UserModel ; 