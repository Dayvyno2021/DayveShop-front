// import axios from 'axios';
import axios from 'axios';
import { ORDER_DETAILS_FAIL, 
  ORDER_DETAILS_REQUEST, 
  ORDER_DETAILS_SUCCESS, 
  PLACE_ORDER_FAIL, 
  PLACE_ORDER_REQUEST, 
  PLACE_ORDER_SUCCESS,
  ORDER_PAID_FAIL,
  ORDER_PAID_REQUEST,
  ORDER_PAID_SUCCESS,
  MY_ORDERS_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDER_DELETE_FAIL,
  MY_ORDER_DELETE_REQUEST,
  MY_ORDER_DELETE_SUCCESS,
  ADMIN_ORDERLIST_FAIL,
  ADMIN_ORDERLIST_REQUEST,
  ADMIN_ORDERLIST_SUCCESS,
  DELIVERY_STATUS_FAIL,
  DELIVERY_STATUS_REQUEST,
  DELIVERY_STATUS_SUCCESS
} from '../constants/orderConstants';

export const placeOrderAction = (order) => async(dispatch, getState) =>{
  try {
    dispatch({type: PLACE_ORDER_REQUEST})

    const {userLoginReducer: {userDetails: {token}}} = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }

    const {data} = await axios.post(
      'http://localhost:5000/api/order/create',
      order,
      config
    )

    dispatch({
      type: PLACE_ORDER_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: PLACE_ORDER_FAIL,
      error: error.response && error.response.data.message? 
        error.response.data.message : error.response
    })
  }
}

export const orderDetailsAction = (id) => async(dispatch, getState) => {
  try {
    dispatch({type: ORDER_DETAILS_REQUEST})

    const {userLoginReducer:{userDetails:{token}}} = getState();
    const config = {
      headers : {
        Authorization : `Bearer ${token}`
      }
    }


    const {data} = await axios.get(`http://localhost:5000/api/order/${id}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message : error.response
    })
  }
}

export const orderPaidAction = (paymentResult, orderId) => async(dispatch, getState) => {
  try {
    dispatch({type: ORDER_PAID_REQUEST})

    const {userLoginReducer:{userDetails:{token}}} = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }

    const {data} = await axios.put(
      `http://localhost:5000/api/order/${orderId}/paid`,
      paymentResult,
      config
    )

    dispatch({
      type: ORDER_PAID_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: ORDER_PAID_FAIL,
      payload: error.response && error.response.data.message?
        error.response.data.message : error.response
    })
  }
}

export const myOrdersAction = () => async(dispatch, getState)=>{
  try {
    dispatch({type: MY_ORDERS_REQUEST})

    const {userLoginReducer: {userDetails:{token}}} = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const {data} = await axios.get(`http://localhost:5000/api/order/orders/my-orders`, config)

    dispatch({
      type: MY_ORDERS_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response && error.response.data.message?
        error.response.data.message : error.response
    })
  }
}

export const myOrderDeleteAction = (id) => async(dispatch, getState) =>{
  try {
    dispatch({type: MY_ORDER_DELETE_REQUEST})

    const {userLoginReducer:{userDetails:{token}}} = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const {data} = await axios.delete(
      `http://localhost:5000/api/order/my-order/delete/${id}`,
      config
    )

    dispatch({
      type: MY_ORDER_DELETE_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: MY_ORDER_DELETE_FAIL,
      payload: error.response && error.response.data.message?
        error.response.data.message : error.response
    })
  }
}

export const adminOrderlistAction = () =>async(dispatch, getState) =>{
  try {
    dispatch({type: ADMIN_ORDERLIST_REQUEST})

    const {userLoginReducer: {userDetails: {token}}} = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const {data} = await axios.get('http://localhost:5000/api/order/orderlist/getorders', config);

    dispatch ({
      type: ADMIN_ORDERLIST_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: ADMIN_ORDERLIST_FAIL,
      payload: error.response && error.response.data.message?
        error.response.data.message : error.response
    })
  }
}

export const deliveryStatusAction = (id) => async(dispatch, getState) => {
  try {
    dispatch({type: DELIVERY_STATUS_REQUEST})

    const {userLoginReducer:{userDetails:{token}}} = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const {data} = await axios.put(`http://localhost:5000/api/order/${id}/delivery`, {}, config)
    dispatch({
      type: DELIVERY_STATUS_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: DELIVERY_STATUS_FAIL,
      payload: error.response && error.response.data.message?
        error.response.data.message: error.response
    })
  }
}