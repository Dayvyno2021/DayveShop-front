import axios from 'axios';
import { 
  ADD_REVIEW_FAIL,
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
  ADMIN_DEL_PRO_FAIL,
  ADMIN_DEL_PRO_REQUEST,
  ADMIN_DEL_PRO_SUCCESS,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAIL,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_SUCCESS,
  HIGH_RATED_FAIL,
  HIGH_RATED_REQUEST,
  HIGH_RATED_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL, 
  PRODUCT_LIST_REQUEST, 
  PRODUCT_LIST_SUCCESS 
} from '../constants/productConstants';

export const productListAction = (filter='', params='') => async(dispatch) => {
  try {
    dispatch({type: PRODUCT_LIST_REQUEST});

    const {data} = await axios.get(`http://localhost:5000/api/products/?filter=${filter}&pageNumber=${params}`)

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })
  }
}

export const productDetailsAction= (id) => async(dispatch)=>{
  try {
    dispatch({type: PRODUCT_DETAILS_REQUEST})

    const {data} = await axios.get(`http://localhost:5000/api/products/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response && error.response.data.message ?
              error.response.data.message : error.response
    })
  }
}

export const createProductAction = (product) => async(dispatch, getState) =>{
  try {
    console.log(product)
    dispatch({type: CREATE_PRODUCT_REQUEST})

    const {userLoginReducer:{userDetails:{token}}} = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
      }
    }

    
    const {data} = await axios.post('http://localhost:5000/api/products/add/new-product', product, config)

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: error.response && error.response.data.message?
        error.response.data.message : error.response
    })
  }
}

export const editProductAction = (details, id) => async(dispatch, getState) => {
  try {
    dispatch({type: EDIT_PRODUCT_REQUEST});

    const {userLoginReducer: {userDetails: {token}}} = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': "application/json"
      }
    }

    const {data} = await axios.put(
      `http://localhost:5000/api/products/edit/${id}`,
      details,
      config
    )

    dispatch({
      type: EDIT_PRODUCT_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: EDIT_PRODUCT_FAIL,
      payload: error.response && error.response.data.message?
        error.response.data.message: error.response
    })
  }
}

export const adminDelProductAction = (id)=> async(dispatch, getState) =>{
  try {
    console.log("HERE")
    dispatch({type: ADMIN_DEL_PRO_REQUEST})

    const {userLoginReducer: {userDetails: {token}}} = getState();
    const config = {
      headers: {
        Authorization : `Bearer ${token}`
      }
    }
    const {data} = await axios.delete(`http://localhost:5000/api/products/delete/${id}`, config);

    dispatch ({
      type: ADMIN_DEL_PRO_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: ADMIN_DEL_PRO_FAIL,
      payload: error.response && error.response.data.message?
        error.response.data.message : error.response
    })
  }
}

export const addReviewAction = (details, id) => async(dispatch, getState) =>{
  try {
    dispatch({type: ADD_REVIEW_REQUEST})
    const {userLoginReducer: {userDetails:{token}}} = getState();
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type" : "application/json"
      }
    }

    const {data} = await axios.post(`http://localhost:5000/api/products/review/${id}`, details, config)
    dispatch({
      type: ADD_REVIEW_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: ADD_REVIEW_FAIL,
      payload: error.response && error.response.data.message?
        error.response.data.message : error.response
    })
  }
}

export const highRatedAction = ()  => async(dispatch) => {
  try {
    dispatch({type: HIGH_RATED_REQUEST});

    const {data} = await axios.get('http://localhost:5000/api/products/highly-rated/products')

    dispatch({
      type: HIGH_RATED_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: HIGH_RATED_FAIL,
      payload: error.response && error.response.data.message? 
        error.response.data.message: error.response
    })
  }
}