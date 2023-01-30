import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    totalPrice: 0,
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload.id
            );

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({ ...action.payload, count: 1 });
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum;
            }, 0);
        },

        minusItem(state, action) {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload
            );

            if (findItem) {
                findItem.count--;
                state.totalPrice = state.totalPrice - findItem.price;
            }
            if (findItem.count === 0) {
                state.items = state.items.filter(
                    (obj) => obj.id !== action.payload
                );
            }
        },

        removeItem(state, action) {
            const delItem = (state.items = state.items.filter(
                (obj) => obj.id !== action.payload
            ));
            const arr = [];
            delItem.forEach((value) => arr.push(value.price * value.count));
            const sum = arr.reduce((acc, number) => acc + number, 0);
            state.totalPrice = state.totalPrice - (state.totalPrice - sum);
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});

export const selectCart = (state) => state.cart;
export const selectCartItemById = (id) => (state) =>
    state.cart.items.find((obj) => obj.id === id);

export const { addItem, minusItem, clearItems, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
