import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { highRatedAction } from '../../actions/productActions';
import Spinner from  '../../components/spinner/Spinner';
import Alert from '../../components/alert/Alert';
import { Link } from 'react-router-dom';

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const highRatedReducer = useSelector((state)=>state.highRatedReducer);
  const {loading, ratedProducts, error} = highRatedReducer;

  let slideIndex = 0;

  function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 3000); // Change image every 2 seconds
  }

  useEffect(()=>{
    if (ratedProducts && ratedProducts.length>0){
      showSlides()
    } else{
      dispatch(highRatedAction())
    }
  // eslint-disable-next-line
  },[dispatch, ratedProducts])

  return (
    <div className='carousel--container'>
      {loading && <Spinner/>}
      {error && <Alert message={error}/>}
      <h2 className="carousel--left"><i className="">Discount Sales</i> </h2>
      <div className='slideshow--container'>
          {ratedProducts && ratedProducts.map((item, i)=>(
        <div className="mySlides fades" key={i}>
          <div className="numbertext">{i}/{item && ratedProducts.length} </div>
          <Link to={`/product/${item._id}`}>
            <img src={item && item.image? item.image : `https://dayve-store.herokuapp.com/api/products/get/${item._id}`} alt="" className='carousel--image' />
          </Link>
          <Link to={`/product/${item._id}`} className='rm-deco'>
            <div className="text bold7">{item.name} </div>
          </Link>
        </div>
          ))}
        <button className="prev" >&#10094;</button>
        <button className="next" >&#10095;</button>

        <div className='dot--container'>
          { ratedProducts && ratedProducts.length && 
          [...Array(ratedProducts.length).keys()].map((i)=>(
            <span className="dot" key={i}></span>
          ))}
        </div>
      </div>
      <h2 className="carousel--right"><i className="">Discount Sales</i> </h2>
    </div>
  )
}

export default ProductCarousel