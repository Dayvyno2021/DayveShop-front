import { ADD_REVIEW_FAIL, ADD_REVIEW_REQUEST, ADD_REVIEW_RESET, ADD_REVIEW_SUCCESS, ADMIN_DEL_PRO_FAIL, ADMIN_DEL_PRO_REQUEST, ADMIN_DEL_PRO_SUCCESS, CREATE_PRODUCT_FAIL, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_RESET, 
  CREATE_PRODUCT_SUCCESS, EDIT_PRODUCT_FAIL, EDIT_PRODUCT_REQUEST, 
  EDIT_PRODUCT_RESET, EDIT_PRODUCT_SUCCESS, HIGH_RATED_FAIL, HIGH_RATED_REQUEST, HIGH_RATED_SUCCESS, PRODUCT_DETAILS_FAIL, 
  PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, 
  PRODUCT_LIST_REQUEST, PRODUCT_LIST_RESET, PRODUCT_LIST_SUCCESS 
} from "../constants/productConstants";

export const productListReducer = (state={products:[]}, action) =>{
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {loading: true, ...state}

    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false, 
        products:action.payload.allProducts, 
        pages:action.payload.pages
       }

    case PRODUCT_LIST_FAIL:
      return {loading: false, error: action.payload}
  
    case PRODUCT_LIST_RESET:
      return {}
  
    default:
      return state;
  }
}

export const productDetailsReducer = (state={product:{reviews:[]}}, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {loading: true, ...state}

    case PRODUCT_DETAILS_SUCCESS:
      return {loading: false, product:action.payload}

    case PRODUCT_DETAILS_FAIL: 
      return {loading: false, error: action.payload}
  
    default:
      return state;
  }
}

export const createProductReducer = (state={}, action)=>{
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return {loading: true};

    case CREATE_PRODUCT_SUCCESS:
      return {loading: false, product: action.payload, success: true};

    case CREATE_PRODUCT_FAIL:
      return {loading: false, error: action.payload};

    case CREATE_PRODUCT_RESET:
      return {};
  
    default:
      return state;
  }
}

export const editProductReducer = (state={}, action)=>{
  switch (action.type) {
    case EDIT_PRODUCT_REQUEST:
      return {loading: true};

    case EDIT_PRODUCT_SUCCESS:
      return {loading: false, product: action.payload, success: true};

    case EDIT_PRODUCT_FAIL:
      return {loading: false, error: action.payload};

    case EDIT_PRODUCT_RESET:
      return {};
  
    default:
      return state;
  }
}

export const adminDelProductReducer = (state={}, action)=>{
  switch (action.type) {
    case ADMIN_DEL_PRO_REQUEST:
      return {loading: true};
    
    case ADMIN_DEL_PRO_SUCCESS:
      return {loading: false, deleted: action.payload, success: true};

    case ADMIN_DEL_PRO_FAIL:
      return {loading: false, error: action.payload};
      
    default:
      return state;
  }
}

export const addReviewReducer = (state={}, action) =>{
  switch (action.type) {
    case ADD_REVIEW_REQUEST:
      return {loading: true};

    case ADD_REVIEW_SUCCESS:
      return {loading: false, status: action.payload, success: true}

    case ADD_REVIEW_FAIL:
      return {loading: false, error: action.payload}

    case ADD_REVIEW_RESET:
      return {};
  
    default:
      return state;
  }
}

export const highRatedReducer = (state={ratedProducts:[]}, action)=>{
  switch (action.type) {
    case HIGH_RATED_REQUEST:
      return {loading: true};

    case HIGH_RATED_SUCCESS:
      return {loading:false, ratedProducts: action.payload, success:true};

    case HIGH_RATED_FAIL: 
      return {loading: false, error: action.payload}
  
    default:
      return state;
  }
}