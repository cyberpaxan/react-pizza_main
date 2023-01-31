import { RootState } from './../store';
import { createSlice } from '@reduxjs/toolkit';

type Sort = {
    name: string;
    sortProperty:
        | 'rating'
        | 'title'
        | 'price'
        | '-rating'
        | '-title'
        | '-price';
};

interface FilterSliceState {
    searchValue: string;
    categoryId: number;
    currentPage: number;
    sort: Sort;
}

const initialState: FilterSliceState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortProperty: 'rating',
    },
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },
        setSortType(state, action) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
    },
});

export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;
export const sortTypeState = (state: RootState) =>
    state.filter.sort.sortProperty;

export const { setCategoryId, setSortType, setCurrentPage, setSearchValue } =
    filterSlice.actions;

export default filterSlice.reducer;
