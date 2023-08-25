import React from 'react'

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Tab, Tabs } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { addToCart } from '../../stateRedux';
import { useParams } from 'react-router-dom';

import Item from '../../components/Item';

//item property or data comes from the strapi back-end

const ItemsDetails = () => {

  const dispatch = useDispatch();
  const { itemId } = useParams(); //Grabs the ID from the Item URL path Route(check >>> App.js)
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);

  //Make API call from the Backend amd grab then save the specific Item via ItemId
  //so that we can use it on this page
  const [item, setItem] = useState(null);

  const [items, setItems] = useState([]); //Used in the Related Products section

  //for the Tabs
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  //here we get a single item that has been clicked by the user
  async function getItem() {
    const item = await fetch(
      `http://localhost:1337/api/items/${itemId}?populate=image`,
      { method: "GET" }
    );

    const itemJson = await item.json(); //Convert to JSON format
    setItem(itemJson.data);
  }

  //fetch Items for the related products section
  async function getItems() {
    const items = await fetch(
      "http://localhost:1337/api/items?populate=image", //get Items with their Images
      { method: "GET" }
    );

    const itemsJson = await items.json(); //Parse the data recieved to JSON object
    
    setItems(itemsJson.data);
  }

  //Call both API and only change the {itemId}
  useEffect(()=> {
    getItem();
    getItems();
  }, [itemId]); // es-lint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='w-[88%] my-20 mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

        {/* Image Section */}
        <div className='mb-10 object-contain'>
          <img
            src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
            alt={item?.name}
            className='w-full h-full'
           />
        </div>

        {/* ACTIONS */}
        <div className='mb-10'>
          <div className='flex justify-between'>
            <div className='font-bold'>Home/Item</div>
            <div className='font-bold'>Prev / Next</div> 
          </div>

          <div className='mx-0 mt-16 mb-6'>
            <h3>{item?.attributes?.name}</h3>
            <p>${item?.attributes?.price}</p>
            <p className='mt-5'>{item?.attributes?.shortDescription}</p>
          </div>

          {/* COUNT and (Add to Cart) BUTTON */}
          <div className='flex justify-between items-center min-h-[50px]'>

            <div className='flex gap-3 border items-center border-solid border-[#e2e1e1] mr-5 py-[2px] px-[5px]'>
              <button onClick={() => setCount(Math.max(count - 1, 1))}>
                    <RemoveIcon />
                </button>

                <p className='text-black text-[14px]'>{count}</p>

                <button onClick={() => setCount(count + 1)}>
                    <AddIcon />
                </button>
            </div>

            <button className='bg-slate-500 rounded-full text-[14px] md:min-w-[150px] py-1 px-1'
              onClick={() => dispatch(addToCart({ item: {...item, count}}))}
            >ADD TO CART</button>

          </div>

          {/* Wish-List and Category */}
          <div>
            <div className='mt-5 mb-1 mx-0 flex'>
              <FavoriteBorderOutlinedIcon />
              <p className='ml-1'>Add to Wishlist</p>
            </div>

            <p>CATEGORIES: {item?.attributes?.category}</p>
          </div>
        </div>
      </div>

      {/* INFORMATION / DESCRIPTION / REVIEWS SECTION */}
      <div className='my-5 mx-0'>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="DESCRIPTION" value="description" />
          <Tab label="REVIEWS" value="reviews" />
        </Tabs>
      </div>
      <div className='flex flex-wrap gap-[15px]'>
        { value === "description" && (
          <div> {item?.attributes?.longDescription} </div>
        )}

        {value === "reviews" && <div>Reviews</div>}
      </div>

      {/* RELATED ITEMS SECTION */}
      <div className='mt-12 w-full'>
        <h3 className='text-[17px] font-bold'> Related Products </h3>

        <div className='mt-20px flex flex-wrap justify-between'>
          {/* Map only 8 Items and sort/display them Randomly */}
          {items.slice(0, 8).map((item, i) => (
            <Item item={item} key={`${item.name}-${i}`}/>
          )).sort(()=> {return 0.5 - Math.random()})}  
        </div>
      </div>
    </div>
  )
}

export default ItemsDetails