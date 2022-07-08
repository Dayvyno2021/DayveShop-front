import { ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, EMPTY_CART, PAYMENT_METHOD, REMOVE__FROM__CART, SHIPPING_DETAILS } from "../constants/cartConstants";

const cartItemFromStorage = localStorage.getItem('cartItems') ? 
  JSON.parse(localStorage.getItem('cartItems')) : [];

  const shippingDetails = localStorage.getItem('shipping')?
  JSON.parse(localStorage.getItem('shipping')) : {};

  const localStoragePayment = localStorage.getItem('paymentMethod')?
  JSON.parse(localStorage.getItem('paymentMethod')) : '';

export const cartReducer = (state=
  {
    cartItems:cartItemFromStorage, 
    shipping:shippingDetails, 
    paymentMethod: localStoragePayment
  }, 
  action) =>{
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      return {...state, loading: true}

    case ADD_TO_CART_SUCCESS:
      const item = action.payload;
      const existItem = state.cartItems.find((x)=>x.product===item.product);
      if (existItem){
        return {
          ...state, loading: false,
          cartItems: state.cartItems.map(x=>{
            return x.product===item.product? item : x
          })
        }
      } else {
        return {...state, loading: false, cartItems:[...state.cartItems, item]}
      }

    case REMOVE__FROM__CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(x=>x.product !== action.payload)
      }
    
    case SHIPPING_DETAILS: 
      return {...state, shipping: action.payload}

    case PAYMENT_METHOD:
      return {...state, paymentMethod: action.payload}

    case EMPTY_CART:
      return {cartItems:[]};
  
    default:
      return state;
  }
}