import React from 'react'

import { IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import {
    decreaseCount,
    increaseCount,
    removeFromCart,
    setIsCartOpen
} from '../../stateRedux';
import { useNavigate } from 'react-router-dom';


const CartMenu = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart.cart);
    const isCartOpen = useSelector((state) => state.cart.isCartOpen);

    const totalPrice = cart.reduce((total, item) => {
        return total + item.count * item.attributes.price;
    }, 0);

  return (

    //overlay 
    <div className={isCartOpen ? 'block bg-black bg-opacity-25 fixed z-10 w-full h-full left-0 top-0 overflow-auto' : 'hidden'}>
        
        {/* Cart Menu Modal  */}
        <div className='fixed right-0 sm:w-[30%] h-full bg-white'>

            <div className='p-7 overflow-auto h-full'>
                {/* HEADER */}
                <div className='mb-3 flex justify-between items-center'>
                    <h3 className='text-xl font-semibold'>SHOPPING BAG ({cart.length})</h3>
                    <IconButton onClick={()=> dispatch(setIsCartOpen({}))}>
                        <CloseIcon />
                    </IconButton>
                </div>

                {/* CART LIST */}
                <div>
                    {cart.map((item) => (

                        <div key={`${item.attributes.name}-${item.id}`}>
                            <div className='flex justify-between items-center px-0 py-[15px]'>
                                <div className='grow shrink w-40%'>
                                    <img src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`} alt={item?.name} 
                                        width={123} height={164}
                                     />
                                </div>

                                <div className='grow shrink w-60%'>
                                    {/* ITEM NAME */}
                                    <div className='mb-[5px] flex justify-between items-center'>
                                        <p className='font-bold'>
                                            {item.attributes.name}
                                        </p>

                                        <IconButton onClick={() => dispatch(removeFromCart({ id: item.id }))}>
                                            <CloseIcon />
                                        </IconButton>
                                    </div>

                                    <p>{item.attributes.shortDescription}</p>

                                    {/* ITEM AMOUNT */}
                                    <div className='my-[15px] mx-0 flex justify-between items-center'>
                                        <div className='flex items-center border border-solid border-x-yellow-500'>
                                            <IconButton onClick={() => dispatch(decreaseCount({ id: item.id }))}>
                                                <RemoveIcon />
                                            </IconButton>

                                            <p>{item.count}</p>

                                            <IconButton onClick={() => dispatch(increaseCount({ id: item.id }))}>
                                                <AddIcon />
                                            </IconButton>
                                        </div>

                                        {/* ITEM PRICE */}
                                        <p className='font-bold '> ${item.attributes.price}</p>

                                    </div>

                                    
                                
                                </div>
                            </div>
                            <hr />
                        </div>
                    ))}
                </div>

                {/* ACTIONS - bottom part of the CartMenu*/}
                <div className='my-5 mx-0'>
                    <div className='my-5 mx-0 flex justify-between items-center'>
                        <p className='font-bold'>SUB-TOTAL</p>
                        <p className='font-bold'>$ {totalPrice}</p>
                    </div>

                    <button className='my-5 mx-0 bg-gray-700 rounded text-white min-w-full py-5 px-10'
                        onClick={() => {
                            navigate("/checkout");
                            dispatch(()=> setIsCartOpen({}));
                        }}
                    >
                        CHECKOUT
                    </button>
                </div>

            </div>
        </div>
    </div>
  )
}

export default CartMenu