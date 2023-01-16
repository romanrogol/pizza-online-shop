import {configureStore} from '@reduxjs/toolkit';
import filterSlice from './slices/filter/slice';
import cart from '../redux/slices/cart/slice';
import pizza from './slices/pizza/slice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
    reducer: {
        filterSlice,
        cart,
        pizza,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()