import axios from 'axios';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './FullPizza.module.scss';

const FullPizza = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pizza, setPizza] = React.useState();

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(
                    'https://63c52a1cf3a73b34784f68fb.mockapi.io/items/' + id
                );
                setPizza(data);
            } catch (error) {
                alert('Не удалось загрузить страницу!');
                navigate('/');
            }
        }
        fetchPizza();
    }, []);

    if (!pizza) {
        return 'Загрузка...';
    }

    return (
        <>
            <div className={styles.container}>
                <img
                    className={styles.picture}
                    src={pizza.imageUrl}
                    alt='pizza'
                />
                <div className={styles.wrapper}>
                    <h1 className={styles.title}>{pizza.title}</h1>
                    <h2 className={styles.price}>{pizza.price} ₽</h2>
                    <h3 className={styles.desc}>{pizza.desc}</h3>

                    <h3 className={styles.proteins}>
                        <b>Белки:</b> {pizza.proteins}
                    </h3>
                    <h3 className={styles.fats}>
                        <b>Жиры:</b> {pizza.fats}
                    </h3>
                    <h3 className={styles.carbohydrate}>
                        <b>Углеводы:</b> {pizza.carbohydrates}
                    </h3>
                </div>
            </div>
        </>
    );
};

export default FullPizza;
