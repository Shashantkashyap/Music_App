const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    thumbnail:{
        type:String,
        required : true
    },
    track:{
        type:String,
        required : true
    },
    duration:{
        type:String,
        required : true
    },
    artistName:{
        type:String,
        required : true
    },
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        
    }
})

songSchema.index({ artistName: 'text' });


const SongModel = mongoose.model("Song",songSchema);

module.exports = SongModel ; 