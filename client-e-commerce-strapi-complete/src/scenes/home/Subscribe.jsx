import React from 'react'

import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import { useState } from 'react';

const Subscribe = () => {

    const [email, setEmail] = useState("");

  return (
    <div className='w-[80%] my-20 mx-auto text-center'>
        <button>
            <MarkEmailReadOutlinedIcon fontSize='large' />
        </button>

        <h3 className='text-xl'>Subscribe To Our Newsletter</h3>
        <p className='md:font-bold font-thin'>Recieve 20$ Coupon for your First Order when you CheckOut</p>

        <div className='flex py-[5px] px-1 my-[15px] mx-auto items-center w-[75%] bg-[#F2F2F2]'>
            <input type="text" className='ml-1 flex-1 p-2'
            placeholder='Enter your Email'
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            />

            <p className='px-1 hover:cursor-pointer hover:text-red-600'>Subscribe</p>
        </div>
    </div>
  )
}

export default Subscribe