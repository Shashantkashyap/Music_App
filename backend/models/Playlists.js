const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    thumbnail:{
        type:String,
        required : true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    songs:[
        
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Song"
        }
    
    ],
    collaborators:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
})

const PlaylistModel = mongoose.model("Playlist",playlistSchema);

module.exports = PlaylistModel ; 