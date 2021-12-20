import React ,{useState} from 'react'

import { isauthenticated } from '../auth/authenticate';
import { Fragment } from 'react';
import './nav.css'

import { useHistory } from 'react-router';
import { useLocation } from 'react-router';

function NAV() {

  const history=useHistory()
  useLocation()

 const signoutbtn={
  background: 'none',
	color: 'inherit',
	border: 'none',
	padding: '0',
	font: 'inherit',
	cursor: 'pointer',
	outline: 'inherit',
 }
 

   function gettingcartno()
   {
      if(localStorage.getItem('products')){
      var l = JSON.parse(localStorage.getItem('products')).length;
      return l;
      }    
      return 0; 
     
   }  
  var cartno= gettingcartno()
  
  const signout=()=>{
    localStorage.removeItem("jwt")
    localStorage.removeItem("products")
    history.replace("/")
  }

  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand ps-5" href="/">E-Shop</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link nav-home active ps-5 navbar-link" aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active ps-5 navbar-link" aria-current="page" href="/products">Products</a>
        </li>
        {isauthenticated()&&(
            <Fragment>
              <li className="nav-item">
                {
                  isauthenticated().user.isadmin? <a className="nav-link active ps-5 navbar-link" aria-current="page" href="/admin">Dashboard</a>:<a className="nav-link active ps-5 navbar-link" aria-current="page" href="/dashboard">Dashboard</a>
                }
              </li>
              <li className="nav-item">
                <a className="nav-link active ps-5 navbar-link" aria-current="page"><button onClick={signout} style={signoutbtn}>SignOut</button></a>
              </li>
            </Fragment>
        )}
         {
           !isauthenticated()&&(
            <Fragment>
              <li className="nav-item">
            <a className="nav-link active ps-5 navbar-link" aria-current="page" href="/login">LogIn</a>
         </li>
         
         <li className="nav-item">
            <a className="nav-link active ps-5 navbar-link" aria-current="page" href="/register">SignUp</a>
         </li>
            </Fragment>
           )}
        

      <li className="nav-item cart-no">
        <a className="nav-link active ps-5 me-5 navbar-link" aria-current="page" href="/cart">
        <div className='cartb' >
        <i className="fa" style={{fontsize:"24px"}}  >&#xf07a;</i>
        <span className="cart-badge-no" > {cartno} </span>
        </div>
        </a>
      </li> 
    </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

export default NAV

