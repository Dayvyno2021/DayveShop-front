import {useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productListAction } from '../../actions/productActions';
import Product from './Product';
import Spinner from '../../components/spinner/Spinner';
import Alert from '../../components/alert/Alert';
import queryString from 'query-string';
import { useLocation, useParams } from 'react-router-dom';
import Pagination from '../../components/pagination/Pagination';
import ProductCarousel from '../../components/carousel/ProductCarousel';

const HomePageScreen = () => {

  const dispatch  = useDispatch();
  const location = useLocation();
  const params = useParams();
  const parsed = queryString.parse(location.search);
  const {filter} = parsed

  const productListReducer  = useSelector((state)=>state.productListReducer);
  const {loading, products, error, pages} = productListReducer;

  useEffect(() => {
    dispatch(productListAction(filter, params.id));
  }, [dispatch, filter, params.id])

  return (
    <div className='homepage'>
      <ProductCarousel />
      {loading && <Spinner />}
      {error && <Alert message={error} />} 
      <h1 className="homepage--heading">Latest Products</h1>
      <div className="homepage--products">
        {
          products && products.map((product)=>(
            <Product product={product} key={product._id} />
          ))
        }
      </div>
      <Pagination pages={pages} />
    </div>
  )
}

export default HomePageScreen