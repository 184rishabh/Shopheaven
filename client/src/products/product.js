import React, { Fragment }  from 'react'
import './products.css'
import axios from 'axios'

import { useEffect, useState } from 'react'

import {Link, Redirect} from 'react-router-dom'
import { addProduct } from '../components/redux/cartredux'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import NAV from '../components/nav'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function PRODUCT() {
   const [product, setproduct] = useState([]);
   const [category, setcategory] = useState("");

   const quantity = useSelector(state => state.cart.quantity) 
   const dispatch=useDispatch();

   const notify = () => toast.success("Item added to cart!",{autoClose: 1000});
   const productliked = () => toast.success("product liked!",{autoClose: 1000});

   function addcart(item,title){
    notify()
    dispatch(addProduct({item,quantity}))
    let products = [];
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
             cart[i].quantity=a+1;
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

   useEffect(async() => {
       const fetchdata=async()=>{
           if(category=="")
           {
           const data = JSON.parse(localStorage.getItem('allproduct'));
           setproduct(data)
           }
           else
           {
            const {data}=await axios.get(`/api/product?category=${category}`)
            setproduct(data)
           }
       }
       fetchdata()
   }, [category])

     const handler=(e)=>{
     console.log(e.target.value);
     setcategory(e.target.value);
    
        }
    
    return (
        <Fragment>
            <NAV>
            </NAV>
           
            <div>
            <section class="inner_page_head">
         <div class="container_fuild">
            <div class="row">
               <div class="col-md-12">
                  <div class="full">
                     <h3>All Products</h3>
                  </div>
               </div>
            </div>
         </div>
      </section>
        <div class="container category-container">
        <div class="d-flex justify-content-between">
            <div>
               <h2 class="text-center category-heading">
                   New Arrivals
               </h2>
            </div>
             <div> 
             <select className="category-features" onChange={e=>{handler(e)}}>
             <option value="">
             all
             </option>
              <option value="Men">
              Mens
              </option>
              <option value="Women">
               Women
              </option>
              <option value="Kids">
              Kids
             </option>
             </select>
             </div>
        </div>
        <div class="row mt-5">
        {        
        product.map(item=>(

        <div class="col-md-3">
        <div class="card product-top">
           <img src={item.img} alt="" id="product-img" class="img-fluid"/>
                         <div class="middle">
                         <div class="text"><Link to={`/singleproduct/${item._id}`}><button className='btn product-btn btn1 mb-1'>view product</button></Link></div>
                         <div class="text"> <button onClick={()=>addcart(item,item.title)} className='btn product-btn btn2 mt-1'>Add to cart</button></div>
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
        <ToastContainer />
        </div>
     
        </Fragment>
    )
}

export default PRODUCT
