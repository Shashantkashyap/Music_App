import React, { useEffect, useState } from 'react';
import Card from './Card';
import { useNavigate } from "react-router-dom";
import { makeAuthenticatedGETRequest } from '../../utils/serverHelper';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Content({ text }) {
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("song/get/mysongs");
        setSongs(response.data); 
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

  

  const handleSongClick = (selectedSong) => {
    
    navigate("/singleSong", { state: { song: selectedSong } });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6, 
    slidesToScroll: 3, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          dots:false
        }
      }
    ]
  };

  return (
    <div className='flex flex-col gap-9'>
      <p className='text-white lg:text-2xl text-xl font-semibold'>{text}</p>
      <div className='lg:w-full w-[59%] px-2 '>
        <Slider {...settings}>
          {songs && songs.map((e) => (
            <div key={e.id} className='lg:border-[2px] border-[1px] border-gray-700 rounded-md lg:hover:scale-[1.02]' onClick={() => handleSongClick(e)}>
              <Card title={e.name} name={e.artistName} img={e.thumbnail} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Content;
