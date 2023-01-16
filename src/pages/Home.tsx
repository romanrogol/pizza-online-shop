import React from "react";
import qs from 'qs';
import {useSelector} from 'react-redux';
import { RootState, useAppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton';
import Pagination from "../components/Pagination";
import {sortList} from '../components/Sort';

import {setCategoryType, setCurrentPage, setFilters } from "../redux/slices/filter/slice";
import {fetchPizzas} from '../redux/slices/pizza/slice';
import { FetchPizzasArgs } from "../redux/slices/pizza/types";

const Home: React.FC = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isMounted = React.useRef(false);

  const {items, status} = useSelector((state: RootState) => state.pizza);
  const {categoryType, sort, currentPage, searchValue } = useSelector((state: RootState) => state.filterSlice);
 

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryType(idx));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryType > 0 ? `category=${categoryType}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

      dispatch(
        fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      }),
      );

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const params = {
        sortProperty: sort.sortProperty,
        categoryType: categoryType > 0 ? categoryType : null,
        currentPage,
      };
      
      const queryString = qs.stringify(params, {skipNulls: true});
      navigate(`/?${queryString}`);
    }
  }, [categoryType ,sort.sortProperty, searchValue, currentPage]);

  React.useEffect (() => {
      getPizzas();
  }, [categoryType , sort.sortProperty, searchValue, currentPage]);

  React.useEffect(() => {
    if(window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as FetchPizzasArgs;

      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
      dispatch(
        setFilters({
        searchValue: params.search,
        categoryType: Number(params.category),
        currentPage: Number(params.currentPage),
        sort: sort || sortList[0],
      }),
      );
    }
  }, []);


  const pizzas = items.map((obj: any) => (
  <PizzaBlock key = {obj.id}  {...obj} />));
  const sceletons = [ ...new Array(6)].map((_, index) => <Sceleton key={index} />);

    return (
      <div className="container">
        <div className="content__top">
            <Categories value = {categoryType} onChangeCategory = {onChangeCategory}/>
            <Sort value = {sort}/>
          </div>
          <h2 className="content__title">All pizzas</h2>
          { status === 'error' ? (<div className="content__error-info"><h2>Error <span>😕</span></h2>
            <p>
            Failed to get data. try again later
            </p></div>) : (
          <div className="content__items">{status === 'loading'? sceletons: pizzas}</div>)}
          <Pagination currentPage = {currentPage} onChangePage={onChangePage}/>
        </div>
    );
}

export default Home