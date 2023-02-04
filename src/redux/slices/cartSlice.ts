import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { RootState } from '../store';

export type CartItem = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
    count: number;
};

interface CartSliceState {
    totalPrice: number;
    items: CartItem[];
}

const { items, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
    totalPrice,
    items,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload.id
            );

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({ ...action.payload, count: 1 });
            }

            state.totalPrice = calcTotalPrice(state.items);
        },

        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload
            );

            if (findItem) {
                findItem.count--;
                state.totalPrice = state.totalPrice - findItem.price;

                if (findItem.count === 0) {
                    state.items = state.items.filter(
                        (obj) => obj.id !== action.payload
                    );
                }
            }
        },

        removeItem(state, action: PayloadAction<string>) {
            const delItem = (state.items = state.items.filter(
                (obj) => obj.id !== action.payload
            ));
            const arr: number[] = [];
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

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
    state.cart.items.find((obj) => obj.id === id);

export const { addItem, minusItem, clearItems, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
