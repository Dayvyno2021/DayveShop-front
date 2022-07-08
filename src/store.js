import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './reducers/cartReducers';

import { 
  adminOrderlistReducer,
  deliveryStatusReducer,
  myOrderDeleteReducer, 
  myOrdersReducers, 
  orderDetailsReducer, 
  orderPaidreducer, 
  placeOrderReducer 
} from './reducers/orderReducers';

import { 
  addReviewReducer,
  adminDelProductReducer, 
  createProductReducer, editProductReducer, 
  highRatedReducer, 
  productDetailsReducer, productListReducer 
} from './reducers/productReducers';

import { 
  adminEditUserReducer, 
  deleteUserReducer, 
  makeAdminReducer, 
  userLoginReducer, 
  userProfileReducer, 
  userRegisterReducer, 
  usersListReducer, 
  userUpdateReducer
 } from './reducers/userReducers';


const store = configureStore ({
  reducer: {
    productListReducer: productListReducer,
    productDetailsReducer: productDetailsReducer,
    cartReducer: cartReducer,
    userRegisterReducer: userRegisterReducer,
    userLoginReducer: userLoginReducer,
    userProfileReducer: userProfileReducer,
    userUpdateReducer: userUpdateReducer,
    placeOrderReducer: placeOrderReducer,
    orderDetailsReducer: orderDetailsReducer,
    orderPaidreducer: orderPaidreducer,
    myOrdersReducers: myOrdersReducers,
    myOrderDeleteReducer: myOrderDeleteReducer,
    usersListReducer: usersListReducer,
    adminEditUserReducer: adminEditUserReducer,
    makeAdminReducer: makeAdminReducer,
    deleteUserReducer: deleteUserReducer,
    createProductReducer: createProductReducer,
    editProductReducer: editProductReducer,
    adminDelProductReducer: adminDelProductReducer,
    adminOrderlistReducer: adminOrderlistReducer,
    deliveryStatusReducer: deliveryStatusReducer,
    addReviewReducer: addReviewReducer,
    highRatedReducer: highRatedReducer
  },
})

export default store;