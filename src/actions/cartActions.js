import { ADD_TO_CART_REQUEST, 
  ADD_TO_CART_SUCCESS, 
  REMOVE__FROM__CART, 
  SHIPPING_DETAILS,
  PAYMENT_METHOD
} from "../constants/cartConstants";
import axios from "axios";

export const addToCartAction = (qty, id) => async (dispatch, getState) => {

  try {
    const {data} = await axios.get(`https://dayve-store.herokuapp.com/api/products/${id}`)

    dispatch({type: ADD_TO_CART_REQUEST})

    dispatch({
      type: ADD_TO_CART_SUCCESS,
      payload: {
        name: data.name,
        image: data.image,
        price: data.price,
        product: data._id,
        countInStock: data.countInStock,
        img: data && data.img? true: false,
        qty
      }
    })
  } catch (error) {
    console.log(error)
  }

  localStorage.setItem('cartItems', JSON.stringify(getState().cartReducer.cartItems))
}

export const removeFromCartAction = (id) => async(dispatch, getState)=>{
  dispatch({
    type: REMOVE__FROM__CART,
    payload: id
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cartReducer.cartItems))
}

export const shippingAction = (input) => (dispatch, getState) => {
  dispatch({
    type: SHIPPING_DETAILS,
    payload: input
  })

  localStorage.setItem('shipping', JSON.stringify(getState().cartReducer.shipping))
}

export const paymentAction = (payment) => (dispatch, getState) =>{
  dispatch({
    type: PAYMENT_METHOD,
    payload: payment
  })

  localStorage.setItem(
    'paymentMethod', 
    JSON.stringify(getState().cartReducer.paymentMethod)
  )
}