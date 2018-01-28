import {database, auth, googleProvider} from './firebase'
import {newFood} from './FoodAddRedux';

const FOOD_ADD = 'foodAdd/FOOD_ADD'

export const foodAdd = () => (
    {
        type: FOOD_ADD
    }
)

const initialState = {
    isFoodAdded: false
}

export const pushToDatabase = () => (dispatch, getState) => {
    database.ref(`/wpd-sandbox/test1`)
        .push(JSON.stringify(newFood))
        .then(() => console.log('Login date successfully logged in db'))
        .catch(() => alert('Something wrong'))
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FOOD_ADD:
            return {
                ...state,
                isFoodAdded: true
            }
        default:
            return state
    }
}