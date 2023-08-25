import React from 'react';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { addToCart } from '../stateRedux';
import { useNavigate } from 'react-router-dom';

//item property or data comes from the strapi back-end

const Item = ({ item, width }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const { category, price, name, image} = item.attributes;
  const { 
    data: {
      attributes: {
        formats: {
          medium: { url }
        }
      }
    }
  } = image;

  return (
    <div width={width} className='mx-2 my-3 md:border md:rounded-md' >
      <div className='relative' onMouseOver={() => setIsHovered(true)} onMouseOut={() => setIsHovered(false)}>

        <img src={`http://localhost:1337${url}`} alt={item.name} width="300px" height="400px"
        onClick={() => navigate(`/item/${item.id}`)}
        className='cursor-pointer'
        />

        <div className={isHovered ? 'block absolute bottom-[10%] left-0 w-full py-0 px-[5%]' : 'hidden'}>

          <div className='flex gap-3 justify-between'>
            {/* ITEM AMOUNT */}
            <div className='flex gap-3 items-center bg-[#f5f5f5] rounded'>
              <button onClick={() => setCount(Math.max(count - 1, 1))}>
                  <RemoveIcon />
              </button>

              <p className='text-[#666666]'>{count}</p>

              <button onClick={() => setCount(count + 1)}>
                  <AddIcon />
              </button>
            </div>

            {/* ITEM BUTTON */}
            <button onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            className='bg-[#666666] rounded-md p-2 text-white'>
              ADD TO CART
            </button>

          </div>

        </div>
      </div>

      <div className='mt-[3px]'>
        <h3 className='text-[#7c7b7b]'>
          {category
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())
          } 
        </h3>

        <p>{name}</p>
        <p className='font-bold'>${price}</p>
      </div>
    </div>
  )
}

export default Item