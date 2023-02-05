import './App.css';
import './scss/app.scss';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
// import NotFoundBlock from './components/NotFoundBlock';
// import Cart from './pages/Cart';
// import FullPizza from './components/FullPizza/FullPizza';
import MainLayout from './layouts/MainLayout';
import { Suspense } from 'react';
import React from 'react';

const Cart = React.lazy(
    () => import(/* webpackChunkName: 'Cart' */ './pages/Cart')
);
const FullPizza = React.lazy(
    () =>
        import(
            /* webpackChunkName: 'FullPizza' */ './components/FullPizza/FullPizza'
        )
);
const NotFoundBlock = React.lazy(
    () =>
        import(
            /* webpackChunkName: 'NotFoundBlock' */ './components/NotFoundBlock'
        )
);

function App() {
    return (
        <Routes>
            <Route path='/' element={<MainLayout />}>
                <Route path='' element={<Home />} />
                <Route
                    path='pizza/:id'
                    element={
                        <Suspense fallback={<div>Загрузка...</div>}>
                            <FullPizza />
                        </Suspense>
                    }
                />
                <Route
                    path='cart'
                    element={
                        <Suspense fallback={<div>Загрузка...</div>}>
                            <Cart />
                        </Suspense>
                    }
                />
                <Route
                    path='*'
                    element={
                        <Suspense fallback={<div>Загрузка...</div>}>
                            <NotFoundBlock />
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    );
}

export default App;
