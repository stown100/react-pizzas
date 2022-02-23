const initialState = {
    items: {},
    totalPrice: 0,
    totalCount: 0,
};


// Каждый раз, когда происходит какой-то экшн - будет вызываться редюсер pizzas
const cart = (state = initialState, action) => {
    switch (action.type) {
        // Когда произойдёт экшн SET_TOTAL_PRICE вернётся обновлённый обьект
        case 'ADD_PIZZA_CART': {
            // добавляется новый обьект
            const newItems = {
                ...state.items,
                [action.payload.id]:
                    !state.items[action.payload.id]
                        ? [action.payload]
                        : [...state.items[action.payload.id], action.payload]
            };
            const allPizzas = [].concat.apply([], Object.values(newItems));

            return {
                ...state,
                items: newItems,
                // Передаю колличество добавленых пицц
                totalCount: allPizzas.length,
                // Передаю цену всех добавленых пицц
                totalPrice: allPizzas.reduce((sum, obj) => obj.price + sum, 0),
            };
        }

        case 'SET_TOTAL_COUNT': {
            return {
                ...state,

            }
        }

        default:
            return state;
    }
}

export default cart;