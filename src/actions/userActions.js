import axios from 'axios';
import { 
  ADMIN_EDIT_USER_FAIL,
  ADMIN_EDIT_USER_REQUEST,
  ADMIN_EDIT_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  MAKE_ADMIN_FAIL,
  MAKE_ADMIN_REQUEST,
  MAKE_ADMIN_SUCCESS,
  USERLIST_FAIL,
  USERLIST_REQUEST,
  USERLIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS 
} from '../constants/userConstants';

export const userRegisterAction = (input) => async(dispatch) => {
  const {name, email, password} = input;

  try {
    dispatch({type: USER_REGISTER_REQUEST})

    const config = {
      headers : {
        "Content-Type" : "application/json"
      }
    }

    const {data} = await axios.post(
      'http://localhost:5000/api/user/register', 
      {name, email, password},
      config
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data
    })
    
    localStorage.setItem('userDetails', JSON.stringify(data))

  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.resnponse && error.resnponse.data.message ?
        error.resnponse.data.message : error.resnponse
    })
  }
}

export const userLoginAction = (login) => async(dispatch) => {
  try {
    const {email, password} = login;

    dispatch({type: USER_LOGIN_REQUEST})
  
    const config = {
      headers: {
        'Content-Type' : 'application/json'
      }
    }
  
    const {data} = await axios.post(
      `http://localhost:5000/api/user/login`,
      {email, password},
      config
      )
  
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data
      })

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data
      })
      dispatch({
        type: USER_PROFILE_SUCCESS,
        payload: data
      })

      localStorage.setItem('userDetails', JSON.stringify(data))
    
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message ? 
        error.response.data.message : error.response
    })
  }
}

export const logoutAction = () => async(dispatch) =>{
  // localStorage.clear();
  localStorage.removeItem('cartItems');
  localStorage.removeItem('userDetails');
  localStorage.removeItem('shipping');
  localStorage.removeItem('paymentMethod');
  dispatch({type: USER_LOGOUT})
  document.location.href = '/';
}

export const userProfileAction = () => async(dispatch, getState) =>{
  try {
    dispatch({type: USER_PROFILE_REQUEST})

  const {userLoginReducer:{userDetails:{token}}} = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  
  const {data} = await axios.get('http://localhost:5000/api/user/profile', config)

  dispatch({
    type: USER_PROFILE_SUCCESS,
    payload: data
  })

  dispatch({
    type: USER_LOGIN_SUCCESS,
    payload: data
  })

  dispatch({
    type: USER_REGISTER_SUCCESS,
    payload: data
  })
    
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload: error.response && error.response.data.message?
        error.response.data.message : error.response
    })
  }
}

export const userUpdateAction = (input) => async(dispatch, getState) => {
  try {

    const {name, password, id} = input

    dispatch({type: USER_UPDATE_REQUEST})

    const {userLoginReducer:{userDetails:{token}}} = getState();
    const config = {
      headers:{
        Authorization: `Bearer ${token}`,
        'Content-Type' : 'application/json'
      }
    }

    const {data} = await axios.post(
      `http://localhost:5000/api/user/update/${id}`,
      {name, password},
      config
    )

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data
    })

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data
    })
  
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })
  
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    })

    localStorage.setItem('userDetails', JSON.stringify(data))

  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message : error.response
    })
  }
}

export const usersListAction = () => async(dispatch, getState) =>{
  try {
    dispatch({type: USERLIST_REQUEST});

    const {userLoginReducer: {userDetails: {token}}} = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const {data} = await axios.get('http://localhost:5000/api/user/userslist', config);
    dispatch({
      type: USERLIST_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: USERLIST_FAIL,
      payload: error.response && error.response.data.message? 
        error.response.data.message : error.response
    })
  }
}

export const adminEditUserAction = (id) => async(dispatch, getState) =>{
  try {
    dispatch({type: ADMIN_EDIT_USER_REQUEST});

    const {userLoginReducer: {userDetails: {token}}} = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const {data} = await axios.get(`http://localhost:5000/api/user/userslist/${id}`, config);

    dispatch({
      type: ADMIN_EDIT_USER_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: ADMIN_EDIT_USER_FAIL,
      payload: error.response && error.response.data.message? 
        error.response.data.message : error.response
    })
  }
}

export const makeAdminAction = (admin, id) => async(dispatch, getState)=>{

  try {
    dispatch({type: MAKE_ADMIN_REQUEST})

    const {userLoginReducer: {userDetails: {token}}} = getState();
    const config = {
      headers: {
        Authorization : `Bearer ${token}`,
        'Content-Type' : 'application/json'
      }
    }

    const {data} = await axios.put(
      `http://localhost:5000/api/user/userslist/${id}`,
      {admin}, 
      config
    )

    dispatch({
      type: MAKE_ADMIN_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: MAKE_ADMIN_FAIL,
      payload: error.response && error.response.data.message? 
        error.response.data.message : error.response
    })
  }
}

export const deleteUserAction = (id) => async(dispatch, getState) =>{
  try {
    dispatch({type: DELETE_USER_REQUEST});

    const {userLoginReducer: {userDetails: {token}}} = getState();
    const config = {
      headers: {
        Authorization : `Bearer ${token}`
      }
    }

    const {data} = await axios.delete(`http://localhost:5000/api/user/userslist/${id}`, config)

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data
    })

    
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response && error.response.data.message? 
        error.response.data.message : error.response
    })
  }
}