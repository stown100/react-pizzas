import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Categories, SortPopup, PizzaBlock } from '../components';
import { setCategory } from '../redux/actions/filters';

const categoriesName = [
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
]

const sortItems = [
  { name: 'популярности', type: 'popular' },
  { name: 'цене', type: 'price' },
  { name: 'алфавиту', type: 'alphabet' },
]

function Home() {
  const dispatch = useDispatch();

    // Достаём обьект из хранилища
    const items = useSelector(({ pizzas }) => pizzas.items);

  // useCollback 1 раз запоминает ссылку на пропсы и больше не производит лишний рендер
  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategory(index))
  }, [])

  return (
    <div className="container">
      <div className="content__top">
        <Categories items={categoriesName} onClickItem={(index) => onSelectCategory(index)} />
        <SortPopup items={sortItems} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {items && items.map(({ category, imageUrl, name, price, rating, sizes, types, id }) =>
          <PizzaBlock category={category} imageUrl={imageUrl} name={name} price={price} rating={rating} sizes={sizes} types={types} key={id} />)}
      </div>
    </div>
  )
}

export default Home;