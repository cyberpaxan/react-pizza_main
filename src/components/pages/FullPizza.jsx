import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';

const FullPizza = () => {
    const { id } = useParams();
    const [pizza, setPizza] = React.useState();

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(
                    'https://63c52a1cf3a73b34784f68fb.mockapi.io/items/' + id
                );
                setPizza(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchPizza();
    }, []);

    if (!pizza) {
        return 'Загрузка...';
    }

    return (
        <div className='container'>
            <img src={pizza.imageUrl} />
            <h2>{pizza.title}</h2>
            <h4>{pizza.price}</h4>
        </div>
    );
};

export default FullPizza;
