import {startLoading, stopLoading} from './loading'
import {database} from '../firebase'

const FETCH_FAV = 'products/FETCH_FAV'
const ADD_FAV = 'products/ADD_FAV'
const REMOVE_FAV = 'products/REMOVE_FAV'


const setFav = (fav) => ({
    type: FETCH_FAV,
    fav: fav
})

const addFav = (fav) => ({
    type: ADD_FAV,
    fav: fav
})

export const fetchFav = () => (dispatch, getState) => {
    database.ref(`/products/favourites`)
        .on('value', (snapshot)=>
            dispatch(setFav(Object.values(snapshot.val()) || {}))
        )
}

export const pushFav = () => (dispatch, getState) => {
    database.ref(`/products/favourites`)
        .push()
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
        case ADD_FAV:
            return{
                ...state,
                favData: action.fav
            }
        case REMOVE_FAV:
            return{
                ...state,
                favData: action.fav
            }
        default:
            return state
    }
}