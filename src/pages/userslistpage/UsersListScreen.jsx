import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserAction, usersListAction } from '../../actions/userActions';
import Spinner from '../../components/spinner/Spinner';
import Alert from '../../components/alert/Alert';
import { Link } from 'react-router-dom';

const UsersListScreen = () => {
  const dispatch = useDispatch();

  const usersListReducer = useSelector((state)=>state.usersListReducer);
  const {loading, usersList, error} = usersListReducer;

  const userLoginReducer = useSelector((state)=>state.userLoginReducer);
  const {userDetails} = userLoginReducer;

  const deleteUserReducer = useSelector(state=> state.deleteUserReducer);
  const {success} = deleteUserReducer;

  useEffect(() => {
    if (userDetails && userDetails.isAdmin){
      dispatch(usersListAction())
    }
  }, [dispatch, userDetails, success])


  const datedCreated = (date) => {
    const created = date && date.createdAt && date.createdAt.substring(0, 10).split('-');
    return `${created[2]}-${created[1]}-${created[0]}`
  }

  const datedUpdated = (date) => {
    const updated = date && date.updatedAt && date.updatedAt.substring(0, 10).split('-');
    return `${updated[2]}-${updated[1]}-${updated[0]}`
  }

  const deleteUser = (id) => {
    if (window.confirm('Delete user?')){
      dispatch(deleteUserAction(id));
    }
  }

  return (
    <div className='userslist--container'>
      {loading && <Spinner />}
      {error && <Alert message={error}/> }
      <div className="userslist">
      <h2 className="userslist--heading"><i className="">Users List</i></h2>
        <table className="userslist--table">
          <thead>
            <tr className="">
              <th>USER ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>DATE CREATED</th>
              <th>LAST UPDATE</th>
              <th>ADMIN?</th>
              <th>MAKE ADMIN</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {
              usersList && usersList.map((user)=>(
                <tr key={user && user._id} >
                  <td>{user && user._id}</td>
                  <td>{user && user.name}</td>
                  <td>{user && user.email}</td>
                  <td>{datedCreated(user)}</td>
                  <td>{datedUpdated(user)}</td>
                  <td>
                  {
                    user && user.isAdmin? 
                    <svg className="admin--icon__yes"><use xlinkHref="/img/symbol-defs.svg#icon-check"></use></svg>
                    :
                    <svg className="admin--icon__no"><use xlinkHref="/img/symbol-defs.svg#icon-cross"></use></svg>
                  }
                  </td>
                  <td>
                    <Link to={`/userslist/${user && user._id}`} className='' >
                      <svg className="icon1"><use xlinkHref="/img/symbol-defs.svg#icon-pencil"></use></svg>
                    </Link>
                  </td>
                  <td onClick={()=>deleteUser(user._id)}>
                    <svg className="icon1"><use xlinkHref="/img/symbol-defs.svg#icon-bin"></use></svg>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UsersListScreen