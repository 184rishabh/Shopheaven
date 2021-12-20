import React, { Fragment } from 'react'
import './cart.css'
import {useState} from 'react'
import { useEffect } from 'react'
import NAV from '../components/nav'
import axios from 'axios'
import { isauthenticated } from '../auth/authenticate'
import FOOTER from '../components/footer'

function CART() {
    
    const iconstyle={
        fontSize:"20px",
        margin:"5px",

    }
    const [cartproduct, setcartproduct] = useState([]);
    const [cartnos, setcartnos] = useState(false)
    const [success,setsuccess]=useState(false)
    const [address, setaddress] = useState(false)
   
   
    useEffect(() => {
        setcartnos(false)
               const fetchdata=async()=>{
                let cart=[]
                if(localStorage.getItem('products')){
                cart = JSON.parse(localStorage.getItem('products'));
                  }
                setcartproduct(cart);}
            fetchdata()
            },[cartnos])
    
    function plusquantity(id){
        let carts=[];
        if(typeof window!=="undefined")
           if(localStorage.getItem("products"))
           {
               carts=JSON.parse(localStorage.getItem("products"));
           }
           console.log(carts)
           carts.map((product,i)=>{
               if(product.productId === id)
               {
                if(carts[i].quantity >= 5)
                {
                    carts[i].quantity=5;
                }
                else{
                    carts[i].quantity+=1;
                }
                setcartnos(true);
               }
           });
          localStorage.setItem("products",JSON.stringify(carts));

    }
    const removeItem = productId => {
     let cart = [];
     console.log("in")
     if (typeof window !== 'undefined') {
         if (localStorage.getItem('products')) {
             cart = JSON.parse(localStorage.getItem('products'));
         }
 
         cart.map((product, i) => {
             if (product.productId === productId) {
                 cart.splice(i, 1);
                 console.log(product)
             }
         });
 
         localStorage.setItem('products', JSON.stringify(cart));
     }
     setcartnos(true);
     return cart;
 };

 const emptyCart = () => {
     if (typeof window !== 'undefined') {
 
         localStorage.removeItem('products');
         setcartnos(true)
     }
 };


    function minusquantity(id){
        let carts=[];
       
        if(typeof window!=="undefined")
           if(localStorage.getItem("products"))
           {
               carts=JSON.parse(localStorage.getItem("products"));
           }
           console.log(carts)
           carts.map((product,i)=>{
               if(product.productId === id)
               {
                    if(carts[i].quantity == 1)
                    {
                        carts[i].quantity=1;
                    }
                    else{
                        carts[i].quantity-=1;
                    }
                    setcartnos(true);
               }
           });
          localStorage.setItem("products",JSON.stringify(carts));

    }
 
    function totalquantity(id){
     let carts=[];
     var total=0;
     if(typeof window!=="undefined")
        if(localStorage.getItem("products"))
        {
            carts=JSON.parse(localStorage.getItem("products"));
        }
        carts.map((product,i)=>{
            total+=carts[i].quantity*carts[i].price
        });
       return total
 }
 function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}
var userid="";
var add="";
 if(isauthenticated())
 {
     userid=isauthenticated().user._id;
     add=isauthenticated().user.address;
 }
 const totalamount=totalquantity()
 console.log("userid")
 console.log(userid)
 console.log(totalamount)
 console.log(add)
 const product=JSON.parse(localStorage.getItem("products")) 
 console.log(product)





