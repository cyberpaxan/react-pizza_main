import React from 'react';
import Categories from '../Categories';
import Sort from '../Sort';
import PizzaBlock from '../PizzaBlock/index';
import Skeleton from '../PizzaBlock/Skeleton';
import Pagination from '../Pagination';

import { fetchPizzas, selectPizzaData } from '../../redux/slices/pizzaSlice';
import { useSelector } from 'react-redux';
import {
    selectFilter,
    setCategoryId,
    setCurrentPage,
    sortTypeState,
} from '../../redux/slices/filterSlice';
import { useAppDispatch } from '../../redux/store';

const Home: React.FC = () => {
    const dispatch = useAppDispatch();

    const sortType = useSelector(sortTypeState);
    const { status, items } = useSelector(selectPizzaData);
    const { categoryId, sort, currentPage, searchValue } =
        useSelector(selectFilter);

    const onChangeCategory = (id: number) => {
        dispatch(setCategoryId(id));
    };

    const onChangePage = (number: number) => {
        dispatch(setCurrentPage(number));
    };

    React.useEffect(() => {
        const order = sortType.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        try {
            dispatch(
                fetchPizzas({
                    order,
                    sortBy,
                    category,
                    search,
                    currentPage: String(currentPage),
                })
            );
        } catch (error) {
            console.log(error);
        }

        window.scrollTo(0, 0);
    }, [categoryId, sort, searchValue, currentPage]);

    const pizzas = items.map((obj: any) => (
        <PizzaBlock key={obj.id} {...obj} />
    ));

    const skeletons = [...new Array(6)].map((_, index) => (
        <Skeleton key={index} />
    ));

    return (
        <div className='container'>
            <div className='content__top'>
                <Categories
                    value={categoryId}
                    onChangeCategory={onChangeCategory}
                />
                <Sort />
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            {status === 'error' ? (
                <div className='content__error-info'>
                    <h1>Произошла ошибка ❗</h1>
                    <p>
                        Не удалось отобразить доступные пиццы. Перезагрузите
                        страницу или проверьте подключение к интернету!
                    </p>
                </div>
            ) : (
                <div className='content__items'>
                    {status === 'loading' ? skeletons : pizzas}
                </div>
            )}
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    );
};

export default Home;
