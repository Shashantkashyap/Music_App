import React, { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import "./SongCard.css";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

function SongCard({ id, name, thumbnail, track, onClick, duration }) {
  const [heart, setHeart] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick({ id, name, thumbnail, track });
    }
  };

  const handleHeart = () => {
    setHeart(true);
  };

  return (
    <div
      className="Card-Div w-full flex justify-between items-center lg:p-2 shadow-md lg:mb-2 bg-app-black bg-opacity-50 rounded-md text-white"
      onClick={handleClick}
    >
      {/* left */}
      <div className="flex justify-center items-center lg:gap-3">
        {/* thumbnail */}
        <div
          className="w-12 h-12 bg-cover bg-center p-1 rounded-md"
          style={{
            backgroundImage: `url(${thumbnail})`,
          }}
        ></div>

        {/* name */}
        <div className=" ml-5 text-lg">{name}</div>
      </div>

      {/* right */}
      <div className="flex gap-5 items-center justify-center max-lg:w-0">
        {/* icon */}
        <div className="icon-container" onClick={handleHeart}>
          {heart === false ? (
            <div className="flex items-center lg:gap-5">
              <div className="text-[2px] lg:text-lg">Click to Add ...</div>
              <FaRegHeart />
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <div>Song Added...</div>
              <FaHeart color="Pink" />
            </div>
          )}
        </div>

        {/* length */}
        <div>{duration} </div>

        {/* dots */}
        <div className="dots">
          <HiDotsHorizontal></HiDotsHorizontal>
        </div>
      </div>
    </div>
  );
}

export default SongCard