const mongoose = require("mongoose");

const LikedSongSchema = new mongoose.Schema({
    song:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song"
    },
    name:{
        type:String,
        required: true
    },
    artist:{
        type:String,
        required:true
    }
})

const LikedSong = mongoose.model("Liked",LikedSongSchema);

module.exports = LikedSong ; 