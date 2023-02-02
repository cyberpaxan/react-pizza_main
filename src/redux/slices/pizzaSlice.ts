import { RootState } from './../store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const { order, sortBy, category, search, currentPage } = params;
        const { data } = await axios.get<Pizza[]>(
            `https://63c52a1cf3a73b34784f68fb.mockapi.io/items?${category}&page=${currentPage}&limit=4&sortBy=${sortBy}&order=${order}${search}`
        );

        return data;
    }
);

type Pizza = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
    rating: number;
};

interface PizzaSliceState {
    items: Pizza[];
    status: 'loading' | 'success' | 'error';
}

const initialState: PizzaSliceState = {
    items: [],
    status: 'loading',
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = 'loading';
            state.items = [];
        });

        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        });

        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = 'error';
            state.items = [];
        });
    },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
