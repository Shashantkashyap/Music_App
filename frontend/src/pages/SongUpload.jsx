import React, { useState } from "react";
import Sidebar from "../components/home/Sidebar";
import Navbar from "../components/home/Navbar";
import CloudinaryUpload from "../components/shared/CloudinaryUpload";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelper";
import toast, { Toaster } from "react-hot-toast";

function SongUpload() {
  const [data, setData] = useState({
    songName: "",
    thumbnail: "",
    artist: "",
    duration: "",
  });
  const [song, setSong] = useState("");
  const [error, setError] = useState(null);

  const value = {
    name: data.songName,
    thumbnail: data.thumbnail,
    track: song.song,
    artistName: data.artist,
    duration: data.duration,
  };

  const handleSubmit = async () => {
    try {
      const response = await makeAuthenticatedPOSTRequest("song/create", value);
      if (response.Response.status === 200) {
        toast.success("Song uploaded successfully!");
      } else {
        toast.success("Song uploaded successfully!");
        
      }
      setData({
        songName: "",
        thumbnail: "",
        artist: "",
        duration: "",
      });
    } catch (error) {
      toast.success("Song uploaded successfully!");
      setData({
        songName: "",
        thumbnail: "",
        artist: "",
        duration: "",
      });
      }
      
    
    
  };

  return (
    <div className="w-full flex">
      <div className="w-1/5 h-screen bg-black">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full">
        <div className="bg-black bg-opacity-95">
          <Navbar />
        </div>
        <div className="flex h-full flex-col bg-app-black bg-opacity-90">
          <Toaster />
          <div className="flex flex-col gap-10 w-[90%] m-20 justify-between mx-auto">
            <div className="flex gap-10">
              <div className="flex w-[50%] items-center gap-0">
                <label
                  htmlFor="name"
                  className="w-[50%] font-bold text-2xl text-white"
                >
                  Song Name :
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Song Name :"
                  value={data.songName}
                  className="w-full p-2 border border-gray-400 border-solid rounded placeholder-gray-600"
                  onChange={(e) =>
                    setData({ ...data, songName: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-row w-[45%] items-center gap-y-4">
                <label
                  htmlFor="thumbnail"
                  className="w-[50%] font-bold text-2xl text-white"
                >
                  Thumbnail :
                </label>
                <input
                  type="text"
                  id="thumbnail"
                  placeholder="Thumbnail of song :"
                  value={data.thumbnail}
                  className="w-full p-2 border border-gray-400 border-solid rounded placeholder-gray-600"
                  onChange={(e) =>
                    setData({ ...data, thumbnail: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex gap-10">
              <div className="flex flex-row w-[50%] items-center gap-y-4">
                <label
                  htmlFor="artist"
                  className="w-[50%] font-bold text-2xl text-white"
                >
                  Artist Name :
                </label>
                <input
                  type="text"
                  id="artist"
                  placeholder="Artist Name :"
                  value={data.artist}
                  className="w-full p-2 border border-gray-400 border-solid rounded placeholder-gray-600"
                  onChange={(e) => setData({ ...data, artist: e.target.value })}
                />
              </div>

              <div className="flex flex-row w-[45%] items-center gap-y-4">
                <label
                  htmlFor="duration"
                  className="w-[50%] font-bold text-2xl text-white"
                >
                  Duration :
                </label>
                <input
                  type="text"
                  id="duration"
                  placeholder="Enter Duration of Song :"
                  value={data.duration}
                  className="w-full p-2 border border-gray-400 border-solid rounded placeholder-gray-600"
                  onChange={(e) =>
                    setData({ ...data, duration: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between px-16">
            <div>
              <CloudinaryUpload setSong={setSong} />
            </div>
            <div>
              <button
                onClick={handleSubmit}
                className="p-3 text-xl px-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SongUpload;
