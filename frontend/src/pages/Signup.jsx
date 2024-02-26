import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { makeUnauthenticatedPOSTRequest } from '../utils/serverHelper'


function Signup() {
  const navigate = useNavigate();
  
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
    address: "",
  });

  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(data);

    const response = await makeUnauthenticatedPOSTRequest("auth/register", data);
      console.log(response);
      const token = response.userToreturn.token;
      console.log(token, "TOKEN");
      
      localStorage.setItem("token",token);
      
      localStorage.setItem("artistId",response.userToreturn._id);
      
      navigate("/");


  }

    return (
    <div className=" w-full h-full flex flex-col items-center ">
      <div className=" w-full flex flex-col items-center  border-b border-solid border-gray-200 shadow-md">
        <img src={logo} alt="" width={280} />
      </div>

      <div className=" w-1/3 py-5 flex flex-col  gap-y-8">
        <div className="text-lg font-semibold  mx-auto">
          To continue, login to spotify
        </div>
        <div className={`flex flex-col items-center gap-y-4 `}>
          <label htmlFor="address" className="w-full font-semibold">
            Enter Address :
          </label>
          <input
            type="text"
            id="address"
            placeholder="Enter Email Id"
            value={data.address}
            className="w-full p-2 border border-gray-400 border-solid rounded placeholder-gray-600"
            onChange={(e)=> setData({...data, address:e.target.value})}
          />
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

        <div className={`flex flex-col items-center gap-y-4 `}>
          <label htmlFor="user" className="w-full font-semibold">
            What should we call you :
          </label>
          <input
            type="text"
            id="user"
            placeholder="Enter Username"
            className="w-full p-2 border border-gray-400 border-solid rounded placeholder-gray-600"
            onChange={(e)=> setData({...data, userName:e.target.value})}
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

        <div className=" flex flex-col items-center gap-y-2">
          <label htmlFor="confirm" className="w-full font-semibold">
            Confirm Password :
          </label>
          <input
            type="password"
            id="confirm"
            placeholder="Enter Password again"
            value={data.confirmPassword}
            className="w-full p-2 border border-gray-400 border-solid rounded placeholder-gray-600"
            onChange={(e)=> setData({...data, confirmPassword:e.target.value})}
          />
        </div>

        <div className="flex flex-col gap-y-6 lg:flex-row lg:gap-x-14">
          <div className=" flex flex-col items-center gap-y-2">
            <label htmlFor="first" className="w-full font-semibold">
              First name :
            </label>
            <input
              type="text"
              id="first"
              placeholder="Enter first name"
              value={data.firstName}
              className="w-full p-2 border border-gray-400 border-solid rounded placeholder-gray-600"
              onChange={(e)=> setData({...data, firstName:e.target.value})}
            />
          </div>

          <div className=" flex flex-col items-center gap-y-2">
            <label htmlFor="last" className="w-full font-semibold">
              Last Name :
            </label>
            <input
              type="text"
              id="last"
              placeholder="Enter Last name"
              value={data.lastName}
              className="w-full p-2 border border-gray-400 border-solid rounded placeholder-gray-600"
              onChange={(e)=> setData({...data, lastName:e.target.value})}
            />
          </div>
        </div>

        <div className="flex items-center justify-center mt-8">
          <button type="Submit" className=" bg-green-400 font-semibold p-3 px-10 rounded-full" onClick={handleSubmit} >
            Sign Up
          </button>
        </div>
        <div className="border border-solid border-gray-200"></div>

        <div className=" font-semibold text-lg mx-auto">
          Already have an account ?{" "}
        </div>

        <div className="w-full p-3 text-gray-600 font-bold rounded-full flex  justify-center border border-solid border-gray-200">
          LOG IN FOR SPOTIFY
        </div>
      </div>
    </div>
  );
}

export default Signup;
