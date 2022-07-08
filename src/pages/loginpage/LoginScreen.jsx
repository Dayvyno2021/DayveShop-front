import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginAction } from '../../actions/userActions';
import Spinner from '../../components/spinner/Spinner';
import Alert from '../../components/alert/Alert';


const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const redirect = location.search? location.search.split('=')[1] : '';

  const [loginInput, setLoginInput] = useState({});
  const userLoginReducer = useSelector((state)=>state.userLoginReducer)
  const {loading, userDetails, error} = userLoginReducer;

  const inputHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setLoginInput((values)=>({...values, [name]: value}))
  }

  useEffect(()=>{
    if (userDetails){
      navigate(`/${redirect}`)
    } 
  }, [navigate, userDetails, redirect])

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(userLoginAction(loginInput))
  }

  return (
    <div className='login--container'>
      {loading && <Spinner/>}
      {error && <Alert message={error} />}
      <form onSubmit={handleLogin} className="login">
        <div className="login--heading"><i className="">Login</i></div>
        <div className="login--control email">
          <label htmlFor="email" className="name--label bold7"><i className="">Email:</i></label>
          <input type="email" name='email' id='email' className="name--input input" 
            placeholder='Email' autoComplete='true'
            onChange={inputHandler} value = {loginInput.email || ''}
          />
        </div>
        <div className="login--control password">
          <label htmlFor="password" className="name--label bold7"><i className="">Password:</i></label>
          <input type="password" name='password' id='password' 
            className="email--input input" placeholder='Password' autoComplete='true'
            onChange={inputHandler} value = {loginInput.password || ''}
          />
        </div>
        <button className="login--button btn1" type='submit' ><i className="">login</i></button>
      </form>
      <div className="register--login">
        <i className="">Yet to register? </i>
        <Link className="rm-deco" 
          to={redirect==='shipping'? `/register?redirect=shipping` : '/register'} >
          <button className='btn'><i className="">register</i></button>
        </Link>
      </div>
    </div>
  )
}

export default LoginScreen