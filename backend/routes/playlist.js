const express = require("express");
const passport = require("passport");
const router = express.Router();
const Playlist = require("../models/Playlists");
const User = require("../models/User");
const Song = require("../models/Songs")

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;

    const { name, thumbnail, songs } = req.body;

    if (!name || !thumbnail || !songs) {
      return res.status(400).json({ err: "All feilds are required" });
    }

    const playlistData = {
      name,
      thumbnail,
      songs,
      owner: currentUser._id,
      collaborators: [],
    };

    const playlist = await Playlist.create(playlistData);
    return res.status(200).json(playlist);
  }
);

router.get(
  "/get/playlist/:playlistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const playlistId = req.params.playlistId;
    const playlist = await Playlist.findOne({ _id: playlistId });

    if (!playlist) {
      return res.status(400).json({ err: "Invalid Id" });
    }

    return res.status(200).json(playlist);
  }
);

router.get(
  "/get/artist/:artistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const artistId = req.params.artistId;
    const artist = await User.findOne({ _id: artistId });

    if (!artist) {
      return res.status(304).json({ err: "Invalid artist Id" });
    }

    const playlist = await Playlist.find({ owner: artistId });

    return res.status(200).json({ data: playlist });
  }
);

router.post(
  "/add/song",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    const { playlistId, songId } = req.body;

    const playlist = await Playlist.findOne({ _id: playlistId });
    if (!playlist) {
      return res.status(304).json({ err: "Playlist not exist" });
    }
    if (
      !playlist.owner.equals(currentUser._id) &&
      !playlist.collaborators.includes(currentUser._id)
    ) {
      return res.status(400).json({ err: "Not allowed" });
    }

    const song = await Song.findOne({_id: songId});
    if(!song){
        return res.status(304).json({err:"Song does not exist"})
    }

    playlist.songs.push(songId);
    await playlist.save();

    return res.status(200).json(playlist)
  }
);

module.exports = router;
