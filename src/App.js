import React from 'react';
import './App.css';
import './scss/app.scss';
import Home from '../src/components/pages/Home';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import NotFoundBlock from './components/NotFoundBlock';
import Cart from './components/pages/Cart';
import FullPizza from './components/pages/FullPizza';

function App() {
    return (
        <div class='wrapper'>
            <Header />
            <div class='content'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/pizza/:id' element={<FullPizza />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='*' element={<NotFoundBlock />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
