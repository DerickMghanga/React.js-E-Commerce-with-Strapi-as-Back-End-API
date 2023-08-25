import React from 'react'

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

//Import all Images from 'assets' folder;
const importAll  = (r) => 
    r.keys().reduce((acc, item)=> {
        acc[item.replace("./", "")] = r(item);
        return acc;
    }, {})

//Have all our imports in One line
const heroTextureImports = importAll(
    require.context("../../assets", false, /\.(png|jpe?g|svg)$/)
);
///////////////////////////////////////////

const MainCarousel = () => {
  return (
    <Carousel infiniteLoop={true} showThumbs={false} showIndicators={false} showStatus={false}
            autoPlay={true} interval={7000} swipeable={true}
        //Handles the prev button click
        renderArrowPrev={(onClickHandler) => (
            <button onClick={onClickHandler} className='absolute hover:bg-slate-500 rounded-full top-[50%] left-0 text-white p-1 z-10'>
                <NavigateBeforeIcon className='text-4xl'/>
            </button>
            )
        }
        //Handles the Next button click
        renderArrowNext={(onClickHandler) => (
            <button onClick={onClickHandler} className='absolute hover:bg-slate-500 rounded-full top-[50%] right-0 text-white p-1 z-10'>
                <NavigateNextIcon className='text-4xl'/>
            </button>
            )
        }

    >
        {/* Grab all the images and cycle them using map fxn */}
        {Object.values(heroTextureImports).map((texture, index) => (
            <div key={`carousel-image-${index}`}>
                <img src={texture} alt={`carousel-${index}`} className='w-full h-[700px] object-cover bg-fixed'/>

                <div className='bg-transparent p-5 rounded-md text-left my-0 mx-auto
                    absolute top-[40%] sm:top-[46%] left-0 sm:left-[10%] right-0 sm:right-[60%] max-w-[240px]'
                >
                    <p className='text-red-400 text-[18px]'> --NEW ITEMS</p>
                    <h1 className=' text-gray-800 text-xl'>SUMMER SALES</h1>
                    <p className='font-bold text-[16px] text-red-500 underline-offset-3'>DISCOVER MORE</p>
                </div>
            </div>
        ))}
    </Carousel>
  )
}

export default MainCarousel