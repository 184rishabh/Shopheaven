import React, { Fragment } from 'react'
import NAV from './nav'

function NOTFOUND() {
    return (
       <Fragment>
           <NAV></NAV>
          <div className='container mt-5 mb-5'>
              <div className='row justify-content-evenly text-center mt-5 mb-5'>
                 <div className='col-md-12 mt-5 mb-5'>
                   <h1 className='mt-5 mb-5'>
                       Page not Found
                   </h1>
                 </div>
                 <div className='col-md-12 mb-5'>
                    <a href='/'>
                    <button className='btn btn-danger mx-5 mt-3'>
                            Go to home
                    </button>
                    </a>
                   <a href='/products'>
                   <button className='btn btn-danger mx-5 mt-3'>
                     Go to Products
                    </button>
                   </a>
                   <a href='/cart'>
                   <button className='btn btn-danger mx-5 mt-3'>
                    Go to Cart
                    </button>
                   </a>
                 </div>
              </div>
         </div> 
       </Fragment>
    )
}

export default NOTFOUND
