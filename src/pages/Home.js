import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Categories, SortPopup, PizzaBlock, Preloader } from '../components';
import { setCategory, setSortBy } from '../redux/actions/filters';
import { fetchPizzas } from '../redux/actions/pizzas';


const categoriesName = [
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
]

const sortItems = [
  { name: 'популярности', type: 'rating', order: 'desc' },
  { name: 'цене', type: 'price', order: 'asc' },
  { name: 'алфавиту', type: 'name', order: 'asc' },
]

function Home() {
  const dispatch = useDispatch();

    // Достаём обьект из хранилища
    const items = useSelector(({ pizzas }) => pizzas.items);
    const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
    const { category, sortBy } = useSelector(({ filters }) => filters);

    // Производит новый рендер, когда нужно как-либо отсортировать/отфильтровать циццы (в массиве зависимости)
  React.useEffect(() => {
    // if (!items.length) {
      // Получение данных с сервера происходит в редаксе
      dispatch(fetchPizzas(sortBy, category))
    // }
  }, [category, sortBy]);

  // useCollback 1 раз запоминает ссылку на пропсы и больше не производит лишний рендер
  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategory(index))
  }, [])

  const osSelectSortType = React.useCallback((type) => {
    dispatch(setSortBy(type))
  }, [])

  return (
    <div className="container">
      <div className="content__top">
        <Categories activeCategory={category} items={categoriesName} onClickCategory={(index) => onSelectCategory(index)} />
        <SortPopup activeSortType={sortBy.type} items={sortItems} onClickSortType={(type) => osSelectSortType(type)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded
          ? items.map(({ category, imageUrl, name, price, rating, sizes, types, id }) =>
            <PizzaBlock category={category} imageUrl={imageUrl} name={name} price={price} rating={rating} sizes={sizes} types={types} key={id} isLoading={true} />)
          : Array(12).fill(0).map((item, index) => <Preloader key={index} />)
        }
      </div>
    </div>
  )
}

export default Home;