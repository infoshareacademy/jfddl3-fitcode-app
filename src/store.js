import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

import productsReducer from './state/products'
import favReducer from './state/fav'
import loadingReducer from './state/loading'
import authReducer, {initAuth} from './state/auth'
import {fetchProducts} from './state/products'
import {fetchFav} from './state/fav'

const reducer = combineReducers({
    products: productsReducer,
    fav: favReducer,
    loading: loadingReducer,
    auth: authReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)


store.dispatch(initAuth())
store.dispatch(fetchProducts())
store.dispatch(fetchFav())


export default store