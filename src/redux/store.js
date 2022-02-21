import { createStore, compose, applyMiddleware } from "redux";
// thunk говоит, что если экшн является функцией, то вурни её как обьект, а если - обьктом, то просто верни обьект
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;