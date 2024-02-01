import React from 'react';
import googleStore from "../assets/images/googlePlay.png";
import microsoftStore from "../assets/images/microsoftStore.png"

const Download = () => {
  return (
    <div className='download w-[100%] flex flex-col items-center gap-2 '>
        <p className="getApp text-sm">Get the app.</p>
        <div className="downloadImages flex w-[100%] h-10 items-center justify-center gap-2 ">
            <img src={googleStore} alt="" className='w-[40%] h-[100%] rounded-lg' />
            <img src={microsoftStore} alt="" className='w-[40%] h-[100%] rounded-lg' />
        </div>
    </div>
  )
}

export default Download
