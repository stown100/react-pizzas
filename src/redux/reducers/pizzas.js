const initialState = {
    items: [],
    // isLoaded: false,
}


// Каждый раз, когда происходит какой-то экшн - будет вызываться редюсер pizzas
const pizzas = (state = initialState, action) => {
    if (action.type === 'SET_PIZZAS') {
        return {
            ...state,
            items: action.payload,
            // isLoaded: true,
        }
    }
    return state;
}

export default pizzas;