async function displayRazorpay() {
    
    console.log(isauthenticated())
    
    if(isauthenticated()&&isauthenticated().user.address)
    {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if (!res) {
        alert('Razorpay SDK failed to load. Are you online?')
        return
    }

    
    const data = await axios.post('/api/order/razorpay', {
        amount:totalquantity()
      });
    


    const options = {
        key: 'rzp_test_vBmwkeZA0bm004',
        currency: 'INR',
        amount: data.data.amount,
        order_id: data.data.id,
        name: 'E-shop',
        description: 'Thanks for shopping with us',
        image: '',
        handler: async function (response) {
            const result = await axios.post('/api/order/pay-order', {
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              userid:userid,
              products:product,
              amount:totalamount,
              address:add
              
            });
            alert(result.data.msg)
            emptyCart();
          }, 
        prefill: {
            name:'',
            email: '',
            phone_number: '',
        },
        theme: {
            color: "#f7444e"
        }
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
    }
    else if(!isauthenticated())
    {
        setsuccess(true);
    }
    else{
      setaddress(true);
    }
}
const showsuccess=()=>(
    
    <div className="alert alert-danger" style={{display:success ? '':'none'}}>
        {window.scrollTo(0, 0)}
          Login to contiue shopping
     </div>
);
const showaddress=()=>(
    <div className="alert alert-danger" style={{display: address? '':'none'}}>
        {window.scrollTo(0, 0)}
          Add Address in your profile checkout
     </div>
);

    return (
       <Fragment>
           <NAV></NAV>
       <div>

               {
                   cartproduct.length>0?  
                   <div class="container">
                        {
                showsuccess()
            }
            {
                showaddress()
            }
            
          <table id="cart" class="table table-hover table-condensed">
            <thead>
              <tr>
              <th style={{width:"50%"}}>Product</th>
                <th style={{width:"10%"}}>Price</th>
                <th style={{width:"8%"}}>Quantity</th>
                <th style={{width:"22%"}} class="text-center">Subtotal</th>
                <th style={{width:"10%"}}></th>
              </tr>
            </thead>
            <tbody>
        
            {cartproduct.map(item=>(
                <Fragment>
              <tr>
                <td data-th="Product">
                  <div class="row">
                    <div class="col-sm-2 hidden-xs"><img src={item.image} alt="..." class="img-responsive" /></div>
                    <div class="col-sm-10">
                      <h4 class="nomargin">{item.title}</h4>
                    </div>
                  </div>
                </td>
                <td data-th="Price">{item.price}</td>
                <td data-th="Quantity">
        
                  <button onClick={()=>plusquantity(item.productId)} class="plus-btn" type="button" name="button">
                    <img src="https://designmodo.com/demo/shopping-cart/plus.svg" alt="" />
                  </button>
        
                  <span className="item-quantity">{item.quantity}</span>
        
                  <button class="minus-btn" onClick={()=>minusquantity(item.productId)} type="button" name="button">
                    <img src="https://designmodo.com/demo/shopping-cart/minus.svg" alt="" />
                  </button>
        
                </td>
                <td data-th="Subtotal" class="text-center">{item.quantity*item.price}</td>
                <td class="actions" data-th="">
                <button className="trash-btn" onClick={()=>{removeItem(item.productId)}}>
                                     <i class="fa fa-trash"></i>
                                     </button>
                </td>
              </tr>
              </Fragment>
                            ))  }
        
            </tbody>
            <tfoot>
              
              <tr>
                <td><button onClick={emptyCart} class="btn btn-checkout mt-2 mb-2">Clear Cart</button> <a href="/products" class="btn btn-checkout"> <i class="fa fa-angle-left"></i> Continue Shopping</a></td>
                <td colspan="2" class="hidden-xs"></td>
                <td class="hidden-xs text-center"><strong>Total {totalquantity()}</strong></td>
                <td> <button onClick={displayRazorpay} class="btn btn-checkout btn-block">Checkout</button> </td>
              </tr>
            </tfoot>
          </table>
        </div>

        :

        <div className="mt-5 mb-5" >
            <div className="container mt-5" style={{paddingBottom:"10%",paddingTop:"10%"}}>  
           
                <div className="row">
                    <h1>
                        Your Cart is empty add. 
                    </h1>
                    <h1>
                        Go shop to Add some products
                    </h1>
                    <a href='/products'>
                    <button className='btn btn-danger mt-3 mb-3'>
                        Go to shop
                    </button>
                    </a>
                </div>
            </div>    
           
        </div>      
    }
 </div>

         




           
        {/*  
           <div>
        <div class="container padding-bottom-3x mb-1">
    
        <div class="table-responsive shopping-cart">
            <table class="table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th class="text-center">Quantity</th>
                        <th class="text-center">Subtotal</th>
                        <th class="text-center"><button onClick={()=>{emptyCart()}}>Clear Cart</button></th>
                     </tr>
                </thead>
                <tbody>
                {cartproduct.map(item=>(
                     <Fragment>
                    <tr>
                        <td>
                            <div class="product-item">
                                <a class="product-thumb" href="#"><img src={item.image} alt="Product"/></a>
                                <div class="product-info">
                                    <h4 class="product-title"><a href="#">{item.title}</a></h4><span><em>Size:</em> 10.5</span><span><em>Color:</em> Dark Blue</span>
                                </div>
                            </div>
                        </td>
                        <td class="text-center">
                            <div class="count-input">
                            <div class="col"> 
                             <button onClick={()=>minusquantity(item.productId)}><i class="fas fa-minus-circle" style={iconstyle}></i></button> 
                             {item.quantity}
                            <button onClick={()=>plusquantity(item.productId)}><i class="fas fa-plus-circle" style={iconstyle}></i></button>
                             </div>
                            </div>
                        </td>
                        <td class="text-center text-lg text-medium">{item.quantity*item.price}</td>
                        
                        <td class="text-center"><a class="remove-from-cart" href="#" data-toggle="tooltip" title="" data-original-title="Remove item">
                             <button onClick={()=>{removeItem(item.productId)}}>
                             <i class="fa fa-trash"></i>
                             </button>
                             </a></td>
                    </tr>
                   
                    </Fragment>
                    ))  }
                </tbody>
            </table>

            <table class="table">
                <thead>
                    <tr>
                        <th class="text-center">CART SUMMARY</th>
                        <th class="text-center">CHECKOUT {totalquantity()}</th>
                     </tr>
                </thead>
            </table>
        </div>
    </div>
   
        </div>
           */}
            
       </Fragment>
    )
}

export default CART
