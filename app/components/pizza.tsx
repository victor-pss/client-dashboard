'use client';
import * as React from 'react';

export default function Pizza({progress}: {progress: string}) {
  const [projectPhases, setProjectPhases] = React.useState<Record<string, number> | null>(null);
  const [currentPhase, setCurrentPhase] = React.useState<number | null>(null);
  const [pizzaTracker, setPizzaTracker] = React.useState<any>([
    {"svg": <NewSVG />, "liClasses": "flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700", "spanClasses": "flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-20 lg:w-20 dark:bg-gray-700 shrink-0"},
    {"svg": <DesignSVG />, "liClasses": "flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700", "spanClasses": "flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-20 lg:w-20 dark:bg-gray-700 shrink-0"}, 
    {"svg": <BuildoutSVG />, "liClasses": "flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700", "spanClasses": "flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-20 lg:w-20 dark:bg-gray-700 shrink-0"}, 
    {"svg": <ReviewsSVG />, "liClasses": "flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700", "spanClasses": "flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-20 lg:w-20 dark:bg-gray-700 shrink-0"}, 
    {"svg": <LiveSVG />, "liClasses": "flex items-center after:content-none", "spanClasses": "flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-20 lg:w-20 dark:bg-gray-700 shrink-0"} 
  ]); // initial pizza tracker values - icon, li classes, and span classes

  React.useEffect(() => {
    // set project phases
    setProjectPhases({
      "New": 1,
      "Assets": 2,
      "Branding": 3,
      "Concept - HP": 4,
      "Buildout": 5,
      "Population": 6,
      "Client Review": 7,
      "Reviews": 8,
      "Live": 9
    });
  }, []);

  React.useEffect(() => {
    if(projectPhases) {
      setCurrentPhase(projectPhases[progress] || null)
    }
  }, [projectPhases, progress])

  // set the current pizza tracker state
  React.useEffect(() => {
    if(currentPhase !== null) {
      let newArr = [...pizzaTracker] // copy pizzaTracker array
      switch(currentPhase) {
        case 9: {
          newArr[4] = {"svg": <CheckMarkSVG />, "liClasses": "flex items-center after:content-none", "spanClasses": "flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-20 lg:w-20 dark:bg-blue-700 shrink-0"} 

          newArr[3] = {"svg": <CheckMarkSVG />, "liClasses": "flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-700", "spanClasses": "flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-20 lg:w-20 dark:bg-blue-700 shrink-0"}
        }
        case 8: {}
        case 7: {
          newArr[2] = {"svg": <CheckMarkSVG />, "liClasses": "flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-700", "spanClasses": "flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-20 lg:w-20 dark:bg-blue-700 shrink-0"}
        }
        case 6: {}
        case 5: {
          newArr[1] = {"svg": <CheckMarkSVG />, "liClasses": "flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-700", "spanClasses": "flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-20 lg:w-20 dark:bg-blue-700 shrink-0"}
        }
        case 4: {}
        case 3: {}
        case 2: {
          newArr[0] = {"svg": <CheckMarkSVG />, "liClasses": "flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-700", "spanClasses": "flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-20 lg:w-20 dark:bg-blue-700 shrink-0"}
        }
        case 1: {
          setPizzaTracker(newArr) // set new pizzaTracker values
          break;
        }
        default: {break;}
      }
    }
  }, [currentPhase, pizzaTracker])

  // Check Mark SVG icon
  function CheckMarkSVG() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className='w-4 h-4 text-blue-600 lg:w-8 lg:h-8 dark:text-blue-300' fill='currentColor' viewBox="0 0 448 512">
        {/* Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc. */}
        <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d="M447.9 142.5l-23.2 22L181 395.3l-22 20.8-22-20.8L23.2 287.6 0 265.6l44-46.5 23.2 22L159 328 380.7 118l23.2-22 44 46.5z"/>
      </svg>
    )
  }

  // New SVG icon
  function NewSVG() {
    return (
      <svg className='w-4 h-4 text-gray-500 lg:w-8 lg:h-8 dark:text-gray-100' aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">
          {/*<!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.-->*/}
          <path d="M384 64L416 0l32 64 64 32-64 32-32 64-32-64L320 96l64-32zM128 192L192 64l64 128 128 64L256 320 192 448 128 320 0 256l128-64zM416 320l32 64 64 32-64 32-32 64-32-64-64-32 64-32 32-64z"/>
      </svg>
    )
  }

  // Design SVG icon
  function DesignSVG() {
    return (
      <svg className="w-4 h-4 text-gray-500 lg:w-8 lg:h-8 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">
        {/*<!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.-->*/}
          <path d="M297.8 153.8L224 80 144 0 32 112 176 256c6.2 0 12.4 .4 18.4 1.2L297.8 153.8zM320 400l80 80 144 32L512 368l-89.8-89.8L318.8 381.6c.8 6 1.2 12.2 1.2 18.4zM535.6 119.6L575.2 80 496 .8 456.4 40.4 227.7 269.1l79.2 79.2L535.6 119.6zM205 291.8c-9.3-2.5-19-3.8-29-3.8c-61.9 0-112 50.1-112 112l0 48L0 448l0 64 176 0c61.9 0 112-50.1 112-112c0-10-1.3-19.8-3.8-29l.1-.1-79.2-79.2-.1 .1z"/>
      </svg>

    )
  }

  // Buildout SVG icon
  function BuildoutSVG() {
    return (
      <svg className="w-4 h-4 text-gray-500 lg:w-8 lg:h-8 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 640 512">
        {/*<!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.-->*/}
          <path d="M256 0L144 0C64.5 0 0 64.5 0 144l0 16 80-32 32 32 144 0 0-32 32 0 0 32 64 0L352 0 288 0l0 32-32 0 0-32zM96 512l128 0L208 192l-96 0L96 512zm320 0l32-96 32 96 160 0 0-192-288 0 0 192 64 0zM352 256l0 32 288 0 0-32-96-64L544 0 448 0l0 192-96 64zM496 64a16 16 0 1 1 0-32 16 16 0 1 1 0 32z"/>
      </svg>
    )
  }

  // Reviews SVG icon
  function ReviewsSVG() {
    return (
      <svg className="w-4 h-4 text-gray-500 lg:w-8 lg:h-8 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 640 512">
        {/*<!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.-->*/}
        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zM448 512l-9.9-32.3C354.3 474.6 288 405 288 320c0-5.4 .3-10.7 .8-16L64 304 0 512l448 0zm0-271.9a80 80 0 1 1 0 160 80 80 0 1 1 0-160zm0 208c26.7 0 51.5-8.2 72-22.1l63.1 62.7 17 16.9 33.8-34-17-16.9-63-62.6c13.9-20.5 22.1-45.3 22.1-71.9c0-70.7-57.3-128-128-128s-128 57.3-128 128s57.3 128 128 128z"/>
      </svg>
    )
  }

  // Live SVG icon
  function LiveSVG() {
    return (
      <svg className="w-4 h-4 text-gray-500 lg:w-8 lg:h-8 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">
          {/*<!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.-->*/}
          <path d="M384 305l0 127L224 512l0-142c0-21.8-8.6-42.6-24-58c-15.3-15.3-36.1-24-57.9-24L0 287.6 80 128l127 0C294.1-15.5 431.8-8.4 502.7 9.3C520.4 80.2 527.5 217.9 384 305zm40-177a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zM166.5 470C117 519.5 .5 511.5 .5 511.5s-8-116.5 41.5-166c34.4-34.4 90.1-34.4 124.5 0s34.4 90.1 0 124.5zm-46.7-36.4c11.4-11.4 11.4-30 0-41.4s-30-11.4-41.4 0c-16.5 16.5-13.8 55.2-13.8 55.2s38.7 2.7 55.2-13.8z"/>
      </svg>
    )
  }


  return (
    // Pizza Tracker format
    <div id='progress' className='mx-auto'>
      <ol className="flex ">
        <li className={pizzaTracker[0].liClasses}>
          <div className='flex flex-col mt-6'>
            <span className={pizzaTracker[0].spanClasses}>
              {pizzaTracker[0].svg}
            </span>
            <span className='text-black w-full text-center'>New</span>
          </div>
        </li>
        <li className={pizzaTracker[1].liClasses}>
          <div className='flex flex-col'>
            <span className={pizzaTracker[1].spanClasses}>
              {pizzaTracker[1].svg}
            </span>
            <span className='absolute text-center text-black lg:mt-20 lg:ml-3 mt-10'>Design</span>
          </div>
        </li>
        <li className={pizzaTracker[2].liClasses}>
          <div className='flex flex-col'>
            <span className={pizzaTracker[2].spanClasses}>
              {pizzaTracker[2].svg}
            </span>
            <span className='absolute text-center text-black lg:mt-20 lg:ml-2 mt-10'>Buildout</span>
          </div>
        </li>
        <li className={pizzaTracker[3].liClasses}>
          <div className='flex flex-col'>
            <span className={pizzaTracker[3].spanClasses}>
              {pizzaTracker[3].svg}
            </span>
            <span className='absolute text-center text-black lg:mt-20 lg:ml-3 mt-10'>Reviews</span>
          </div>
        </li>
        <li className={pizzaTracker[4].liClasses}>
          <div className='flex flex-col'>
            <span className={pizzaTracker[4].spanClasses}>
              {pizzaTracker[4].svg}
            </span>
            <span className='absolute text-center text-black lg:mt-20 lg:ml-6 mt-10'>Live</span>
          </div>
        </li>
      </ol>
    </div>
  )
}
