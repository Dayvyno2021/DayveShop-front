import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Checkout from '../../components/checkoutNav/Checkout';
import { useDispatch, useSelector } from 'react-redux';
import { shippingAction } from '../../actions/cartActions';


const ShippingScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartReducer = useSelector(state=>state.cartReducer);
  const {shipping} = cartReducer;

  const [input, setInput] = useState({
    address: shipping && shipping.address,
    city: shipping && shipping.city,
    postalCode: shipping && shipping.postalCode,
    country:shipping && shipping.country
  });

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((values)=>({...values, [name]:value}))
  }

  const handleShipping=(e)=>{
    e.preventDefault();
    const {address, city, postalCode, country} = input;
    if (!address || !city || !postalCode || !country){
      alert("All fields are required")
    } else{
      dispatch(shippingAction(input))
      navigate('/payment')
    }
  }

  return (
    <div className='shipping'>
      <Checkout step1 step2 />
      <h2><i className="">Shipping</i></h2>
      <form onSubmit={handleShipping} className="shipping--form">
        <div className="form--control">
          <label htmlFor="address" className=" bold7"><i className="">Address:</i></label>
          <input type="text" name='address' id='address' className="name--input input" 
            placeholder='address' autoComplete='true'
            onChange={inputHandler} value = {input.address || ''}
          />
        </div>
        <div className="form--control">
          <label htmlFor="city" className="name--label bold7"><i className="">City:</i></label>
          <input type="text" name='city' id='city' 
            className="input" placeholder='City' autoComplete='true'
            onChange={inputHandler} value = {input.city || ''}
          />
        </div>
        <div className="form--control">
          <label htmlFor="postal" className=" bold7"><i className="">Poatal Code:</i></label>
          <input type="number" name='postalCode' id='postal' 
            className=" input" placeholder='Postal Code' autoComplete='true'
            onChange={inputHandler} value = {input.postalCode || ''}
          />
        </div>
        <div className="form--control">
          <label htmlFor="country" className=" bold7"><i className="">City:</i></label>
          <input type="text" name='country' id='country' 
            className=" input" placeholder='Country' autoComplete='true'
            onChange={inputHandler} value = {input.country || ''}
          />
        </div>
          <button className="shipping--button btn1" type='submit' ><i className="">Submit</i></button>
      </form>
    </div>
  )
}

export default ShippingScreen