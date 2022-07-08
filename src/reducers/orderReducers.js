import { ADMIN_ORDERLIST_FAIL, ADMIN_ORDERLIST_REQUEST, ADMIN_ORDERLIST_SUCCESS, DELIVERY_STATUS_FAIL, DELIVERY_STATUS_REQUEST, DELIVERY_STATUS_RESET, DELIVERY_STATUS_SUCCESS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, MY_ORDER_DELETE_FAIL, MY_ORDER_DELETE_REQUEST, MY_ORDER_DELETE_RESET, MY_ORDER_DELETE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_PAID_FAIL, ORDER_PAID_REQUEST, ORDER_PAID_RESET, ORDER_PAID_SUCCESS, PLACE_ORDER_FAIL, PLACE_ORDER_REQUEST, PLACE_ORDER_RESET, PLACE_ORDER_SUCCESS } from "../constants/orderConstants";

export const placeOrderReducer = (state={}, action) => {
  switch (action.type) {
    case PLACE_ORDER_REQUEST:
      return {loading: true};

    case PLACE_ORDER_SUCCESS:
      return {loading: false, order: action.payload, success: true};
    
    case PLACE_ORDER_FAIL:
      return {loading: false, error: action.payload}
    
    case PLACE_ORDER_RESET:
      return {};
  
    default:
      return state;
  }
}

export const orderDetailsReducer = (
  state={ loading: true,
   order:{orderItems:[], shippingAddress:{}, user:{}, isPaid:false, totalPrice: '2.22'}}, 
   action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {...state, loading: true};
  
    case ORDER_DETAILS_SUCCESS:
      return {loading: false, order: action.payload, success: true};

    case ORDER_DETAILS_FAIL:
      return {loading: false, error: action.payload}

    default:
      return state;
  }
}

export const orderPaidreducer = (state={loading: false, success: false}, action)=>{
  switch (action.type) {
    case ORDER_PAID_REQUEST:
      return {loading: true};

    case ORDER_PAID_SUCCESS:
      return {loading: false, order:action.payload, success: true, }
    
    case ORDER_PAID_FAIL:
      return {loading: false, error: action.payload};

    case ORDER_PAID_RESET: 
      return {}
  
    default:
      return state;
  }
}

export const myOrdersReducers = (state={}, action) =>{
  switch (action.type) {
    case MY_ORDERS_REQUEST:
      return {...state, loading: true, success: false};

    case MY_ORDERS_SUCCESS:
      return {loading: false, orders: action.payload, success: true}
  
    case MY_ORDERS_FAIL:
      return {success: false, loading: false, error: action.payload};

    default:
      return state;
  }
}

export const myOrderDeleteReducer = (state={}, action)=>{
  switch (action.type) {
    case MY_ORDER_DELETE_REQUEST:
      return {loading: true};
    case MY_ORDER_DELETE_SUCCESS:
      return {loading: false, deleted: action.payload, successDel: true}
    case MY_ORDER_DELETE_FAIL: 
      return {loading: false, error:action.payload}
    case MY_ORDER_DELETE_RESET:
      return {};
  
    default:
      return state;
  }
}

export const adminOrderlistReducer = (state={}, action) =>{
  switch (action.type) {
    case ADMIN_ORDERLIST_REQUEST:
      return {...state, loading:true};
    
    case ADMIN_ORDERLIST_SUCCESS:
      return {loading: false, orderlist: action.payload}

    case ADMIN_ORDERLIST_FAIL:
      return {loading: false, error: action.payload}
  
    default:
      return state;
  }
}

export const deliveryStatusReducer = (state={}, action)=>{
  switch (action.type) {
    case DELIVERY_STATUS_REQUEST:
      return {loading: true};

    case DELIVERY_STATUS_SUCCESS:
      return {loading: false, data:action.payload, success: true};

    case DELIVERY_STATUS_FAIL: 
    return {loading: false, error: action.payload};

    case DELIVERY_STATUS_RESET: 
      return {};
  
    default:
      return state;
  }
}