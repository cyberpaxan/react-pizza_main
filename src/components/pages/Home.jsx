import React from 'react';
import Categories from '../Categories';
import Sort from '../Sort';
import PizzaBlock from '../PizzaBlock/index';
import Skeleton from '../PizzaBlock/Skeleton';
import Pagination from '../Pagination';
import { SearchContext } from '../../App';

import { setItems } from '../../redux/slices/pizzasSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../../redux/slices/filterSlice';
import axios from 'axios';

const Home = () => {
    const dispatch = useDispatch();
    const categoryId = useSelector((state) => state.filter.categoryId);
    const sortType = useSelector((state) => state.filter.sort.sortProperty);
    const sort = useSelector((state) => state.filter.sort);
    const currentPage = useSelector((state) => state.filter.currentPage);
    const items = useSelector((state) => state.pizza.items);

    const { searchValue } = React.useContext(SearchContext);
    const [isLoading, setIsLoading] = React.useState(true);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    };

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number));
    };

    React.useEffect(() => {
        setIsLoading(true);

        const order = sortType.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        try {
            axios
                .get(
                    `https://63c52a1cf3a73b34784f68fb.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
                )
                .then((res) => {
                    dispatch(setItems(res.data));
                });
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }

        window.scrollTo(0, 0);
    }, [categoryId, sort, searchValue, currentPage]);

    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

    const skeletons = [...new Array(6)].map((_, index) => (
        <Skeleton key={index} />
    ));

    return (
        <div class='container'>
            <div class='content__top'>
                <Categories
                    value={categoryId}
                    onClickCategory={onChangeCategory}
                />
                <Sort />
            </div>
            <h2 class='content__title'>Все пиццы</h2>
            <div class='content__items'>{isLoading ? skeletons : pizzas}</div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    );
};

export default Home;
