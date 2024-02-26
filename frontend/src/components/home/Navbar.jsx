import React from 'react'
import { useCookies } from 'react-cookie';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";


function Navbar() {
   const navigate = useNavigate(); 
   const token = localStorage.getItem("token")
 
  const Upload = ()=>{
    navigate("/uploadSong")
  }

  const handleSignup = ()=>{
    navigate("/signup")
  }

  const handleLogin = ()=>{
    navigate("/login")
  }

  

  const handleLogout = () => {
    
    localStorage.removeItem("token")
    navigate('/login');
  };

  return (
      <div className='flex items-center justify-between p-5'>

      <div className='flex items-center max-lg:w-[10%]'>
      <IoIosArrowBack color='white' fontSize={25}/>
      <IoIosArrowForward color='white' fontSize={25}/>

      </div>


      <div className='flex max-md:gap-4 lg:gap-8 max-md:text-[15px] lg:text-[18px] font-semibold text-gray-400 '>

        
        

        <div className='flex cursor-pointer max-md:gap-3 lg:gap-6 p-2 pr-6'>
        {
           token ? (<div className='flex lg:gap-10 gap-5 text-sm'>
            <p className=' lg:text-lg' onClick={Upload}>Upload Song</p>
            <p className=' bg-gray-600 w-1'></p>
            <div className=' bg-white cursor-pointer lg:px-3 lg:py-1 p-2 text-black rounded-full mt-[1px] text-[15px] transition-all duration-200 hover:scale-[1.02]' onClick={handleLogout}>Logout</div>
      
          </div>) : (
            <div className='flex gap-5'>
              <p className='mt-1' onClick={handleSignup}>Signup</p>
              <p className=' bg-gray-600 w-1'></p>
              <div className=' bg-white cursor-pointer px-3 py-1 text-black rounded-full mt-[1px] text-[15px] transition-all duration-200 hover:scale-[1.02]' onClick={handleLogin}>Login</div>
        
            </div>
          )
        }
        </div>

      </div>

    </div>
  )
}

export default Navbar
