import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '.';
import Preloader from './Preloader/Preloader'


function PizzaBlock({ category, imageUrl, name, price, rating, sizes, types, isLoading }) {
    const aviableTypes = ['тонкое', 'классическое'];
    console.log({ category, imageUrl, name, price, rating, sizes, types, isLoading })
    const avaiableSizes = [26, 30, 40];
    const [activeType, setActiveType] = React.useState(types[0]);
    const [activeSize, setActiveSize] = React.useState(sizes[0]);

    const onSelectType = (index) => {
        setActiveType(index)
    }

    const onSelectSize = (index) => {
        setActiveSize(index);
    }
    // if (isLoading ) {
    //     return <Preloader />
    // }

    // return (
    //     <Preloader />
    // )
    return (
        <div className="pizza-block">
            <img
                className="pizza-block__image"
                src={imageUrl}
                alt="Pizza"
            />
            <h4 className="pizza-block__title">{name}</h4>
            <div className="pizza-block__selector">
                <ul>
                    {aviableTypes.map((type, index) => (
                        <li
                            key={type}
                            className={classNames({
                                // Если активТайп то ставим сласс active
                                active: activeType === index,
                                // Если в массиве нет индекса, то disabled
                                disabled: !types.includes(index),

                            })}
                            onClick={() => onSelectType(index)}>{type}</li>))}
                </ul>
                <ul>
                    {avaiableSizes.map((size, index) => (
                        <li key={size}
                        className={classNames({
                            active: activeSize === index,
                            disabled: !sizes.includes(size),
                        })}
                        onClick={() => onSelectSize(index)}>{size} см.</li>
                    ))}
                </ul>
        </div>
        <div className="pizza-block__bottom">
            <div className="pizza-block__price">от {price} ₽</div>
            <div className="button button--outline button--add">
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                        fill="white"
                    />
                </svg>
                <span>Добавить</span>
                <i>2</i>
            </div>
        </div>
        </div >
    )
}

//                        ТИПИЗАЦИЯ

// Для того, чтоб быстрее отловить ошибку
// С помощью этой библиотеки обьясняю/проверяю, какого типа должны прохидить данные
PizzaBlock.propTypes = {
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    // Обязательно должен прийти массив чисел
    types: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    sizes: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    isLoading: PropTypes.bool
}

// Если вдруг не передал какое-то значение через пропсы, чтоб не ломалось приложение, ставятся дефолтные значения
PizzaBlock.defaultProps = {
    types: [],
    sizes: [],
    name: 'Тут должно быть название пиццы',
    price: Number,
    imageUrl: 'Фото пиццы',
    isLoading: false
}

// указываю что onClick это функция
Button.propTypes = {
    onClick: PropTypes.func
}

export default PizzaBlock;