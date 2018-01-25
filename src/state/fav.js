import {startLoading, stopLoading} from './loading'
import {database} from '../firebase'

const FETCH_FAV = 'products/FETCH_FAV'
const PATCH_FAV = 'products/PATCH_FAV'

const setFav = (fav) => ({
    type: FETCH_FAV,
    fav: fav
})

export const fetchFav = () => (dispatch, getState) => {
    dispatch(startLoading())

    setTimeout( // this is only to slowly show "Ładowanie..."
        () => fetch('https://jfddl3-fitcode.firebaseio.com/products/favourites.json')
            .then(response => response.json())
            .then(fav => {
                dispatch(setFav(Object.values(fav || {})))
                console.log(fav)
                dispatch(stopLoading())
            })
            .catch(err => {
                console.log('error fetching products')
                dispatch(stopLoading())
            })
        , 1000)
}

const initialState = {
    favData: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FAV:
            return {
                ...state,
                favData: action.fav
            }
        default:
            return state
    }
}