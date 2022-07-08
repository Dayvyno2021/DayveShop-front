import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProductAction } from '../../actions/productActions';
import Spinner from '../../components/spinner/Spinner';
import Alert from '../../components/alert/Alert';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { CREATE_PRODUCT_RESET } from '../../constants/productConstants';

const CreateProductScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createProductReducer = useSelector((state)=>state.createProductReducer);
  const {loading, product, error} = createProductReducer;

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

  const createHotel = (event) =>{
    event.preventDefault();
    const details = new FormData();
    details.append('description', description)
    details.append('image', image);
    details.append('price', price);
    details.append('name', name);
    details.append('brand', brand);
    details.append('stockCount', stockCount);
    details.append('category', category);

    if (!description || !price || !name || !brand || !stockCount || !category){
      alert("All fields must be completed")
    } else{
      dispatch(createProductAction(details))
    }
  }

  useEffect(() => {
    if (product==='success'){
      dispatch({type: CREATE_PRODUCT_RESET})
      navigate('/')
    }
  }, [dispatch, navigate, product])
  

  return (
    <div className='createproduct--container'>
      {loading && <Spinner/>}
      {error && <Alert message={error}/>}
      <div className="createproduct">
        <h2 className="createproduct--header"><i>Create Product</i></h2>
        <form className='createproduct--form' onSubmit={createHotel}>
          <div className="createproduct--form__control">
            <label htmlFor="product-name " className="bold7">Product name: </label>
            <input type="text" className="createproduct--form__input" 
              placeholder={'enter product name'} name='name' id='product-name'
              autoComplete='true' value={name} onChange={(e)=>setName(e.target.value)}
            />
          </div>
          <div className="createproduct--form__control">
            <label htmlFor="product-price " className="bold7">Price: </label>
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
          <button className="btn1" type='submit'>Add Hotel</button>
      </form>
      </div>
    </div>
  )
}

export default CreateProductScreen