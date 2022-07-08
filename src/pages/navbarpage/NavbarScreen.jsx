import React from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { logoutAction } from '../../actions/userActions';

const NavbarScreen = ({handleShowNav}) => {
  const dispatch = useDispatch();

  const userProfileReducer = useSelector((state)=>state.userProfileReducer)
  const {userDetails} = userProfileReducer;

  return (
    <div className='nav--container'>
      <div className="space" onClick={handleShowNav} ></div>
      <div className="nav">
        <button className='nav--close' onClick={handleShowNav}>
          <svg className="icon-white"><use xlinkHref="/img/symbol-defs.svg#icon-cross"></use></svg>
        </button>
        <ul className="nav--list">
          <Link to='/admin/userslist' className="rm-deco3" onClick={handleShowNav} >
            {userDetails && userDetails.isAdmin && <li className="item">Users List</li>}
          </Link>
          <Link to={'/admin/productslist'} className="rm-deco3" onClick={handleShowNav}>
            {userDetails && userDetails.isAdmin &&  <li className="item">Product List</li>}
          </Link>
          <Link to={'/admin/orderlist'} className='rm-deco3' onClick={handleShowNav}>
            {userDetails && userDetails.isAdmin &&  <li className="item">Order List</li>}
          </Link>
          <li className="item">
            {
            !userDetails? 
            (
            <Link to={'/login'} className='rm-deco3' onClick={handleShowNav} >
              Login
            </Link>
            )
            :
            (
            <Link to={'/'} className="rm-deco3" onClick={()=>dispatch(logoutAction())}>
              Logout
            </Link>
            )
            }
          </li>
          <li className="item">
          {
          !userDetails && 
            <Link to={'/register'} className='rm-deco3' onClick={handleShowNav} >
              Register
            </Link>
          }
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NavbarScreen