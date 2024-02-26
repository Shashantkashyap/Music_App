const express = require("express");
const router = express.Router();
const Liked = require("../models/LikedSong")
const passport = require("passport");
const UserModel = require("../models/User");
const SongModel = require("../models/Songs");

router.post("/addToLikeSong", passport.authenticate("jwt",{session:false}), async(req,res)=>{
    const currentUser = req.user;

    console.log(req.user.id, "IIIIIDDDDD")
    
    const {songId} = req.body;
    
    const User = await UserModel.findOne({ _id: currentUser.id })

    console.log(User);

    if(!User){
        return res.status(400).json({
            error:"User are not found"
        })
    }

    const song = await SongModel.findOne({_id : songId});
    
    const likeSong = await Liked.create({
        song: song._id,
        name : song.name,
        artist:song.artistName
    })

   

    return res.status(200).json({
        success:true,
        message:"Song Liked Successfully",
        likeSong
    })
} )

router.post("/removeFromLikedSong", passport.authenticate("jwt",{session:false}), async(req,res)=>{
    const currentUser = req.user;
    
    const {songId} = req.body;
    
    const User = await UserModel.findOne({_id:req.user.id});

    if(!User){
        return res.status(400).json({
            error:"User are not found"
        })
    }
    const songName = await SongModel.findOne({_id : songId});
    console.log(songName)

    const liked = await Liked.findOne({})
    
    return res.status(200).json({
        success:true,
        message:"Song Liked Successfully",
        likeSong
    })
} )

module.exports = router;