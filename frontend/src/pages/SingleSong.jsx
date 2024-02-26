import React, { useState, useEffect } from 'react';
import Sidebar from "../components/home/Sidebar";
import Navbar from '../components/home/Navbar';
import { FaRegCirclePlay, FaRegCirclePause } from "react-icons/fa6";
import { useLocation } from 'react-router-dom';

function SingleSong() {
  const location = useLocation();
  const { song } = location.state;
  const [play, setPlay] = useState(false);
  const [audio, setAudio] = useState(new Audio(song.track));
  const [currentTime, setCurrentTime] = useState(0);

  const handlePlay = () => {
    if (play) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlay(!play);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audio.currentTime);
  };

  useEffect(() => {
    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [audio]);

  const handleSeek = (e) => {
    const seekTime = e.target.value;
    setCurrentTime(seekTime);
    audio.currentTime = seekTime;
  };

  useEffect(() => {
    return () => {
      // Clean up when component unmounts
      audio.pause();
    };
  }, [audio]);

  useEffect(() => {
    // Stop the previous song if a new song is selected
    const newAudio = new Audio(song.track);
    setAudio(newAudio);
    setPlay(false);
    setCurrentTime(0);
  }, [song]);

  return (
    <div className='flex min-h-screen '>
      {/* Sidebar */}
      <div className="w-1/5 min-h-screen bg-black">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className='flex flex-col w-full'>
        {/* Navbar */}
        <div className='bg-black bg-opacity-95'>
          <Navbar />
        </div>

        {/* Song Details */}
        <div className="relative flex-1 overflow-hidden text-red-300">
          <div
            className="w-full h-full bg-contain bg-center p-1 flex-shrink-0 relative"
            style={{ backgroundImage: `url(${song.thumbnail})` }}
          >
            <div className=' flex flex-col gap-5 text-center py-4 text-red-100'>
              <h1 className='text-4xl font-semibold'>{song.name}</h1>
              <p className='text-lg'>{song.artistName}</p>
            </div>
            {/* Play/Pause button */}
            <div className='absolute lg:bottom-10 lg:left-32 bottom-20 left-0'>
              <div className='flex gap-5 w-[800px]'>
                <div onClick={handlePlay} className='cursor-pointer'>
                  {play ? <FaRegCirclePause size={40} /> : <FaRegCirclePlay size={40} />}
                </div>
                <div className='flex items-center justify-center w-full'>
                  <input
                    type="range"
                    style={{ width: '90%' }}
                    className='lg:w-full w-[10%]'
                    value={currentTime}
                    max={audio.duration}
                    onChange={handleSeek}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleSong;
