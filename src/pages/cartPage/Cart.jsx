import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCartAction } from '../../actions/cartActions';
import { Link } from 'react-router-dom';

const Cart = ({cartItem, deleteFromCart}) => {

  // const stockCount = cartItem && cartItem.countInStock
  const dispatch = useDispatch();

  return (
    <div className='cart'>
      <div className="cart--detail">
        <Link to={`/product/${cartItem.product}`}>
          <img src={cartItem && cartItem.img? `https://dayve-store.herokuapp.com/api/products/get/${cartItem.product}`: cartItem.image} alt="" className="cart--detail__image" />
          {/* <img src={cartItem.image} alt="" className="cart--detail__image" /> */}
        </Link>
        <Link to={`/product/${cartItem.product}`} className="cart--detail__name ">
          <div>{cartItem.name}</div>
        </Link>
        <div className="price1">&#8358;{cartItem && cartItem.price.toLocaleString()} </div>
      </div>

      <div className="cart--actions">
        <div className="cart--actions__delete" 
          onClick={()=>deleteFromCart(cartItem.product)}
        >
          Remove
          <svg className="icon1"><use xlinkHref="/img/symbol-defs.svg#icon-bin"></use></svg>
        </div>
        <form >
          <select name='qty' className='select1' value={cartItem.qty}  id="qty" 
            onChange={(e)=>dispatch(addToCartAction(Number(e.target.value), cartItem.product))}
           >
            {
              [...Array(cartItem.countInStock).keys()].map((x)=>(
                <option value={x+1} key={x+1} >{x+1}</option>
              ))
            }
          </select>
        </form>
      </div>
    </div>
  )
}

export default Cart