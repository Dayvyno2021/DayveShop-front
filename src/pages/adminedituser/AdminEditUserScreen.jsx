import React, {useEffect} from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useParams, useNavigate} from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner';
import Alert from '../../components/alert/Alert';
import { adminEditUserAction, makeAdminAction } from '../../actions/userActions';
import { ADMIN_EDIT_USER_RESET, MAKE_ADMIN_RESET } from '../../constants/userConstants';


const AdminEditUserScreen = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminEditUserReducer = useSelector((state)=>state.adminEditUserReducer);
  const {loading, user, error} = adminEditUserReducer;

  const makeAdminReducer = useSelector((state)=>state.makeAdminReducer);
  const {loading: loadingMake, error: errorMake, success:successMake} = makeAdminReducer;

  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    if (successMake){
      dispatch({type: MAKE_ADMIN_RESET});
      dispatch({type: ADMIN_EDIT_USER_RESET})
      navigate(`/userslist`)
    } else {
      if (!user || params.id !== user._id){
        dispatch(adminEditUserAction(params.id))
      } else {
        setAdmin(user.isAdmin)
      }
    } 
  }, [dispatch, params, user, successMake, navigate])

  const adminHandler = (event) => {
    event.preventDefault();
    dispatch(makeAdminAction(admin, params.id))
  }


  return (
    <div className='adminsingleuser--container'>
      {(loading || loadingMake) && <Spinner />}
      {(error || errorMake) && <Alert message={error || errorMake} />}
      <div className="singleuser">
        <h2 className="singleuser--heading">Make 
          <span className="singleuser--heading__name">
            <i className=""> {' '} {user && user.name} {' '}</i>
          </span>
          an Admin
        </h2>
        <form onSubmit={adminHandler} className='singleuser--form'>
          <div className="control">
            <input type="checkbox" id='admin' 
              onChange={(e)=>setAdmin(e.target.checked)}
              checked={admin}
            />
            <label htmlFor="admin">Make Admin</label>
          </div>
          <div className="">
            <button type='submit' className='btn1'>Send</button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default AdminEditUserScreen