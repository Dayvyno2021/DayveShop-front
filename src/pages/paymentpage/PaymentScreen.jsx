import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { paymentAction } from '../../actions/cartActions';
import Checkout from '../../components/checkoutNav/Checkout';
import {useNavigate} from 'react-router-dom';

const PaymentScreen = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartReducer = useSelector(state=>state.cartReducer)
  const {paymentMethod, shipping} = cartReducer;

  if(!shipping) navigate('/shipping');

  const [input, setInput] = useState(paymentMethod);

  const handlePayment = (e) =>{
    e.preventDefault();
    if (!input){
      alert('All fields must be field')
    } else{
      dispatch(paymentAction(input));
      navigate('/placeorder');
    }
  }

  return (
    <div className='payment'>
      <Checkout step1 step2 step3 />
      <h2><i className="">Payment</i></h2>
      <form onSubmit={handlePayment} className="payment--form">
        <div className="form--control__payment">
          <input type="radio" name='paymentMethod' id='paystack' className="radio--input" 
            placeholder='address' 
            onChange={(e)=>setInput(e.target.value)} 
            value = 'PayStack'
            checked={input==='PayStack'}
          />
          <label htmlFor="paystack" className="radio bold7">
            <span  className='radio--button'></span>
            <i className="radio--label"> Paystack </i>
          </label>
        </div>
        <div className="form--control__payment">
          <input type="radio" name='paymentMethod' id='paypal' className="radio--input" 
            placeholder='address' 
            onChange={(e)=>setInput(e.target.value)} value = 'PayPal'
            checked={input==='PayPal'}
          />
          <label htmlFor="paypal" className="radio bold7">
            <span  className='radio--button'></span>
            <i className="radio--label"> PayPal </i>
          </label>
        </div>
        <button className="center-btn btn1" type='submit' ><i className="">Submit</i></button>
      </form>
    </div>
  )
}

export default PaymentScreen