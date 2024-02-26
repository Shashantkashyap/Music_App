import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/home/Sidebar";
import Navbar from "../components/home/Navbar";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import SongCard from "../components/shared/SongCard";
import { Audio } from "react-loader-spinner";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdOutlinePlayCircleOutline } from "react-icons/md";
import { MdMotionPhotosPaused } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function MySongs() {
  const [songs, setSongs] = useState();
  const [selectedSong, setSelectedSong] = useState(null);
  const [play, setPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("song/get/mysongs");
        setSongs(response);
      } catch (error) {
        if (error.response.status === 401) {
          navigate("/login");
        } else {
          console.error("Error fetching songs:", error);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedSong && play) {
      audioRef.current.src = selectedSong.track;
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [selectedSong, play]);

  useEffect(() => {
    const handleLoadedMetadata = () => {
      setDuration(audioRef.current.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audioRef.current.currentTime);

      if (audioRef.current.currentTime >= audioRef.current.duration) {
        const currentIndex = songs.data.findIndex(
          (song) => song._id === selectedSong._id
        );
        const nextIndex = (currentIndex + 1) % songs.data.length;
        handleSongClick(songs.data[nextIndex]);
      }
    };

    // Add event listeners
    if (audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    }

   
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [selectedSong, songs]);

  const handleSliderChange = (event) => {
    const newTime = parseFloat(event.target.value);
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  const handleSongClick = (song) => {
    setSelectedSong(song);
    setPlay(true);
  };

  

  return (
    <div className="w-full min-h-screen flex">
      <div className="w-1/5   bg-black">
        <Sidebar></Sidebar>
      </div>
      <div className="flex flex-col w-full">
        <div className="bg-black bg-opacity-95">
          <Navbar></Navbar>
        </div>
        <div className="h-full flex flex-col gap-9 p-8 bg-app-black bg-opacity-90">
          {songs ? (
            <div className="flex w-full gap-[5%]">
              <div className="w-[60%]   shadow-md p-5 bg-app-black bg-opacity-30 rounded-md">
                {songs.data.map((e) => (
                  <SongCard
                    id={e._id}
                    name={e.name}
                    thumbnail={e.thumbnail}
                    track={e.track}
                    key={e._id}
                    duration={e.duration}
                    onClick={() => handleSongClick(e)}
                  ></SongCard>
                ))}
              </div>

              <div className="w-[30%] h-[400px]">
                {selectedSong && (
                  <div
                    className="w-full h-[100%] bg-cover rounded-md relative bg-opacity-50 text-white"
                    style={{
                      backgroundImage: `url(${selectedSong.thumbnail})`,
                      backgroundSize: "cover",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <div className="">
                      <div className="absolute bottom-5 left-2 p-4 w-[50%] font-semibold  ">
                        <div className="mb-2">
                          <p>{selectedSong.name}</p>
                        </div>

                        <div className="mb-2 ">
                          <span>Duration: {selectedSong.duration}</span>
                        </div>

                        
                        <div>
                          <HiDotsHorizontal color="white" />
                        </div>
                      </div>
                      <div
                        className="absolute bottom-12 right-2 p-4"
                        onClick={() => setPlay(!play)}
                      >
                        {play === false ? (
                          <MdOutlinePlayCircleOutline fontSize={50} />
                        ) : (
                          <MdMotionPhotosPaused fontSize={50} />
                        )}
                      </div>

                      <div className="absolute bottom-0 left-2 right-2 p-4">
                        <input
                          type="range"
                          value={currentTime}
                          min={0}
                          max={duration}
                          step={1}
                          onChange={handleSliderChange}
                          className=" w-80"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p>
              <Audio
                height="80"
                width="80"
                radius="9"
                color="green"
                ariaLabel="three-dots-loading"
                wrapperStyle
                wrapperClass
              />
            </p>
          )}
        </div>
      </div>
      <audio ref={audioRef} controls style={{ display: "none" }} />
    </div>
  );
}

export default MySongs;
