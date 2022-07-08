import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Checkout from '../../components/checkoutNav/Checkout';
import {useSelector, useDispatch} from 'react-redux';
import { placeOrderAction } from '../../actions/orderActions';
import { useEffect } from 'react';
import Spinner from '../../components/spinner/Spinner';
import Alert from '../../components/alert/Alert';
import { PLACE_ORDER_RESET } from '../../constants/orderConstants';



const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartReducer = useSelector(state=>state.cartReducer)
  const {paymentMethod, cartItems, shipping} = cartReducer;

  const placeOrderReducer = useSelector(state=>state.placeOrderReducer);
  const {loading, error, success, order} = placeOrderReducer;

  if (!paymentMethod) navigate('/payment');
  if (!shipping) navigate('/shipping');

  const decimal2 = (num)=>{
    return Number(num).toFixed(2)
  }
  let itemsPrice = cartItems.reduce((acc, value)=>acc + (value.price*value.qty), 0);
  itemsPrice = decimal2(itemsPrice);

  let shippingPrice = itemsPrice>500000? 0: 0.05*itemsPrice;
  shippingPrice = decimal2(shippingPrice)

  let taxPrice = 0.02 * itemsPrice;
  taxPrice = decimal2(taxPrice);

  let totalPrice = Number(itemsPrice) + Number( shippingPrice) + Number(taxPrice)
  totalPrice = decimal2(totalPrice);

  const handlePlaceOrder = () => {
    dispatch(placeOrderAction({
      orderItems: cartItems,
      shippingAddress: shipping,
      paymentMethod: paymentMethod,
      shippingPrice,
      taxPrice,
      totalPrice
    }))
  }

  useEffect(()=>{
    if (success){
      navigate(`/order/${order._id}`)
      dispatch({type: PLACE_ORDER_RESET})
    }
    // eslint-disable-next-line
  }, [navigate, success])

  return (
    <div className='placeorder'>
      {loading && <Spinner />}
      {error && <Alert message={error}/>}
      <div className="checkout--list">
        <Checkout step1 step2 step3 step4 />
      </div>
      <div className="placeorder--items">
        <div className="placeorder--list">
          <h2 className='mb2'><i className="placeorder--items__header">Order Items</i></h2>
          {cartItems.map((cartItem)=>(
            <div className="cart--items" key={cartItem.product}>
              <Link to={`/product/${cartItem.product}`}>
                <img src={cartItem.image} alt="" className="cart--image" />
              </Link>
              <Link to={`/product/${cartItem.product}`} className='link2'>
                <p className="">{cartItem.name}</p>
              </Link>
              <p className="">
                {cartItem.qty}{' '} x &#8358;{cartItem.price.toLocaleString()} = 
                &#8358;{(cartItem.price*cartItem.qty).toLocaleString()} 
              </p>
            </div>
          ))}
        </div>
        <div className="placeorder--shipping">
          <h2 className='mb2'><i className="placeorder--items__header">Shippment Address</i></h2>
          <p className="">
            {shipping.address} {shipping.city}, {shipping.country}. 
            |Postal Code: {shipping.postalCode}
          </p>
        </div>

        <div className="placeorder--payment">
          <h2 className='mb2'><i className="placeorder--items__header">Payment Method</i></h2>
          <p className="">{paymentMethod}</p>
        </div>
      </div>

      <div className="placeorder--summary">
        <h2 className='mb2'><i className="placeorder--items__header">Order Summary</i></h2>
        <div className="placeorder--summary__content">
          <div className="item">
            <p className="bold7">Items Price:</p>
            <p className="">&#8358;{Number(itemsPrice).toLocaleString()} </p>
          </div>
          <div className="item">
            <p className="bold7">Shipping Price:</p>
            <p className="">&#8358;{Number(shippingPrice).toLocaleString()} </p>
          </div>
          <div className="item">
            <p className="bold7">Tax Price:</p>
            <p className="">&#8358;{Number(taxPrice).toLocaleString()} </p>
          </div>
          <div className="item">
            <p className="bold7">Total Price:</p>
            <p className="">&#8358;{Number(totalPrice).toLocaleString()} </p>
          </div>
          <button className="btn1 center-btn" onClick={handlePlaceOrder} >
            Place Order
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder