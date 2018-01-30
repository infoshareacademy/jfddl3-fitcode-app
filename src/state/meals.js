import {database, auth} from '../firebase'

const FETCH_MEALS = 'meals/FETCH_MEALS'



const setMeals = (meals) => ({
    type: FETCH_MEALS,
    meals: meals
})


export const fetchMeals = () => (dispatch, getState) => {
    auth.onAuthStateChanged((user) => {
        if(user){ //if not null user is logged in, so get his favourites
            const uid = getState().auth.user.uid
            database.ref(`/users/${uid}/meals`)
                .on('value', (snapshot)=>
                    dispatch(setMeals(snapshot.val() || {}))
                )
        }
    })
}



const initialState = {
    mealsData: {}
}




export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MEALS:
            return {
                ...state,
                mealsData: action.meals
            }
        default:
            return state
    }
}