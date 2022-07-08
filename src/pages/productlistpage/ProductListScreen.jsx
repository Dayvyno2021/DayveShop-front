import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Spinner from '../../components/spinner/Spinner';
import Alert from '../../components/alert/Alert';
import { adminDelProductAction, productListAction } from '../../actions/productActions';
import {Link} from 'react-router-dom';

function ProductListScreen() {
  const dispatch = useDispatch();

  const productListReducer = useSelector((state)=>state.productListReducer);
  const {loading, products, error} = productListReducer;

  const userLoginReducer = useSelector(state=>state.userLoginReducer)
  const {userDetails} = userLoginReducer;

  const adminDelProductReducer = useSelector((state)=>state.adminDelProductReducer);
  const {loading: loadingDel, success: successDel, error: errorDel} = adminDelProductReducer

  useEffect(() => {
    if (userDetails && userDetails.isAdmin){
      dispatch(productListAction())
    }
  }, [dispatch, userDetails, successDel])

  const deleteProduct = (id) =>{
    dispatch(adminDelProductAction(id))
  }
  
  
  return (
    <div className='productslist--container'>
      {(loading || loadingDel) && <Spinner />}
      {(error || errorDel) && <Alert message={error}/>}
      <div className="productslist">
        <div className="productslist--section1">
          <h2 className="productslist--header"><i className="">All Products</i></h2>
          <Link to={`/product/new-product`}>
            <button className="btn1"> + product </button>
          </Link>

        </div>

        <table className="productslist--section2">
        <thead>
            <tr className="">
              <th>PRODUCT ID</th>
              <th>NAME</th>
              <th>BRAND</th>
              <th>CATEGORY</th>
              <th>PRICE (&#8358;)</th>
              <th>EDIT</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {
              products && products.map((product)=>(
                <tr key={product && product._id} >
                  <td>{product && product._id}</td>
                  <td>{product && product.brand}</td>
                  <td>{product && product.category}</td>
                  <td>{product &&product.name}</td>
                  <td>{product && product.price.toLocaleString()}</td>
                  <td>
                    <Link to={`/product/edit/${product._id}`} className='' >
                      <svg className="icon1"><use xlinkHref="/img/symbol-defs.svg#icon-pencil"></use></svg>
                    </Link>
                  </td>
                  <td onClick={() => deleteProduct(product._id)}>
                    <svg className="icon1"><use xlinkHref="/img/symbol-defs.svg#icon-bin"></use></svg>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        {/* <div>{JSON.stringify(products[0], null, 4)} </div> */}

      </div>
    </div>
  )
}

export default ProductListScreen