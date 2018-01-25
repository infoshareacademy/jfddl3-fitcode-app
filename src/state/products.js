const SET_PRODUCTS = 'state/SET_PRODUCTS' // upload data to server
const GET_PRODUCTS = 'state/GET_PRODUCTS' // download data from server

const setProducts = () => ({
    type: SET_PRODUCTS,
    data
})

const getProducts = () => ({
    type: GET_PRODUCTS
})

const initialState = {

}