import React, { Fragment } from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'

import sliderimg from './static/slider-bg.jpg'
import banner1 from './static/banner-1.jpg'
import banner2 from './static/banner-2.jpg'
import banner3 from './static/banner-3.jpg'
import { Link } from 'react-router-dom'
import NAV from '../components/nav'
import { addProduct } from '../components/redux/cartredux'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './menu.css'


function MENU() {
  const [product, setproduct] = useState([]);
  const quantity = useSelector(state => state.cart.quantity) 
  const dispatch=useDispatch();
  const notify = () => toast.success("Item added to cart!",{autoClose: 1000});
  useEffect(async() => {
    const fetchdata=async()=>{
        const {data}=await axios.get(`/api/product?new=4`)
        setproduct(data)
        }
        fetchdata()
     }, [])
     const productliked = () => toast.success("product liked!",{autoClose: 1000});

      function handleclick(item,title)
      { 
          let products = [];
          notify()
          dispatch(addProduct({item,quantity}))
          if(localStorage.getItem('products')){
              products = JSON.parse(localStorage.getItem('products'));
          }
          if(products.length==0)
               {
                  products.push({'productId' : item._id, 'image' : item.img ,'price':item.price ,'title' :item.title,'quantity':1 });
                  localStorage.setItem('products', JSON.stringify(products));
               }
          else{
            if(products.some((p)=> p.productId === item._id))
             {  
                  let cart=[];
                  if(typeof window!=="undefined")
                  if(localStorage.getItem("products"))
                   {
                     cart=JSON.parse(localStorage.getItem("products"));
                   }
                  cart.map((product,i)=>{
                  if(product.title === title)
                  { 
                   var a=cart[i].quantity;
                   if(a>=5)
                   {
                    cart[i].quantity=5
                   }
                   else{
                    cart[i].quantity=a+1;
                   }
                  }
                  });
                  localStorage.setItem("products",JSON.stringify(cart));
              }
      
             else{
              products.push({'productId' : item._id, 'image' : item.img ,'price':item.price ,'title' :item.title,'quantity':1});
              localStorage.setItem('products', JSON.stringify(products));
               }

          } 

      }
      async function allproduct()
      {
        const {data}=await axios.get("http://localhost:5000/api/product")
        console.log(data)
        localStorage.setItem("allproduct",JSON.stringify(data));
      }
      allproduct()
  
      
  return (
      <Fragment>
         <NAV>
            </NAV>
            <ToastContainer />
          <div>
          <section class="slider_section ">
            <div class="slider_bg_box">
               <img src={sliderimg} alt=""/>
            </div>
            <div id="customCarousel1" class="carousel slide" data-ride="carousel">
               <div class="carousel-inner">
                  <div class="carousel-item active" >
                     <div class="container ">
                        <div class="row">
                           <div class="col-md-7 col-lg-6 ">
                              <div class="detail-box">
                                 <h1>
                                    <span>
                                    Sale 20% Off
                                    </span>
                                    <br/>
                                    On Everything
                                 </h1>
                                 <p>
                                    Explicabo esse amet tempora quibusdam laudantium, laborum eaque magnam fugiat hic? Esse dicta aliquid error repudiandae earum suscipit fugiat molestias, veniam, vel architecto veritatis delectus repellat modi impedit sequi.
                                 </p>
                                 <div class="btn-box">
                                    <a href="/products" class="btn1">
                                    Shop Now
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                 
                  
               </div>
               <div class="container">
                 <h3>
                   
                 </h3>
               </div>
            </div>
         </section>
    <section class="banner spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-7 offset-lg-4">
                    <div class="banner__item">
                        <div class="banner__item__pic">
                            <img src={banner1} alt=""/>
                        </div>
                        <div class="banner__item__text">
                            <h2>Clothing Collections 2022</h2>
                            <a href="/products">Shop now</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="banner__item banner__item--middle">
                        <div class="banner__item__pic">
                            <img src={banner2} alt=""/>
                        </div>
                        <div class="banner__item__text">
                            <h2>Accessories</h2>
                            <a href="/products">Shop now</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-7">
                    <div class="banner__item banner__item--last">
                        <div class="banner__item__pic">
                            <img src={banner3}alt=""/>
                        </div>
                        <div class="banner__item__text">
                            <h2>Shoes Spring 2022</h2>
                            <a href="/products">Shop now</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

       <section>
            <div className="container py-1">
            <div class="heading_container heading_center">
               <h2>
                  Our <span>products</span>
               </h2>
            </div>
             <div class="row mt-5">
          {        
          product.map(item=>(
                 

        <div class="col-md-3">
        <div class="card product-top">
           <img src={item.img} alt="" id="product-img" class="img-fluid"/>
                         <div class="middle">
                         <div class="text"><Link to={`/singleproduct/${item._id}`}><button className='btn product-btn btn1 mb-1'>view product</button></Link></div>
                         <div class="text"> <button onClick={()=>handleclick(item,item.title)} className='btn product-btn btn2 mt-1'>Add to cart</button></div>
                       </div>
           </div>
           <div class="text-center mt-3 mb-5">
               <h3>{item.title}</h3>
               <p><i class="fa fa-inr rupee" aria-hidden="true"></i>{item.price}</p>
           </div>
        </div>
            
         ))
          }
          </div>
           </div>
       </section>
      </div>

      </Fragment>
  )
}

export default MENU
