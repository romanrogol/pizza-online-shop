import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { buildQueries } from '@testing-library/react';
import axios from "axios";
import { FetchPizzasArgs, Pizza, PizzaSliceState, Status } from './types';



const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING, //loading | success | error   
};

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>('pizza/fetchPizzasStatus', async(params) => {
    const {sortBy, order, category, search, currentPage = 1} = params;
    const {data} = await axios.get<Pizza[]>(`https://63a5a1a2318b23efa79941cc.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,);
    return data;
});

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) =>{
            state.status = Status.LOADING;
            state.items = [];
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) =>{
            state.items = action.payload;
            state.status = Status.SUCCESS;
        })
        builder.addCase(fetchPizzas.rejected, (state, action) =>{
            state.status = Status.ERROR;
            state.items = [];
        })
    }
    // extraReducers: {
    //     [fetchPizzas.pending]: (state) => {
    //         state.status ='loading';
    //         state.items = [];
    //     },
    //     [fetchPizzas.fulfilled]: (state, action) => {
    //         state.items = action.payload;
    //         state.status = 'success';
    //     },
    //     [fetchPizzas.rejected]: (state, action) => {
    //         state.status = 'error';
    //         state.items = [];
    //     },
    // }
});

export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;