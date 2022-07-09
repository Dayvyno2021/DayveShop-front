import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {editProductAction, productDetailsAction } from '../../actions/productActions';
import Spinner from '../../components/spinner/Spinner';
import Alert from '../../components/alert/Alert';
import { useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';

const EditProductScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const editProductReducer = useSelector((state)=>state.editProductReducer);
  const {loading, product, error} = editProductReducer;

  const productDetailsReducer = useSelector(state=>state.productDetailsReducer);
  const {loading:loadingPro, product:pro, error:errorPro} = productDetailsReducer;

  const [description, setDescription] = useState('');
  const [image, setImage] = useState('')
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [stockCount, setStockCount] = useState(0);

  const handleImage = (e) =>{
    const file = e.target.files[0];
    setImage(file);
  }

  const editHotel = (event) =>{
    event.preventDefault();
    const details = new FormData();
    details.append('description', description)
    details.append('image', image);
    details.append('price', price);
    details.append('name', name);
    details.append('brand', brand);
    details.append('stockCount', stockCount);
    details.append('category', category);

    dispatch(editProductAction(details, params.id))
  }

  useEffect(() => {
    if (product){
      alert('changes successfully made')
      window.location.reload();
    } else{
      if (!pro.name || (pro._id !== params.id)){
        dispatch(productDetailsAction(params.id))
      } else{
        setDescription(pro.description);
        setName(pro.name);
        setPrice(pro.price);
        setBrand(pro.brand);
        setCategory(pro.category);
        setStockCount(pro.countInStock);
        setImage(pro.image);
      }
    }
  }, [dispatch, navigate, product, pro, params])
  return (
    <div className='createproduct--container'>
      {(loading || loadingPro) && <Spinner/>}
      {(error || errorPro) && <Alert message={error}/>}
      <div className="createproduct">
        <h2 className="createproduct--header"><i>Create Product</i></h2>
        <div className="createproduct--image">
          <img src={pro && pro.img? `https://dayve-store.herokuapp.com/api/products/get/${pro._id}`: pro.image} alt="" />
        </div>
        <form className='createproduct--form' onSubmit={editHotel}>
          <div className="createproduct--form__control">
            <label htmlFor="product-name " className="bold7">Product name: </label>
            <input type="text" className="createproduct--form__input" 
              placeholder={'enter product name'} name='name' id='product-name'
              autoComplete='true' value={name} onChange={(e)=>setName(e.target.value)}
            />
          </div>
          <div className="createproduct--form__control">
            <label htmlFor="product-price " className="bold7">Price(&#8358;): </label>
            <input type="number" className="createproduct--form__input" 
              placeholder={'enter price'} name='price' id='product-price'
              autoComplete='true' value={price}
              onChange = {(e)=>setPrice(e.target.value)}
            />
          </div>
          <div className="createproduct--form__control">
            <label htmlFor="product-brand" className="bold7">Brand: </label>
            <input type="text" className="createproduct--form__input" 
              placeholder={'enter brand name'} name='brand' id='product-brand'
              autoComplete='true' value={brand}
              onChange = {(e)=>setBrand(e.target.value)}
            />
          </div>
          <div className="createproduct--form__control">
            <label htmlFor="product-image" className="bold7">Image: </label>
            <input type="file" className="createproduct--form__input" 
              id='product-image' accept="image/*"
              onChange = {handleImage}
            />
          </div>
          <div className="createproduct--form__control">
            <label htmlFor="stock-count" className="bold7">Count-in-Stock: </label>
            <input type="number" className="createproduct--form__input" 
              placeholder={'enter stock count'} name='stockCount' id='stock-count'
              autoComplete='true' value = {stockCount}
              onChange={(e)=>setStockCount(e.target.value)}
            />
          </div>
          <div className="createproduct--form__control">
            <label htmlFor="category" className="bold7">Category: </label>
            <input type="text" className="createproduct--form__input" 
              placeholder={'category'} name='category' id='category'
              autoComplete='true' value={category}
              onChange={(e)=>setCategory(e.target.value)}
            />
          </div>
          <div className="createproduct--form__control">
            <label htmlFor="description" className="bold7">Descriptiom: </label>
            <textarea  className="createproduct--form__input" 
              placeholder={'Description....'} name='description' id='description'
              autoComplete='true' value={description}
              onChange={(e)=>setDescription(e.target.value)}
            />
          </div>
          <button className="btn1" type='submit'>Submit</button>
      </form>
      </div>
    </div>
  )
}

export default EditProductScreen