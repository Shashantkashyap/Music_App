import React, { useEffect, useState } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import Sidebar from "../components/home/Sidebar";
import Navbar from "../components/home/Navbar";
import ArtistSongCard from "../components/shared/ArtistSongCard";


function ArtistSongs() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const artistId =localStorage.getItem("artistId");
        const response = await makeAuthenticatedGETRequest(
          `song/get/artist/${artistId}`
        );

        setSongs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching artist songs:", error);
        setError("Error fetching artist songs. Please try again later.");
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const handleSongClick = (song) => {
    setSelectedSong(song);
    setIsPlaying(true);
  };

  const handleSongEnd = () => {
    // Find the index of the currently playing song
    const currentIndex = songs.findIndex((song) => song === selectedSong);
    // Play the next song if there is one
    if (currentIndex !== -1 && currentIndex < songs.length - 1) {
      setSelectedSong(songs[currentIndex + 1]);
    } else {
      // Stop playback if it's the last song
      setSelectedSong(null);
      setIsPlaying(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className=" w-full flex">
      <div className=" w-1/5 bg-black">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full h-screen">
        <div className=" bg-black bg-opacity-95">
          <Navbar />
        </div>

        <div className="flex flex-col gap-9 p-8 bg-app-black bg-opacity-90 h-full">
          
          <div>
            {songs.length === 0 ? (
              <div className=" text-gray-400 text-2xl font-semibold">You have not uploaded any songs yet...</div>
            ) : (
              <div>
                <div className=" text-gray-400 text-2xl font-semibold">These are your uploaded Songs ... </div>
                {songs.map((song) => (
                  <div key={song._id}>
                    <ArtistSongCard
                      id={song._id}
                      name={song.name}
                      thumbnail={song.thumbnail}
                      track={song.track}
                      onClick={() => handleSongClick(song)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {selectedSong && (
        <audio
          src={selectedSong.track}
          autoPlay={isPlaying}
          onEnded={handleSongEnd}
        />
      )}
    </div>
  );
}

export default ArtistSongs;