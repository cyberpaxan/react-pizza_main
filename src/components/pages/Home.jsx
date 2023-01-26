import React from 'react';
import Categories from '../Categories';
import Sort from '../Sort';
import PizzaBlock from '../PizzaBlock/index';
import Skeleton from '../PizzaBlock/Skeleton';
import Pagination from '../Pagination';
import { SearchContext } from '../../App';

import { fetchPizzas } from '../../redux/slices/pizzaSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../../redux/slices/filterSlice';

const Home = () => {
    const dispatch = useDispatch();
    const categoryId = useSelector((state) => state.filter.categoryId);
    const sortType = useSelector((state) => state.filter.sort.sortProperty);
    const sort = useSelector((state) => state.filter.sort);
    const currentPage = useSelector((state) => state.filter.currentPage);
    const items = useSelector((state) => state.pizza.items);
    const { status } = useSelector((state) => state.pizza);

    const { searchValue } = React.useContext(SearchContext);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    };

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number));
    };

    React.useEffect(() => {
        const order = sortType.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        try {
            dispatch(
                fetchPizzas({ order, sortBy, category, search, currentPage })
            );
        } catch (error) {
            console.log(error);
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
            {status === 'error' ? (
                <div className='content__error-info'>
                    <h1>Произошла ошибка ❗</h1>
                    <p>
                        Не удалось отобразить доступные пиццы. Перезагрузите
                        страницу или проверьте подключение к интернету!
                    </p>
                </div>
            ) : (
                <div class='content__items'>
                    {status === 'loading' ? skeletons : pizzas}
                </div>
            )}
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    );
};

export default Home;
