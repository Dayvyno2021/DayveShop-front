import React from 'react';
import { useEffect, /*useCallback */} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner';
import Alert from '../../components/alert/Alert';
import { deliveryStatusAction, orderDetailsAction, orderPaidAction } from '../../actions/orderActions';
// import { useState } from 'react';
import PayPal from '../../components/paypal/PayPal';
import {PayPalButtons } from "@paypal/react-paypal-js";
import { DELIVERY_STATUS_RESET, ORDER_PAID_RESET } from '../../constants/orderConstants';
// import Paystack from '../../components/paystack/Paystack';
// import axios from 'axios';


const OrderPageScreen = () => {

  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const userLoginReducer = useSelector(state=>state.userLoginReducer);
  const {userDetails} = userLoginReducer

  const orderDetailsReducer = useSelector(state=>state.orderDetailsReducer);
  const {loading, order, order:{totalPrice}, error, success} = orderDetailsReducer;

  const orderPaidreducer = useSelector(state=>state.orderPaidreducer);
  const {success: successPaid} = orderPaidreducer

  const deliveryStatusReducer = useSelector(state=>state.deliveryStatusReducer);
  const {loading: loadingDelvr, success: successDelvr, error:errorDelvr} = deliveryStatusReducer

  const decimal2 = (num)=>{
    return Number(num).toFixed(2)
  }
  let itemsPrice = order && order.orderItems.reduce((acc, value)=>acc + (value.price*value.qty), 0);
  itemsPrice = decimal2(itemsPrice);


  useEffect(()=>{

    if (!success || successPaid || order._id!==params.id || successDelvr){
      dispatch({type: ORDER_PAID_RESET})
      dispatch({type: DELIVERY_STATUS_RESET})
      dispatch(orderDetailsAction(params.id))
    } 
    // else {
    //   setPrice(order.totalPrice)
    // }
    // eslint-disable-next-line
  }, [dispatch, params, success, successPaid, successDelvr])

  const createOrder = async(data, actions) => {
    const pr = parseInt(totalPrice);
    return await actions.order.create({
        purchase_units: [
            {
                amount: {
                    value: pr || 2.21
                },
            },
        ],
    });
  }

  const onApprove =async (data, actions) => {
    const details =await  actions.order.capture()
    dispatch(orderPaidAction(details, params.id))
    localStorage.removeItem("cartItems")
    window.location.reload();

    return details
  }

  const dateFormat = (info) =>{
    const date =info && info.substr(0, 10).split('-');
    const yy = date[0];
    const mm = date[1];
    const dd = date[2]
    return `${dd}-${mm}-${yy}`
  }

  const payment = (paymentMethod) => {
    if (paymentMethod==='PayStack'){
      navigate(`/payment/paystack/${params.id}`)
    }
  }

  const handleDelivery = (id) =>{
    dispatch(deliveryStatusAction(id))
  }

  return (
    <div className='orderpage'>
      {(loading || loadingDelvr) && <Spinner />}
      {(error || errorDelvr) && <Alert message={error} />}
      <div className="orderpage--items">

        <div className="order--payment my2">
          <h2 className=''><i className="placeorder--items__header">Payment Method</i></h2>
          <div className="order--payment__1">
            <div className="order--payment__2">
              <p className="bold7 mr1">Payment Method:</p>
              <p className="">{order && order.paymentMethod}</p>
            </div>
            <div className="order--payment__2">
              <p className="bold7 mr1">Paid?:</p>
              <p className="">{
                order && order.isPaid? 
                (<svg className="icon-green"><use xlinkHref="/img/symbol-defs.svg#icon-checkbox-checked"></use></svg>) 
                : 
                (<svg className="icon-red"><use xlinkHref="/img/symbol-defs.svg#icon-cross"></use></svg>)
              } 
              </p>
            </div>
            <div className="order--payment__2">
              <p className="bold7 mr1">Payment Date:</p>
              <p className="">{order.paidAt? dateFormat(order && order.paidAt): ''}</p>
            </div>
          </div> 
        </div>

        <div className="order--shipping my2">
          <h2 className=''><i className="placeorder--items__header">Shipping</i></h2>
          <div className="order--shipping__1">
            <div className="order--shipping__2">
              <p className="bold7 mr1">Name:</p>
              <p className="">
                {order && order.user.name} 
              </p>
            </div>
            <div className="order--shipping__2">
              <p className="bold7 mr1">Email:</p>
              <p className="">
                <a href={`mailto:${order && order.user.email}`} className='email'>
                  {order && order.user.email} 
                </a> 
              </p>
            </div>
            <div className="order--shipping__2">
              <p className="bold7 mr1">Address:</p>
              <p className="">
                {order && order.shippingAddress.address} 
                {order && order.shippingAddress.city}, 
                {order && order.shippingAddress.country}. 
                |Postal Code: {order && order.shippingAddress.postalCode}
              </p>
            </div>
            <div className="order--shipping__2">
              <p className="bold7 mr1">Delivered?:</p>
              <p className="">
                {
                  order && order.isDelivered? 
                  (<svg className="icon-green"><use xlinkHref="/img/symbol-defs.svg#icon-checkbox-checked"></use></svg>) 
                  : 
                  (<svg className="icon-red"><use xlinkHref="/img/symbol-defs.svg#icon-cross"></use></svg>)  
                }
              </p>
            </div>
          </div>
        </div>
        <div className="order--items">
          <h2 className=''><i className="placeorder--items__header">Order Items</i></h2>
          <div className="placeorder--items__list mb2">
            {order && order.orderItems.map((cartItem)=>(
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
        </div>
      </div>

      <div className="placeorder--summary">
        <h2 className=''><i className="placeorder--items__header">Order Summary</i></h2>
        <div className="placeorder--summary__content">
          <div className="item">
            <p className="bold7">Items Price:</p>
            <p className="">&#8358;{Number(itemsPrice).toLocaleString()} </p>
          </div>
          <div className="item">
            <p className="bold7">Shipping Price:</p>
            <p className="">&#8358;{Number(order && order.shippingPrice).toLocaleString()} </p>
          </div>
          <div className="item">
            <p className="bold7">Tax Price:</p>
            <p className="">&#8358;{Number(order && order.taxPrice).toLocaleString()} </p>
          </div>
          <div className="item">
            <p className="bold7">Total Price:</p>
            <p className="">&#8358;{Number(order && order.totalPrice).toLocaleString()} </p>
          </div>
        </div>
        <div className="payment">
        {  !order.isPaid ? 
        (<div className="paypal--payment">
          {
            order.paymentMethod ==='PayPal'?
            (
              <PayPal>
                <PayPalButtons
                  createOrder={(data,actions)=>createOrder(data, actions)}
                  onApprove= {(data, actions)=>onApprove(data, actions)}
                />
              </PayPal>  
            )
            :
            (
              <div>
                <button className="paystack--payment btn1 center-btn"
                  onClick={()=>payment(order && order.paymentMethod)}
                >
                  <img src="/img/paystack.svg" alt="" className='paystack-logo' />
                  COMPLETE PAYMENT
                </button>
              </div>
            )
          }
      
        </div>
        ) : ''   
          }
          {
            userDetails && userDetails.isAdmin && !order.isDelivered && order.isPaid &&
            <button className="mark--delivery btn1" onClick={()=>handleDelivery(params.id)}>
              MARK ORDER AS DELIVERED
            </button>
          }
        </div>
      </div>
    </div>
  )
}

export default OrderPageScreen