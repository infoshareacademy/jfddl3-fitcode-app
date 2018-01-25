import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

import chartsReducer from './state/charts'
import favsReducer from './state/favs'
import productsReducer from './state/products'
import authReducer, {initAuth} from './state/auth'

const reducer = combineReducers ({
    charts: chartsReducer,
    favs: favsReducer,
    products: productsReducer,
    auth: authReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)

store.dispatch(initAuth)

export default store