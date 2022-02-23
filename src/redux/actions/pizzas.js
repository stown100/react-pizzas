import axios from 'axios';

export const setLoaded = payload => ({
    type: 'SET_LOADED',
    payload,
})

// Получение данных с сервера / ассинхронный экшн.
export const fetchPizzas = (sortBy, category) => (dispatch) => {
    dispatch(setLoaded(false));
    // адрес перенаправляется на 3000 порт с помощью proxy в package.json
    axios.get(`/pizzas?${category !== null ? `category=${category}` : ''}&_sort=${sortBy.type}&_order=${sortBy.order}`).then(({ data }) => {
        // сохранение данных в редаксе
        dispatch(setPizzas(data));
      });
};

// Метод для сохранения данных
export const setPizzas = (items) => ({
    type: 'SET_PIZZAS',
    payload: items,
});