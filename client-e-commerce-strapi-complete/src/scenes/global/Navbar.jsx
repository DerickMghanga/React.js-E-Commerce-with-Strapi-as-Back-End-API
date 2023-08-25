import React from 'react'
import { useDispatch} from 'react-redux';
import { IconButton } from '@mui/material';
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { setIsCartOpen } from '../../stateRedux';

const Navbar = () => {

  //function used to direct to a specific page/router
  const navigate = useNavigate();

  //functio used to dispatch action(execute)
  const dispatch = useDispatch();

  // const cart = useSelector((state) => state.cart.cart)

  return (
    <div className='flex items-center w-full h-[60px] bg-slate-50 fixed top-0 left-0 z-[1]'>
      
      <div className='w-[90%] m-auto flex justify-between items-center'>
        <div onClick={()=> navigate('/')} className='hover cursor-pointer font-bold text-xl md:text-2xl text-red-500'>
          URBAN TRENDZ
        </div>

        <div className='flex justify-between gap-5 z-[2]'>
          <IconButton className='text-black'>
            <SearchOutlined />
          </IconButton>

          <IconButton className='text-black'> 
            <PersonOutline />
          </IconButton>

          <IconButton onClick={() => dispatch(setIsCartOpen({}))} className='text-black'>
            <ShoppingBagOutlined />
          </IconButton>

          <IconButton className='text-black'>
            <MenuOutlined />
          </IconButton>
        </div>

      </div>
    </div>
  )
}

export default Navbar