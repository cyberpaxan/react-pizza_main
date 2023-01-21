import React from 'react';
import './App.css';
import './scss/app.scss';
import Home from '../src/components/pages/Home';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import NotFoundBlock from './components/NotFoundBlock';
import Cart from './components/pages/Cart';

export const SearchContext = React.createContext();

function App() {
    const [searchValue, setSearchValue] = React.useState('');
    return (
        <div class='wrapper'>
            <SearchContext.Provider value={{ searchValue, setSearchValue }}>
                <Header />
                <div class='content'>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path='*' element={<NotFoundBlock />} />
                    </Routes>
                </div>
            </SearchContext.Provider>
        </div>
    );
}

export default App;
