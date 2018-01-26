import {startLoading, stopLoading} from './loading'
import {database} from '../firebase'

const FETCH_PRODUCTS = 'products/FETCH_PRODUCTS'
const POST_PRODUCTS = 'products/FETCH_PRODUCTS'

const setProducts = (products) => ({
    type: FETCH_PRODUCTS,
    products: products
})

// export const fetchProducts = () => (dispatch, getState) => {
//     dispatch(startLoading())
//
//     setTimeout( // this is only to slowly show "Ładowanie..."
//         () => fetch('https://jfddl3-fitcode.firebaseio.com/products/food.json')
//             .then(response => response.json())
//             .then(products => {
//                 dispatch(setProducts(Object.entries(products || {})))
//                 console.log(products)
//                 dispatch(stopLoading())
//             })
//             .catch(err => {
//                 console.log('error fetching products')
//                 dispatch(stopLoading())
//             })
//         , 1000)
// }


export const fetchProducts = () => (dispatch, getState) => {
    database.ref(`/products/food`)
        .on('value', (snapshot)=>
            dispatch(setProducts(Object.entries(snapshot.val()) || {}))
        )
}









const initialState = {
    productsData: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                productsData: action.products
            }
        default:
            return state
    }
}