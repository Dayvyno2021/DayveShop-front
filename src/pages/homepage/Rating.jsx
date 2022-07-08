import React from 'react'

const Rating = ({product}) => {
  return (
    <div className='rating'>
      {
        Number(product.rating) >=1 ? 
        (<svg className="rating--icon"><use xlinkHref="/img/symbol-defs.svg#icon-star"></use></svg>)
        :
        (Number(product.rating) >=0.5 ? 
        (<svg className="rating--icon"><use xlinkHref="/img/symbol-defs.svg#icon-star-half"></use></svg>)
        :
        (<svg className="rating--icon"><use xlinkHref="/img/symbol-defs.svg#icon-star-empty"></use></svg>))
      }

      {
        Number(product.rating) >=2 ? 
        (<svg className="rating--icon"><use xlinkHref="/img/symbol-defs.svg#icon-star"></use></svg>)
        :
        (Number(product.rating) >=1.5 ? 
        (<svg className="rating--icon"><use xlinkHref="/img/symbol-defs.svg#icon-star-half"></use></svg>)
        :
        (<svg className="rating--icon"><use xlinkHref="/img/symbol-defs.svg#icon-star-empty"></use></svg>))
      }

      {
        Number(product.rating) >=3 ? 
        (<svg className="rating--icon"><use xlinkHref="/img/symbol-defs.svg#icon-star"></use></svg>)
        :
        (Number(product.rating) >=2.5 ? 
        (<svg className="rating--icon"><use xlinkHref="/img/symbol-defs.svg#icon-star-half"></use></svg>)
        :
        (<svg className="rating--icon"><use xlinkHref="/img/symbol-defs.svg#icon-star-empty"></use></svg>))
      }

      {
        Number(product.rating) >=4 ? 
        (<svg className="rating--icon"><use xlinkHref="/img/symbol-defs.svg#icon-star"></use></svg>)
        :
        (Number(product.rating) >=3.5 ? 
        (<svg className="rating--icon"><use xlinkHref="/img/symbol-defs.svg#icon-star-half"></use></svg>)
        :
        (<svg className="rating--icon"><use xlinkHref="/img/symbol-defs.svg#icon-star-empty"></use></svg>))
      }

      {
        Number(product.rating) >=5 ? 
        (<svg className="rating--icon"><use xlinkHref="/img/symbol-defs.svg#icon-star"></use></svg>)
        :
        (Number(product.rating) >=4.5 ? 
        (<svg className="rating--icon"><use xlinkHref="/img/symbol-defs.svg#icon-star-half"></use></svg>)
        :
        (<svg className="rating--icon"><use xlinkHref="/img/symbol-defs.svg#icon-star-empty"></use></svg>))
      }
    </div>
  )
}

// Rating.defaultProps = {
//   color: 'red'
// }

export default Rating