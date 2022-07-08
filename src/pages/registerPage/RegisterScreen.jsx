import React,{useState, useEffect} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { userRegisterAction } from '../../actions/userActions';
import Spinner from '../../components/spinner/Spinner';
import Alert from '../../components/alert/Alert'

const RegisterScreen = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = location.search? location.search.split('=')[1] : '';

  const [input, setInput] = useState({});

  const userRegisterReducer = useSelector((state)=>state.userRegisterReducer);
  const {loading, userDetails, error} = userRegisterReducer;

  const handleInput = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setInput((values)=>({...values, [name]:value}))
  }

  useEffect(()=>{
    if (userDetails){
      navigate(`/${redirect}`)
    }
  }, [navigate, userDetails, redirect])

  const handleSubmit = (event) =>{
    event.preventDefault();
    dispatch(userRegisterAction(input))  
  }

  return (
    <div className='register--container'>
      {loading && <Spinner />}
      {error && <Alert message={error} />}
      <form onSubmit={handleSubmit} className='register'>
        <div className="register--heading"><i className="">Register</i></div>
        <div className="login--control name">
          <label htmlFor="name" className="name--label bold7"><i className="">full name:</i></label>
          <input type="text" name='name' id='name' 
            autoComplete='true' className="name--input input" placeholder='full name'
            onChange={handleInput} value = {input.name || ''}
          />
        </div>
        <div className="login--control email">
          <label htmlFor="email" className="name--label bold7"><i className="">Email:</i></label>
          <input type="email" name='email' id='email' 
            autoComplete='true' className="email--input input" placeholder='Email'
            onChange={handleInput} value = {input.email || ''} 
          />
        </div>
        <div className="login--control password">
          <label htmlFor="password" className="name--label bold7"><i className="">Password:</i></label>
          <input type="password" name='password' autoComplete='true' 
            id='password' className="password--input input" placeholder='Enter password' 
            onChange={handleInput} value = {input.password || ''}
          />
        </div>
        <div className="login--control c-password">
          <label htmlFor="cPassword" className="name--label bold7"><i className="">Password:</i></label>
          <input type="password" name='cPassword' autoComplete='true' 
            id='cPassword' className="cPassword--input input" placeholder='Confirm password' 
            onChange={handleInput} value = {input.cPassword || ''}
          />
        </div>
        <button className='register--submit btn1' type='submit'>
          <i className="">Register</i>
        </button>
      </form>

      <div className="register--login">
        <i className="">Already registered? </i>
        <Link className="rm-deco" to={'/login'}>
          <button className='btn'><i className="">login</i></button>
        </Link>
      </div>
    </div>
  )
}

export default RegisterScreen