import React, { useState } from "react";
import Sidebar from "../components/home/Sidebar";
import Navbar from "../components/home/Navbar";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import SongCard from "../components/shared/SongCard";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

function SearchSong() {
  const navigate = useNavigate();
  const [song, setSong] = useState([]);
  const [art, setArt] = useState("");

  const getSong = async () => {
    try {
      const res = await makeAuthenticatedGETRequest(`song/searchArtist/${art}`);
      console.log(res);
      if(res.success === true){
        setSong(res.artistSongs);
      toast.success("Songs fetched successfully!"); 
      }else{
        toast.error("Searched artist not uploaded song yet. Try again later");
        setSong([])
      }
    } catch (error) {
      console.error("Error fetching songs:", error);
      toast.error("Searched artist not uploaded song yet. Try again later");
    }
  };

  const handleSubmit = () => {
    console.log(art);
    getSong();
  };

  const handleSongClick = (selectedSong) => {
    navigate("/singleSong", { state: { song: selectedSong } });
  };

  return (
    <div className="w-full min-h-screen flex">
      <div className=" max-w-[20%] lg:pr-6 bg-black">
        <Sidebar />
      </div>
      <div className="flex flex-col lg:w-[90%]">
        <div className="bg-black bg-opacity-95">
          <Navbar />
        </div>

        <div className="flex h-full flex-col gap-9 lg:p-8 p-2 bg-app-black bg-opacity-90">
          <div>
            <div className="flex items-center lg:gap-10 gap-4 mx-auto">
              <input
                type="text"
                placeholder="Search Artist"
                className="lg:p-3 p-2 lg:w-[90%] rounded-md lg:text-xl text-sm lg:px-9 px-2"
                value={art}
                onChange={(e) => setArt(e.target.value)}
              />

              <button
                onClick={handleSubmit}
                className="lg:p-3 lg:text-xl lg:px-4 p-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md"
              >
                Search
              </button>
            </div>
          </div>

          <div>
            <Toaster /> {/* Add the Toaster component to render toast notifications */}
            <div>
              {song.length === 0 ? (
                <div></div>
              ) : (
                <div className="flex flex-col lg:gap-3 gap-1">
                  {song.map((e) => (
                    <div key={e._id} onClick={() => handleSongClick(e)}>
                      <SongCard
                        id={e._id}
                        name={e.name}
                        thumbnail={e.thumbnail}
                        track={e.track}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchSong;
