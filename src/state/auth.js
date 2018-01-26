import {database, auth,googleProvider} from '../firebase'

const SET_USER = 'auth/SET_USER'
const SET_LOGIN_LOGS = 'auth/SET_LOGIN_LOGS'

const setUser = (user) => ({ //kreator akcji zwyklej
    type: SET_USER,
    userData: user
})

const setLoginLogs = (logs) => ({
    type: SET_LOGIN_LOGS,
    logsData: logs
})

export const initAuth = () => (dispatch, getState) => {
    auth.onAuthStateChanged((user) => {
        // if not logged in user is null !
        dispatch(setUser(user))

        if(user){ //if not null user is logged in, so set his record in DB
            dispatch(logLoginDate())
            dispatch(syncLoginLogs())
        }
    })
}

const syncLoginLogs = () => (dispatch, getState) =>{
    const uid = getState().auth.user.uid   //pobierz ze storu reduxa stan przez getState()
    database.ref(`/users/${uid}/loginLogs`)
        .on('value', (snapshot)=>dispatch(setLoginLogs(snapshot.val())))
}

const logLoginDate = () => (dispatch, getState) => {
    const uid = getState().auth.user.uid   //pobierz ze storu reduxa stan przez getState()
    database.ref(`/users/${uid}/loginLogs`)
        .push({timestamp: Date.now()})
        .then(() => console.log('LogIn Date pushed to DB!'))
        .catch(() => console.log('LogIn Date failed!'))
}

export const logIn = (email, password) => (dispatch, getState) => {
    auth.signInWithEmailAndPassword(email, password)
        .then(() => console.log('Logged in!'))
        .catch(() => alert('Something wrong with Login!'))
}

export const signUp = (email, password) => (dispatch, getState) => {
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => console.log('Signed Up!'))
        .catch(() => alert('Something wrong with SignUp!'))
}

export const logOut = () => (dispatch, getState) => {
    auth.signOut()
        .then(() => console.log('Logged Out!'))
        .catch(() => alert('Something wrong with LogOut!'))
}

export const logInWithGoogle = () => (dispatch, getState) => {
    auth.signInWithPopup(googleProvider)
        .then(() => console.log('Logged in!'))
        .catch(() => alert('Something wrong with Login!'))
}





const initialState = {
    user: null
}




export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.userData
            }
        case SET_LOGIN_LOGS:{
            return {
                ...state,
                loginLogs: action.logsData
            }
        }
        default:
            return state
    }
}