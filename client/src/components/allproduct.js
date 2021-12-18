import React from 'react'
import product1 from '../components/static/product-1.jpg'
import product2 from '../components/static/product-2.jpg'
import product3 from '../components/static/product-3.jpg'
import product4 from '../components/static/product-4.jpg'
function allproduct(state) {
    return (
        <div>
        <div class="container category-container">
         <div class="row mt-5">
             <div class="col-md-3">
                <div class="card product-top">
                    <img src={product1} alt="" class="img-fluid"/>
                    <div class="overlay">
                        <button type="button" class="btn btn-secondary" title="quick shop">
                            <i class=" category-icon fa-solid fa-eye"></i>
                             
                        </button>
                        <button type="button" class="btn btn-secondary" title="Add shop">
                            <i class=" category-icon fa-solid fa-heart"></i>
                        </button>
                        <button type="button" class="btn btn-secondary" title="Add to cart">
                            <i class="category-icon fa-solid fa-cart-shopping"></i>
                        </button>
                    </div>
                </div>
                <div class="text-center">
                    <h3>{state.title}</h3>
                    <p><i class="fa fa-inr rupee" aria-hidden="true"></i>500</p>
                </div>
             </div>


             <div class="col-md-3">
                <div class="card product-top">
                    <img src={product2} alt="" class="img-fluid"/>
                    <div class="overlay">
                        <button type="button" class="btn btn-secondary" title="quick shop">
                            <i class="category-icon fa-solid fa-eye"></i>
                             
                        </button>
                        <button type="button" class="btn btn-secondary" title="Add shop">
                            <i class="category-icon fa-solid fa-heart"></i>
                        </button>
                        <button type="button" class="btn btn-secondary" title="Add to cart">
                            <i class="category-icon fa-solid fa-cart-shopping"></i>
                        </button>
                    </div>
                </div>
                <div class="text-center">
                    <h3>DRESS</h3>
                    <p><i class="fa fa-inr rupee" aria-hidden="true"></i>500</p>
                </div>
             </div>





             <div class="col-md-3">
                <div class="card product-top">
                    <img src={product3} alt="" class="img-fluid"/>
                    <div class="overlay">
                        <button type="button" class="btn btn-secondary" title="quick shop">
                            <i class="category-icon fa-solid fa-eye"></i>
                             
                        </button>
                        <button type="button" class="btn btn-secondary" title="Add shop">
                            <i class="category-icon fa-solid fa-heart"></i>
                        </button>
                        <button type="button" class="btn btn-secondary" title="Add to cart">
                            <i class="category-icon fa-solid fa-cart-shopping"></i>
                        </button>
                    </div>
                </div>
                <div class="text-center">
                    <h3>DRESS</h3>
                    <p><i class="fa fa-inr rupee" aria-hidden="true"></i>500</p>
             </div>
             </div>

             <div class="col-md-3">
                <div class="card product-top">
                    <img src={product4} alt="" class="img-fluid"/>
                    <div class="overlay">
                        <button type="button" class="btn btn-secondary" title="quick shop">
                            <i class="category-icon fa-solid fa-eye"></i>
                             
                        </button>
                        <button type="button" class="btn btn-secondary" title="Add shop">
                            <i class="category-icon fa-solid fa-heart"></i>
                        </button>
                        <button type="button" class="btn btn-secondary" title="Add to cart">
                            <i class="category-icon fa-solid fa-cart-shopping"></i>
                        </button>
                    </div>
                </div>
                <div class="text-center">
                    <h3>DRESS</h3>
                    <p><i class="fa fa-inr rupee" aria-hidden="true"></i>500</p>
                </div>
             </div>

         </div>
        </div>
        </div>
    )
}

export default allproduct
