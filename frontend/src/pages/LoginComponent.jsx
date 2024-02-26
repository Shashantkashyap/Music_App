import React, { useState } from 'react'
import logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'
import { makeUnauthenticatedPOSTRequest } from '../utils/serverHelper'

function LoginComponent() {
    const navigate = useNavigate();

    const [data, setData] = useState({
      
      email: "",
      password: "",
      
    });
  
    const handleSubmit=async(e)=>{
      e.preventDefault();
      console.log(data);

      const response = await makeUnauthenticatedPOSTRequest("auth/login", data);
      console.log(response);
      console.log(response);
      const token = response.userToreturn.token;
      
      localStorage.setItem("token",token);
      
      localStorage.setItem("artistId",response.userToreturn._id);
      navigate("/");

    }

    const changeRoute = ()=>{
      navigate("/signup")
    }

  return (
    <div className=' w-full h-full flex flex-col items-center '>
     <div className=' w-full flex flex-col items-center  border-b border-solid border-gray-200 shadow-md'>
     <img src={logo} alt="" width={280}/>
    </div>

    <div className=' w-1/3 py-5 flex flex-col  gap-y-8'>
        <div className=' font-semibold  mx-auto'>
            To continue, login to spotify
        </div>
        <div className={`flex flex-col items-center gap-y-4 `}>
          <label htmlFor="email" className="w-full font-semibold">
             Email Address :
          </label>
          <input
            type="text"
            id="email"
            placeholder="Email Id"
            className="w-full p-2 border border-gray-400 border-solid rounded placeholder-gray-600"
            onChange={(e)=> setData({...data, email:e.target.value})}
          />
        </div>
        <div className=" flex flex-col items-center gap-y-2">
          <label htmlFor="password" className="w-full font-semibold">
            Password :
          </label>
          <input
            type="password"
            id="password"
            placeholder="Confirm Password :"
            value={data.password}
            className="w-full p-2 border border-gray-400 border-solid rounded placeholder-gray-600"
            onChange={(e)=> setData({...data, password:e.target.value})}
          />
        </div>

        <div className='flex items-center justify-end mt-8'>
        <button className=' bg-green-400 font-semibold p-3 px-10 rounded-full' onClick={handleSubmit}>LogIn</button>

        </div>
        <div className='border border-solid border-gray-200'></div>

        <div className=' font-semibold text-lg mx-auto' >Don't have an account ? </div>

        <div className='w-full p-3 text-gray-600 font-bold rounded-full flex  justify-center border border-solid border-gray-200' onClick={changeRoute}>SIGN UP FOR SPOTIFY</div>
    </div>


    </div>
  )
}

export default LoginComponent
