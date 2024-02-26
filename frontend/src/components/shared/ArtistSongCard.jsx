import React, { useState, useEffect, useCallback } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdMotionPhotosPaused, MdPlayCircle } from "react-icons/md";

function ArtistSongCard({ id, name, thumbnail, track, onClick, onSongEnd }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audio, setAudio] = useState(new Audio(track)); 
  
  useEffect(() => {
    // Update audio object when track prop changes
    setAudio(new Audio(track));
  }, [track]);

  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false); 
      if (onSongEnd) {
        onSongEnd();
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audio, onSongEnd]);

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause(); 
    } else {
      audio.play(); 
    }
    setIsPlaying((prevState) => !prevState); 
  };

  const handleSeek = (event) => {
    const seekTime = event.target.value;
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleLoadedMetadata = useCallback(() => {
    setDuration(audio.duration);
  }, [audio]);

  const handleTimeUpdate = useCallback(() => {
    setCurrentTime(audio.currentTime);
  }, [audio]);

  useEffect(() => {
    const handleEnded = () => {
      setIsPlaying(false);
      if (onSongEnd) {
        onSongEnd();
      }
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audio, onSongEnd]);

  useEffect(() => {
    // Pause previously playing audio when a new song is played
    const pausePreviousSong = () => {
      const audioElements = document.querySelectorAll("audio");
      audioElements.forEach((audioElement) => {
        if (audioElement !== audio) {
          audioElement.pause();
        }
      });
    };

    pausePreviousSong();

    return () => {
      pausePreviousSong(); // Cleanup function
    };
  }, [audio]);


 

  return (
    <div className="Card-Div flex justify-between items-center p-2 shadow-md mb-2 bg-app-black bg-opacity-50 rounded-md text-white">
      <div className="flex flex-col lg:flex-row  items-center gap-3">
        <div
          className="lg:w-12 w-10 h-12 bg-cover bg-center p-1 flex-shrink-0"
          style={{ backgroundImage: `url(${thumbnail})` }}
        ></div>
        <div className=" w-10">{name.slice(0,5)}</div>
        <div className="flex gap-5 items-center">
          <div onClick={togglePlay}>
            {isPlaying ? (
              <MdMotionPhotosPaused fontSize={25} />
            ) : (
              <MdPlayCircle fontSize={25} />
            )}
          </div>
          <div className="flex-1">
            <input
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className=" w-full lg:w-[500%]"
            />
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-5">
        
        <div>{formatTime(currentTime)}</div>
        <div>{formatTime(duration)}</div>
        <div className="dots">
          <HiDotsHorizontal />
        </div>
      </div>
    </div>
  );
}

// Function to format time in mm:ss format
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

export default ArtistSongCard;
