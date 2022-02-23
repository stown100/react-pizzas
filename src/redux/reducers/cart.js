const initialState = {
    items: {},
    totalPrice: 0,
    totalCount: 0,
};

const getTotalPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0);

const _get = (obj, path) => {
    const [firstKeys, ...keys] = path.split('.');
    return keys.reduce((val, key) => {
        return val[key]
    }, obj[firstKeys]);
}

const getTotalSum = (obj, path) => {
    return Object.values(obj).reduce((sum, obj) => {
        const value = _get(obj, path)
        return sum + value;
    }, 0)
}


// Каждый раз, когда происходит какой-то экшн - будет вызываться редюсер pizzas
const cart = (state = initialState, action) => {
    switch (action.type) {
        // Когда произойдёт экшн SET_TOTAL_PRICE вернётся обновлённый обьект
        case 'ADD_PIZZA_CART': {
            const currentPizzaItems = !state.items[action.payload.id]
                ? [action.payload]
                : [...state.items[action.payload.id].items, action.payload];

            // добавляется новый обьект
            const newItems = {
                ...state.items,
                [action.payload.id]: {
                    items: currentPizzaItems,
                    totalPrice: getTotalPrice(currentPizzaItems),
                },
            };

            // // Помещаю сумму корзины и колличество пицц в корзине в редакс
            // const totalCount = Object.keys(newItems).reduce(
            //     (sum, key) => newItems[key].items.length + sum,
            //     0)
            // const totalPrice = Object.keys(newItems).reduce(
            //     (sum, key) => newItems[key].totalPrice + sum,
            //     0)

            // Второй способ поместить сумму корзины и колличество пицц в корзине в редакс. Чтоб не дублировать код
            const totalCount = getTotalSum(newItems, 'items.length')
            const totalPrice = getTotalSum(newItems, 'totalPrice')
            return {
                ...state,
                items: newItems,
                // Передаю колличество добавленых пицц
                totalCount,
                // Передаю цену всех добавленых пицц
                totalPrice,
            };
        }

        // Редюсер удаления пицц
        case 'CLEAR_CART': {
            return initialState
        }

        case 'REMOVE_CART_ITEM': {
            const newItems = {
                ...state.items
            }
            // Нахожу сумму цен пицц в одном массиве
            const currentTotalPrice = newItems[action.payload].totalPrice;
            // Нахожу колличество пицц в одном массиве
            const currentTotalCount = newItems[action.payload].items.length;
            // Удаляю массив определённых пицц
            delete newItems[action.payload]
            return {
                ...state,
                items: newItems,
                // Отнимаю колличество удалённых пицц от колличества всех пицц
                totalCount: state.totalCount - currentTotalCount,
                // Отнимаю цену удалённых пицц от всей суммы
                totalPrice: state.totalPrice - currentTotalPrice,
            }
        }

        case 'PLUS_CART_ITEM': {
            const newObjItems = [
                ...state.items[action.payload].items,
                state.items[action.payload].items[0]
            ]
            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newObjItems,
                    totalPrice: getTotalPrice(newObjItems),
                }
            }
            // Второй способ поместить сумму корзины и колличество пицц в корзине в редакс. Чтоб не дублировать код
            const totalCount = getTotalSum(newItems, 'items.length')
            const totalPrice = getTotalSum(newItems, 'totalPrice')
            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice,
            }
        }
        case 'MINUS_CART_ITEM': {
            const oldItems = state.items[action.payload].items
            const newObjItems = oldItems.length > 1 ? state.items[action.payload].items.slice(1) : oldItems;
            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newObjItems,
                    totalPrice: getTotalPrice(newObjItems),
                }
            }
            // Второй способ поместить сумму корзины и колличество пицц в корзине в редакс. Чтоб не дублировать код
            const totalCount = getTotalSum(newItems, 'items.length')
            const totalPrice = getTotalSum(newItems, 'totalPrice')
            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice,
            }
        }
        default:
            return state;
    }
}

export default cart;