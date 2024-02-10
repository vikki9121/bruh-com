// cartSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            state.push(action.payload)
        },
        deleteFromCart(state, action) {
            return state.filter(item => item.id !== action.payload.id);
        },
        updateQuantityInCart(state, action) {
            const { id, quantity } = action.payload;
            const productIndex = state.findIndex((item) => item.id === id);
            if (productIndex !== -1) {
                state[productIndex].quantity = quantity;
            }
        },
        updateCart(state, action) {
            return action.payload;
        },
    }
});

export const {
    addToCart,
    deleteFromCart,
    updateQuantityInCart,
    updateCart
} = cartSlice.actions;

export default cartSlice.reducer;
