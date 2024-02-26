import React, { useState } from 'react';
import LOGO from "../../assets/LOGO.svg";
import { FaHome } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { IoLibrarySharp } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { IoIosGlobe } from "react-icons/io";
import { FaMusic } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'


function Home() {
  const [active, setActive] = useState("");
  const navigate = useNavigate();

  const handleActive = (item) => {
    setActive(item);
  };

  const handleMySong = ()=>{
    navigate("/artistSongs")
  }

  const handleHome = ()=>{
    navigate("/")
  }

  const handleLibrary = ()=>{
    navigate("/allSong")
  }

  const handleSearch = ()=>{
    navigate("/searchSong")
  }



  return (
    <div className=' w-full flex'>
      <div className=' w-full h-full bg-black relative'>
        <div className='lg:p-2 p-2 py-6'>
          <img src={LOGO} alt="" className='lg:w-[99%]'/>
        </div>

        <div className='lg:p-5 p-2 flex flex-col gap-3 cursor-pointer '>
          <div className=" flex items-center lg:gap-6 gap-2" onClick={() => handleActive("Home")}>
            <FaHome color='white' fontSize={22}></FaHome>
            <p className={`lg:text-20px text-sm font-semibold hover:text-white ${active === "Home" ? "text-white" : "text-gray-400"}`} onClick={handleHome}>Home</p>
          </div>

          <div className='flex items-center lg:gap-6 gap-1' onClick={() => handleActive("Search")}>
            <IoSearchSharp color='white' fontSize={22}></IoSearchSharp>
            <p className={`lg:text-20px text-sm font-semibold hover:text-white ${active === "Search" ? "text-white" : "text-gray-400"}`} onClick={handleSearch}>Search</p>
          </div>

          <div className='flex items-center lg:gap-6 gap-2' onClick={() => handleActive("Library")}>
            <IoLibrarySharp color='white' fontSize={22}></IoLibrarySharp>
            <p className={`lg:text-20px text-sm font-semibold hover:text-white ${active === "Library" ? "text-white" : "text-gray-400"}` } onClick={handleLibrary}>Library</p>
          </div>

          <div className='flex items-center lg:gap-6 gap-2' onClick={() => handleActive("Music")}>
            <FaMusic color='white' fontSize={22}></FaMusic>
            <p className={`lg:text-20px text-sm font-semibold hover:text-white ${active === "Music" ? "text-white" : "text-gray-400"}`} onClick={handleMySong}>My Music</p>
          </div>
        </div>

        <div className='lg:p-5 flex flex-col gap-5 cursor-pointer text-sm '>

        <div className='flex items-center lg:gap-4 gap-2' onClick={() => handleActive("Playlist")}>
            <IoMdAdd color='white' fontSize={25}></IoMdAdd>
            <p className={`lg:text-20px text-sm font-semibold hover:text-white ${active === "Playlist" ? "text-white" : "text-gray-400"}`}>Create Playlist</p>
        </div>

        <div className='flex items-center lg:gap-5 gap-2' onClick={() => handleActive("Liked")}>
            <FaRegHeart color='white' fontSize={22}></FaRegHeart>
            <p className={`lg:text-20px font-semibold hover:text-white ${active === "Liked" ? "text-white" : "text-gray-400"}`}>Liked Songs</p>
        </div>

       </div>

       <div className=' cursor-pointer transition-all duration-200 hover:scale-[1.01] flex items-center lg:gap-3 rounded-full w-fit mx-auto mt-64 lg:px-4 py-1  text-white border border-gray-100'>
        <IoIosGlobe fontSize={25} className=' max-lg:w-0'></IoIosGlobe>
        <p className='lg:text-lg font-semibold max-lg:p-1'>English</p>
       </div>
      </div>
    </div>
  );
}

export default Home;
