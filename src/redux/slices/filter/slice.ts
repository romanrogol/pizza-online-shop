import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import { FilterSliceState, Sort, SortPropertyEnum } from './types';



const initialState: FilterSliceState = {
    searchValue: '',
    categoryType: 0,
    currentPage: 1,
    sort: {
        name: 'popularity',
        sortProperty: SortPropertyEnum.RATING_DESC,
      }
};


const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryType(state, action: PayloadAction<number>) {
            state.categoryType = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },    
        setSortType(state, action: PayloadAction<Sort>) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFilters(state,action: PayloadAction<FilterSliceState>) {
            if(Object.keys(action.payload).length) {
            state.currentPage = Number(action.payload.currentPage);
            state.sort = action.payload.sort;
            state.categoryType = Number(action.payload.categoryType);
            } else {
                state.currentPage = 1;
                state.categoryType = 0;
                state.sort = {
                    name: 'popularity',
                    sortProperty: SortPropertyEnum.RATING_DESC,
                };
            }
        }
    },
});

export const {setCategoryType, setSortType, setCurrentPage, setFilters, setSearchValue} = filterSlice.actions;

export default filterSlice.reducer;