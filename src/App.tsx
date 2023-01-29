import './App.css';
import './scss/app.scss';
import Home from './components/pages/Home';
import { Routes, Route } from 'react-router-dom';
import NotFoundBlock from './components/NotFoundBlock';
import Cart from './components/pages/Cart';
import FullPizza from './components/FullPizza/FullPizza';
import MainLayout from './layouts/MainLayout';

function App() {
    return (
        <Routes>
            <Route path='/' element={<MainLayout />}>
                <Route path='' element={<Home />} />
                <Route path='pizza/:id' element={<FullPizza />} />
                <Route path='cart' element={<Cart />} />
                <Route path='*' element={<NotFoundBlock />} />
            </Route>
        </Routes>
    );
}

export default App;
