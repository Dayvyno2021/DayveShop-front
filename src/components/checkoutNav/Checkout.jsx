import {Link, Outlet} from 'react-router-dom';

const Checkout = ({step1, step2, step3, step4}) => {
  return (
    <div className="checkout">
      <nav className="checkout--nav">
        {step1 ? 
        (
          <div className="nav--active">
            <Link to={'/login'} className='rm-deco nav'>Login</Link>
          </div>
        )
        :
        (
          <div className="nav--false">
            Login
          </div>
        )}
      </nav>
      <nav className="checkout--nav">
        {step2 ? 
        (
          <div className="nav--active">
            <Link to={'/shipping'} className='rm-deco nav'>Shipping</Link>
          </div>
        )
        :
        (
          <div className="nav--false">
            Shipping
          </div>
        )}
      </nav>
      <nav className="checkout--nav">
        {step3 ? 
        (
          <div className="nav--active">
            <Link to={'/payment'} className='rm-deco nav'>Payment</Link>
          </div>
        )
        :
        (
          <div className="nav--false">
            Payment
          </div>
        )}
      </nav>
      <nav className="checkout--nav">
        {step4 ? 
        (
          <div className="nav--active">
            <Link to={'/placeholder'} className='rm-deco nav'>Placeholder</Link>
          </div>
        )
        :
        (
          <div className="nav--false">
            Placeholder
          </div>
        )}
      </nav>
      <Outlet/>
    </div>
  )
}

export default Checkout;