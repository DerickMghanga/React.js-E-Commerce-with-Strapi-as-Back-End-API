//Best state management tool
//These states we can store and access them anywhere in your App
//All the actions(functions) will be used through out the app

import React from 'react'
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isCartOpen: false,
    cart: [],
    items: [],

}

export const cartSlice = createSlice({
    name: "cart",
    initialState,

    //functions(actions) to use in our cart component
    reducers: {
        setItems: (state, action) => {
            state.items =action.payload;
        },

        //Add or Update an item to the cart
        addToCart: (state, action) => {
            state.cart = [...state.cart, action.payload.item];
        },

        //remove an Item from the cart
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        },

        //increase number of an item
        increaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload.id) {
                    item.count++;
                }
                return item;
            });
        },

        //decrease number of an item
        decreaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload.id && item.count > 1 ) {
                    item.count--;
                }
                return item;
            });
        },

        //open or close the cart
        setIsCartOpen: (state) => {
            state.isCartOpen = !state.isCartOpen;
        }
    }
});

export const {
    setItems,
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    setIsCartOpen
} = cartSlice.actions

export default cartSlice.reducer;
