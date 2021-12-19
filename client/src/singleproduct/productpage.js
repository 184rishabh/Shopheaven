import React,{Fragment, useEffect ,useState} from 'react'
import { useLocation  } from 'react-router';
import axios from 'axios';
import { addProduct } from '../components/redux/cartredux'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'


import './productpage.css'
import { Link } from 'react-router-dom';
import NAV from '../components/nav';

function PRODUCTPAGE() {
    
  const[product,setproduct]= useState([]);
  
  const location=useLocation();
  const id=location.pathname.split("/")[2];
  const quantity = useSelector(state => state.cart.quantity) 
  console.log(quantity)
  const dispatch=useDispatch();

  function addcart(item){

    dispatch(addProduct({item,quantity}))

    let products = [];
    if(localStorage.getItem('products')){
        products = JSON.parse(localStorage.getItem('products'));
    }
    if(products.length==0)
         {
            products.push({'productId' : item._id, 'image' : item.img ,'price':item.price ,'title' :item.title,'quantity':1});
            localStorage.setItem('products', JSON.stringify(products));
         }
    else{
          if(products.some((p)=> p.productId === item._id))
          {
             var a=products.map((p)=>{
             if(p.productId === item._id)
             {
                var x=p.quantity + 1;
                var id=p.productId;
                let storageProducts = JSON.parse(localStorage.getItem('products'));
                let products = storageProducts.filter(product => product.productId !== id );
                localStorage.setItem('products', JSON.stringify(products));
                products.push({'productId' : item._id, 'image' : item.img ,'price':item.price ,'title' :item.title,'quantity':x});
                localStorage.setItem('products', JSON.stringify(products));
                return p.productId;
             }
           })
          }

          else{
                products.push({'productId' : item._id, 'image' : item.img ,'price':item.price ,'title' :item.title,'quantity':1});
                localStorage.setItem('products', JSON.stringify(products));
              }
        }
  }

 
  useEffect(async() => {
    const fetchdata=async()=>{
        const {data}=await axios.get(`/api/product/find/${id}`)
   
        setproduct(data)
        
      }
    fetchdata()
  }, [id])
          
    return (
        <Fragment>
          <NAV>  </NAV>
          <div>
        <section>
        <div class="container">
            <div class="row ">
            
                <div class="col-md-5">
                    <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                          <div class="carousel-item active">
                            <img class="d-block w-100" src={product.img} alt="First slide"/>
                          </div>
                          <div class="carousel-item">
                            <img class="d-block w-100" src={product.img} alt="Second slide"/>
                          </div>
                          <div class="carousel-item">
                            <img class="d-block w-100" src={product.img} alt="Third slide"/>
                          </div>
                        </div>
                      </div>
                </div>
                <div class="col-md-7">
                     <p class="newarrival text-center">New</p>
                     <h2 class="heading">{product.title}</h2>
                     <p>{product.desc}</p>
                     <p class="price">  INR {product.price}</p>
                     <p><b>Availability:</b> In Stock</p>
                     <p><b>Brand:</b> XYZ Company</p>
                     <label>Quantity:</label>
                    <input type="text" value="1"/>
                    <Link to='/cart'>
                     <button onClick={()=>addcart(product)} type="button" class="btn btn-default cart">Add to cart</button>
                     </Link>
                </div>
              </div>
        </div>
    </section>

    <section>
      <div class="container py-5">
        <h1 class="text-center">Related Products</h1>
        <div class="row py-5">
            <div class="col-lg-3">
              <div class="card">
                <img src={product.img} class="fluid"/>
                
            </div>   
        </div>
            <div class="col-lg-3">
              <div class="card">
                <img src={product.img} class="fluid"/>
               
            </div> 
            </div>
            <div class="col-lg-3">
              <div class="card">
                <img src={product.img} class="fluid"/>
                
            </div> 
            </div>
            <div class="col-lg-3">
              <div class="card">
                <img src={product.img} class="fluid"/>
            </div> 
            </div>
        </div>
      </div>
  </section>
        </div>
        
        </Fragment>
    )
}

export default PRODUCTPAGE
