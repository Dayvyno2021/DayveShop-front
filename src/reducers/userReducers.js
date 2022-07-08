import { 
  ADMIN_EDIT_USER_FAIL,
  ADMIN_EDIT_USER_REQUEST,
  ADMIN_EDIT_USER_RESET,
  ADMIN_EDIT_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  MAKE_ADMIN_FAIL,
  MAKE_ADMIN_REQUEST,
  MAKE_ADMIN_RESET,
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
  USER_REGISTER_REQUEST, 
  USER_REGISTER_SUCCESS, 
  USER_UPDATE_FAIL, 
  USER_UPDATE_REQUEST, 
  USER_UPDATE_SUCCESS 
} 
from "../constants/userConstants";

const userFrmStorage = localStorage.getItem('userDetails') ? 
  JSON.parse(localStorage.getItem('userDetails')) : null;

export const userRegisterReducer = (state={userDetails:userFrmStorage}, action) =>{
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return {loading: true};

      case USER_REGISTER_SUCCESS:
        return {loading: false, userDetails: action.payload};

      case USER_REGISTER_FAIL:
        return {loading: false, error: action.payload}

      case USER_LOGOUT:
        return {}
    
      default:
        return state;
    }

}

export const userLoginReducer = (state={userDetails: userFrmStorage}, action) =>{
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {loading: true};

    case USER_LOGIN_SUCCESS:
      return {loading: false, userDetails: action.payload}

    case USER_LOGIN_FAIL:
      return {loading: false, error: action.payload}

    case USER_LOGOUT:
      return {}
  
    default:
      return state;
  }
}


export const userProfileReducer = (state={userDetails:userFrmStorage}, action) =>{
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return {loading: true}

    case USER_PROFILE_SUCCESS:
      return {loading: false, userDetails:action.payload}
    
    case USER_PROFILE_FAIL:
      return {loading: false, error: action.payload}
    
    case USER_LOGOUT:
      return {}
  
    default:
      return state;
  }
}

export const userUpdateReducer = (state={}, action) =>{
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return {loading: true};
    
      case USER_UPDATE_SUCCESS:
        return {loading: false, success: true}

      case USER_UPDATE_FAIL:
        return {loading: false, error: action.payload}
  
    default:
      return state;
  }
}

export const usersListReducer = (state= {usersList: []}, action) =>{
  switch (action.type) {
    case USERLIST_REQUEST:

      return {...state, loading: true};
    case USERLIST_SUCCESS:
      return {loading: false, usersList: action.payload, success: true};

    case USERLIST_FAIL:
      return {loading: false, error: action.payload}
      
    default:
      return state;
  }
}

export const adminEditUserReducer = (state={user:{}}, action) =>{
  switch (action.type) {
    case ADMIN_EDIT_USER_REQUEST:
      return {...state, loading: true};

    case ADMIN_EDIT_USER_SUCCESS:
      return {loading: false, user:action.payload, success:true};

    case ADMIN_EDIT_USER_FAIL:
      return {loading: false, error: action.payload}

    case ADMIN_EDIT_USER_RESET:
      return {};
  
    default:
      return state;
  }
}

export const makeAdminReducer = (state={}, action) =>{
  switch (action.type) {
    case MAKE_ADMIN_REQUEST:
      return {loading: true};

    case MAKE_ADMIN_SUCCESS:
      return {loading: false, info: action.payload, success: true}

    case MAKE_ADMIN_FAIL:
      return {loading: false, error: action.payload}
    
    case MAKE_ADMIN_RESET: 
      return {}
  
    default:
      return state;
  }
}

export const deleteUserReducer = (state={}, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return {loading: true};

    case DELETE_USER_SUCCESS:
      return {loading: false, success: true};

    case DELETE_USER_FAIL:
      return {loading: false, error: action.payload}
  
    default:
      return state;
  }
}