import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { adminOrderlistAction } from '../../actions/orderActions';
import Spinner from '../../components/spinner/Spinner';
import Alert from '../../components/alert/Alert';
import { Link } from 'react-router-dom';


const OrderListScreen = () => {
  const dispatch = useDispatch();

  const adminOrderlistReducer = useSelector(state=>state.adminOrderlistReducer);
  const {loading, orderlist, error} = adminOrderlistReducer

  const userLoginReducer = useSelector(state=>state.userLoginReducer);
  const {userDetails} = userLoginReducer;

  useEffect(() => {
    if (userDetails && userDetails.isAdmin){
      dispatch(adminOrderlistAction())
    }
    
  }, [dispatch, userDetails])

  const datedCreated = (date) => {
    const created = date && date.createdAt && date.createdAt.substring(0, 10).split('-');
    return `${created[2]}-${created[1]}-${created[0]}`
  }
  
  const dateFormat = (info) =>{
    const date =info && info.substr(0, 10).split('-');
    const yy = date[0];
    const mm = date[1];
    const dd = date[2]
    return `${dd}-${mm}-${yy}`
  }


  return (
    <div className='orderlist--container'>
      {loading && <Spinner/>}
      {error && <Alert message={error}/>}
      <div className="orderlist">
        <table>
          <thead>
            <tr className="">
              <th className="">S/N</th>
              <th className="">ORDER ID</th>
              <th className="">ORDERED BY (name)</th>
              <th className="">ORDERED BY (id)</th>
              <th className=""> ORDER DATE</th>
              <th className="">TOTAL (&#8358;)</th>
              <th className="">PAID?</th>
              <th className="">DELIVERED</th>
              <th className="">DETAILS</th>
            </tr>
          </thead>
          <tbody>
          {
            orderlist && orderlist.map((order, index)=>(
              <tr className="" key={order._id}>
                <td>{index+1}</td>
                <td>{order._id}</td>
                <td>{order && order.user && order.user.name}</td>
                <td>{order && order.user && order.user._id}</td>
                <td>{order && datedCreated(order)}</td>
                <td>{order && order.totalPrice && order.totalPrice.toLocaleString()}</td>
                <td >
                  {
                    order && order.isPaid? 
                    (<p>
                      <svg className="icon-green"><use xlinkHref="/img/symbol-defs.svg#icon-checkbox-checked"></use></svg>
                      {order && order.paidAt && dateFormat(order.paidAt)}
                    </p>
                    )
                    :
                    (<svg className="icon-red"><use xlinkHref="/img/symbol-defs.svg#icon-cross"></use></svg>)
                  }
                </td>
                <td >
                  {
                    order && order.isDelivered? 
                    (<p>
                      <svg className="icon-green"><use xlinkHref="/img/symbol-defs.svg#icon-checkbox-checked"></use></svg>
                      {order && order.deliveredAt && dateFormat(order.deliveredAt)}
                    </p>
                    )
                    :
                    (<svg className="icon-red"><use xlinkHref="/img/symbol-defs.svg#icon-cross"></use></svg>)
                  }
                </td>
                <td>
                  <Link to={`/order/${order && order._id}`} className='' >
                    <svg className="icon1"><use xlinkHref="/img/symbol-defs.svg#icon-pencil"></use></svg>
                  </Link>
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

export default OrderListScreen