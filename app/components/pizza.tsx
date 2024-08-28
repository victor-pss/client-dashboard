'use client';
import * as React from 'react';

export default function Pizza({progress}: {progress: string}) {
  

  function CheckMarkSVG() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className='w-4 h-4 text-blue-600 lg:w-8 lg:h-8 dark:text-blue-300' fill='currentColor' viewBox="0 0 448 512">
        {/* Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc. */}
        <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d="M447.9 142.5l-23.2 22L181 395.3l-22 20.8-22-20.8L23.2 287.6 0 265.6l44-46.5 23.2 22L159 328 380.7 118l23.2-22 44 46.5z"/>
      </svg>
    )
  }

  function NewSVG() {
    return (
      <svg className='w-4 h-4 text-gray-500 lg:w-8 lg:h-8 dark:text-gray-100' aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">
          {/*<!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.-->*/}
          <path d="M384 64L416 0l32 64 64 32-64 32-32 64-32-64L320 96l64-32zM128 192L192 64l64 128 128 64L256 320 192 448 128 320 0 256l128-64zM416 320l32 64 64 32-64 32-32 64-32-64-64-32 64-32 32-64z"/>
      </svg>
    )
  }

  function BrandingSVG() {
    return (
      <svg className="w-4 h-4 text-gray-500 lg:w-8 lg:h-8 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">
        {/*<!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.-->*/}
        <path d="M345.9 320l-64 0 20.9-71L263 209.3 160.4 239.5c.8-16.3 2.8-32.1 5.7-47.5l179.7 0c3.9 20.5 6.1 41.9 6.1 64s-2.2 43.5-6.1 64zM128.1 249L1.8 286.1C.6 276.2 0 266.2 0 256c0-22.1 2.8-43.5 8.1-64l125.6 0c-3.2 18.3-5.2 37.3-5.5 57zM234.5 481.1l38-129.1 65.9 0c-11.4 40.2-28.4 75.9-45.8 105.4c-13 21.9-25.9 40-36.5 53.5c-6.4-8.2-13.8-18.2-21.5-29.8zM384 256c0-22.1-2-43.5-5.6-64l125.6 0c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64l-125.6 0c3.6-20.5 5.6-41.9 5.6-64zm-12.6-96c-17-65.6-48.3-120-74-156.7c89.2 14.5 163 75.2 196 156.7l-122 0zm-197.7 0c11.4-40.2 28.4-75.9 45.8-105.4c13-21.9 25.9-40 36.5-53.5c10.5 13.5 23.5 31.6 36.5 53.5c17.4 29.4 34.5 65.1 45.8 105.4l-164.6 0zM214.6 3.3c-25.7 36.7-57 91-74 156.7l-122 0c33-81.5 106.7-142.2 196-156.7zM371.4 352l122 0c-33 81.5-106.7 142.2-196 156.7c25.7-36.7 57-91 74-156.7zM0 320l254.5-74.9 12.3 12.3L192 512l-48-96-1.4-1.4-96 96L1.4 465.4l96-96L96 368 0 320z"/>
      </svg>

    )
  }

  function BuildoutSVG() {
    return (
      <svg className="w-4 h-4 text-gray-500 lg:w-8 lg:h-8 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 640 512">
        {/*<!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.-->*/}
        <path d="M96 0l32 0L256 0l16.6 0 9.6 13.5 96 136 5.9 8.3 0 2.2 0 8 0 56 0 96L0 320 0 160l96 0L96 32 96 0zM239.4 64L160 64l0 96 147.2 0L239.4 64zM80 416c-8.8 0-16 7.2-16 16s7.2 16 16 16l256 0c8.8 0 16-7.2 16-16s-7.2-16-16-16L80 416zM0 432c0-44.2 35.8-80 80-80l256 0c44.2 0 80 35.8 80 80s-35.8 80-80 80L80 512c-44.2 0-80-35.8-80-80zM640 320l0 64 0 48c0 44.2-35.8 80-80 80l-112 0 0-48L576 336l0-208L416 288l0-128L576 0l64 0 0 320z"/>
      </svg>
    )
  }

  function ReviewsSVG() {
    return (
      <svg className="w-4 h-4 text-gray-500 lg:w-8 lg:h-8 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 640 512">
        {/*<!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.-->*/}
        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zM448 512l-9.9-32.3C354.3 474.6 288 405 288 320c0-5.4 .3-10.7 .8-16L64 304 0 512l448 0zm0-271.9a80 80 0 1 1 0 160 80 80 0 1 1 0-160zm0 208c26.7 0 51.5-8.2 72-22.1l63.1 62.7 17 16.9 33.8-34-17-16.9-63-62.6c13.9-20.5 22.1-45.3 22.1-71.9c0-70.7-57.3-128-128-128s-128 57.3-128 128s57.3 128 128 128z"/>
      </svg>
    )
  }

  function LiveSVG() {
    return (
      <svg className="w-4 h-4 text-gray-500 lg:w-8 lg:h-8 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">
          {/*<!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.-->*/}
          <path d="M384 305l0 127L224 512l0-142c0-21.8-8.6-42.6-24-58c-15.3-15.3-36.1-24-57.9-24L0 287.6 80 128l127 0C294.1-15.5 431.8-8.4 502.7 9.3C520.4 80.2 527.5 217.9 384 305zm40-177a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zM166.5 470C117 519.5 .5 511.5 .5 511.5s-8-116.5 41.5-166c34.4-34.4 90.1-34.4 124.5 0s34.4 90.1 0 124.5zm-46.7-36.4c11.4-11.4 11.4-30 0-41.4s-30-11.4-41.4 0c-16.5 16.5-13.8 55.2-13.8 55.2s38.7 2.7 55.2-13.8z"/>
      </svg>
    )
  }

  return (

    <div id='progress' className='mx-auto'>
      <ol className="flex ">
        <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
          <div className='flex flex-col mt-6'>
            <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-20 lg:w-20 dark:bg-gray-700 shrink-0">
              <NewSVG />
            </span>
            <span className='text-center text-black'>New</span>
          </div>
        </li>
        <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
          <div className='flex flex-col'>
            <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-20 lg:w-20 dark:bg-gray-700 shrink-0">
              <BrandingSVG />
            </span>
            <span className='absolute text-center text-black mt-20 ml-2'>Branding</span>
          </div>
        </li>
        <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
          <div className='flex flex-col'>
            <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-20 lg:w-20 dark:bg-gray-700 shrink-0">
              <BuildoutSVG />
            </span>
            <span className='absolute text-center text-black mt-20 ml-2'>Buildout</span>
          </div>
        </li>
        <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
          <div className='flex flex-col'>
            <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-20 lg:w-20 dark:bg-gray-700 shrink-0">
              <ReviewsSVG />
            </span>
            <span className='absolute text-center text-black mt-20 ml-3'>Reviews</span>
          </div>
        </li>
        <li className="flex items-center after:content-none">
          <div className='flex flex-col'>
            <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-20 lg:w-20 dark:bg-gray-700 shrink-0">
              <LiveSVG />
            </span>
            <span className='absolute text-center text-black mt-20 ml-6'>Live</span>
          </div>
        </li>
      </ol>
    </div>
  )
}
