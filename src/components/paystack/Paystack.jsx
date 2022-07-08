import React, {useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PaystackButton } from 'react-paystack';
import { useDispatch, useSelector } from 'react-redux';
import { orderDetailsAction, orderPaidAction } from '../../actions/orderActions';
import Spinner from '../spinner/Spinner';
import { EMPTY_CART } from '../../constants/cartConstants';

const Paystack = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();


  const orderDetailsReducer = useSelector(state=>state.orderDetailsReducer);
  const {loading, order, order:{totalPrice}, error, success} = orderDetailsReducer;

  useEffect(() => {
    if (!success){
      dispatch(orderDetailsAction(params.id))
    }
  }, [dispatch, params, success])

  const paymentResult = {
    update_time: new Date().toISOString(),
    id: Date.now(),
    status: 'COMPLETE',
    payer: {email_address: order && order.user.email} 
  }

  const onSuccess = () =>{
    localStorage.removeItem("cartItems")
    dispatch({type: EMPTY_CART})
    dispatch(orderPaidAction(paymentResult, order._id))//do something
    navigate(`/order/${params.id}`)
  
  }
  
  const componentProps = {
    email: order && order.user.email,
    amount : parseInt(totalPrice*100),
    publicKey : "pk_test_b0fc7016edb20e8c5b1addca186a557f84668f83",
    text: "Pay Now",
    onSuccess: onSuccess,
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  }

  return (
    <div className='paystack'>
      {loading && <Spinner/>}
      {error && alert(error)}
          <div className="paystack--heading">
            <img src="/img/paystack.svg" alt="" className='paystack-logo' />
          </div>
       <div className="profile2">
          <div className="profile2--name">
            <p className="bold7">Name:</p>
            <p className="font16">{order && order.user.name}</p>
          </div>
          <div className="profile2--name">
            <p className="bold7">AMOUNT:</p>
            <p className="font16">&#8358;{(order && order.totalPrice).toLocaleString()}</p>
          </div>
          <div className="profile2--name">
            <p className="bold7">EMAIL:</p>
            <p className="font16">{order && order.user.email} </p>
          </div>
        </div>
          <PaystackButton 
            className="paystack-button btn1 center-btn" 
            {...componentProps}  
          />

    </div>
  )
}

export default Paystack