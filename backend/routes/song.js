const express = require("express");
const passport = require("passport");
const router = express.Router();
const Song = require("../models/Songs");
const User = require("../models/User")

router.post("/create",passport.authenticate("jwt",{session:false}), async(req,res)=>{
    const {name, thumbnail, track, duration, artistName} = req.body;
    const artist = req.user.id
    

    
    if(!name || !thumbnail || !track){
        return res.status(403).json({
            error:"All feilds are required"
        })
    }

    const songDetails = {name, thumbnail, track, duration, artistName, artist};
    const createdSong = await Song.create(songDetails);

    return res.status(200).json(createdSong);
});


router.get("/get/mysongs",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    const currentUser = req.user;

    const song = await Song.find({artist:req.user._id});

    return res.status(200).json({data:song});
} );



 router.get("/get/artist/:artistId",  async(req,res)=>{
    const artistId = req.params.artistId
    
    const artist = await User.findOne({_id: artistId});
    
    if(!artist){
        return res.status(301).json({err:"Artist does not exist"})
    }

    const song = await Song.find({artist:artistId});
    return res.status(200).json({data:song});

 })


 router.get("/get/songname/:songName", async(req,res)=>{
    const {songName} = req.params;

    const regex = new RegExp(songName, "i");
        
    const songs = await Song.find({ name: regex });
    return res.status(200).json({data:songs});

 });

 router.get("/searchArtist/:art", async (req, res) => {
    const { art } = req.params;
    console.log(art)
    
    try {
        // Extract the artist name from the request body
        const artistName = art && typeof art === 'string' ? art.trim() : null; // Ensure art is a string and trim whitespace
        
        if (!artistName) {
            return res.status(400).json({
                success: false,
                message: "Artist name is missing in the request body."
            });
        }

        // Perform a text search with fuzzy matching
        const artistSongs = await Song.find({ $text: { $search: artistName, $caseSensitive: false, $diacriticSensitive: false } });

        if (artistSongs.length > 0) {
            return res.status(200).json({
                success: true,
                artistSongs
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "No matching songs found for the provided artist name."
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error in fetching songs",
            error: err
        });
    }
});



module.exports = router;