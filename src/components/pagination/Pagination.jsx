import React from 'react'
import { Link } from 'react-router-dom';

const Pagination = ({pages}) => {


  return (
    <div className='pagination'>
      <div className="pagination--container">
          {
            [...Array(pages).keys()].map((x)=>(
              <Link to={`/page/${x+1}`} key={x+1}  >
                <button className={`pagination--button`} >
                  {x+1} 
                </button>
              </Link>
            ))
          }
      </div>
    </div>
  )
}

export default Pagination