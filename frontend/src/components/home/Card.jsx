import React from 'react'
import react from "../../assets/react.svg"
import { IoPhoneLandscapeSharp } from 'react-icons/io5'

function Card({title,name,img}) {
  console.log()
  return (
    <div className='max-lg:w-full lg:p-2'>
        <div className='m-1 p-2 rounded-md lg:h-[190px] h-[70px]'>
        <img src={img} alt="" loading='lazy' className='h-full rounded-md'/>
        </div>
        <p className='p-1 px-2 lg:text-xl text-sm text-gray-400'>{title}</p>
        <p className='mx-2 text-[13px] text-gray-400 py-1 pb-2'>{name}</p>
    </div>
  )
}

export default Card
