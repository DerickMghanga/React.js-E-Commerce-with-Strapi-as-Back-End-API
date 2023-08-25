import React, { useEffect, useState} from 'react'

import { Tab, Tabs } from '@mui/material';
import Item from '../../components/Item';
import { useDispatch, useSelector } from 'react-redux';
import { setItems } from '../../stateRedux';

const ShoppingList = () => {

  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);
  console.log('items', items);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //This function will call the Back-End from Strapi to get the Items
  async function getItems () {
    const items = await fetch(
      "http://localhost:1337/api/items?populate=image", //get Items with their Images
      { method: "GET" }
    );

    const itemsJson = await items.json(); //Parse the data recieved to JSON object
    
    dispatch(setItems(itemsJson.data))
  }

  //Used to call the FetchAPI function
  useEffect(() => {
    getItems();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps 

  const topRatedItems = items.filter(
    (item) => item.attributes.category === "topRated"
  );

  const newArrivalsItems = items.filter(
    (item) => item.attributes.category === "newArrivals"
  );

  const bestSellersItems = items.filter(
    (item) => item.attributes.category === "bestSellers"
  );

  return (
    <div className='w-full md:w-[86%] my-12 md:my-20 mx-auto'>
      <h3 className='text-center text-xl'> Our Featured <b>Products</b></h3>

      <Tabs textColor='primary' indicatorColor='primary'
        value={value} onChange={handleChange} centered TabIndicatorProps={{}}
      >
        <Tab label="ALL" value="all" />
        <Tab label="NEW ARRIVALS" value="newArrivals" />
        <Tab label="BEST SELLERS" value="bestSellers" />
        <Tab label="TOP RATED" value="topRated" />
      </Tabs>

      <div className='my-0 ml-14 md:ml-0 md:mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 
        justify-around md:gap-y-5 md:gap-x-[1.33%]'
      >

        { value === "all" && items.map((item) => (
          <Item item={item} key={`${item.name}-${item.id}`} />
        ))}

        { value === "newArrivals" && newArrivalsItems.map((item) => (
          <Item item={item} key={`${item.name}-${item.id}`} />
        ))}

        { value === "bestSellers" && bestSellersItems.map((item) => (
          <Item item={item} key={`${item.name}-${item.id}`} />
        ))}

        { value === "topRated" && topRatedItems.map((item) => (
          <Item item={item} key={`${item.name}-${item.id}`} />
        ))}

      </div>
    </div>
  )
}

export default ShoppingList