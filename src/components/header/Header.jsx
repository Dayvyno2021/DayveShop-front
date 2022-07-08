import { memo, useState} from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { logoutAction } from '../../actions/userActions';
import ProfileScreen from '../../pages/profilepage/ProfileScreen';
import Modal from '../reactPortal/reactPortal';
import NavbarScreen from '../../pages/navbarpage/NavbarScreen';
const Header = () => {
  const dispatch = useDispatch();

  const userProfileReducer = useSelector((state)=>state.userProfileReducer)
  const {userDetails} = userProfileReducer;

  const cartReducer = useSelector(state=>state.cartReducer)
  const {cartItems} = cartReducer;

  let f = cartItems && cartItems.map((value)=>value.qty).reduce((t,v)=>t+v, 0);

  const [show, setShow] = useState(false)
  const [showNav, setShowNav] = useState(false)

  const handleShow = () => {
    setShow(!show);
  }

  const handleShowNav = () =>{
    setShowNav(!showNav)
  }

  const handleShowNavUp = () =>{
    handleShowNav();
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }
  // eslint-disable-next-line 
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState('');

  const search = (event) => {
    event.preventDefault();
    let filter = searchInput || '';
    if (filter) {
      setSearchParams({filter})
    } else {
      setSearchParams({})
    }
    return filter
  }

  return (
    <>
    <header className='header'>
      <nav className='header--container'>
        <Link to={'/'} className='home'>
          <img src="/brand.ico" alt="" className='brand' />
          <svg className="header--icon-grey"><use xlinkHref="/img/symbol-defs.svg#icon-home"></use></svg>
        </Link>
        <form className="search">
          <div className="search--group">
            <input type="search" className="header--group__input" id='search' 
              placeholder='search...' value={searchInput}
              onChange={(e)=>setSearchInput(e.target.value)}
            />
            {/* <input type="search" className="header--group__input" id='search' 
              placeholder='search...' value={searchParams.get('filter') || ''}
              onChange={
                (e)=>{
                  let filter = e.target.value;
                  if (filter){
                    setSearchParams({filter})
                  }else {
                    setSearchParams({})
                  }
                }
              }
            /> */}
          </div>
          <button className="search--button" onClick={search}>
            <svg className="header--icon-grey"><use xlinkHref="/img/symbol-defs.svg#icon-magnifying-glass"></use></svg>
          </button>
        </form>
        <div className="header--cart">
          <Link to={'/cart/id'} className='rm-deco link'>
            <svg className="header--icon-grey"><use xlinkHref="/img/symbol-defs.svg#icon-cart"></use></svg>
            {f===0? <div></div> : <div className='cart--qty'>{f}</div>}
          </Link>
        </div>

        {
          !userDetails? 
          (
          <div className="icon--container header--links">
            <Link to={'/login'} className='link'>
              <svg className="header--icon-grey"><use xlinkHref="/img/symbol-defs.svg#icon-user"></use></svg>
              <span className='styled-font'>Login</span>
            </Link>
          </div> 
          )
          :
          (
          <Link to={'/'} className="icon--container link" onClick={()=>dispatch(logoutAction())}>
            <span className='styled-font'>
              <svg className="header--icon-grey"><use xlinkHref="/img/symbol-defs.svg#icon-switch"></use></svg>
              Logout
            </span>
          </Link>
          )
        }

        {!userDetails && 
        (
        <div className="icon--container">
          <Link to={'/register'} className='link'>
            <svg className="header--icon-grey"><use xlinkHref="/img/symbol-defs.svg#icon-user-plus"></use></svg>
            <span className='styled-font'>Register</span>
          </Link>
        </div>
        )}
        {userDetails && 
        (
        <div className="icon--container link">
          <p className='styled-font' onClick={handleShow}>
            <svg className="header--icon-grey"><use xlinkHref="/img/symbol-defs.svg#icon-circle-down"></use></svg>
            {userDetails && userDetails.name} Profile
          </p>
        </div>
        )}
        {
        show && ( <Modal> <ProfileScreen handleShow={handleShow} /></Modal> )
        }
        {/* <div className="header--close header--control">
            <svg className="header--icon"><use xlinkHref="/img/symbol-defs.svg#icon-cross"></use></svg>
        </div> */}
        <div className="header--open header--control">
          <div onClick={handleShowNavUp} > 
            <svg className="header--icon link"><use xlinkHref="/img/symbol-defs.svg#icon-menu1"></use></svg>
          </div>
        </div>
          {
            showNav &&  (<Modal><NavbarScreen handleShowNav = {handleShowNav} /></Modal>)
          }
      </nav>
    </header>
    </>
  )
}

export default memo(Header) 