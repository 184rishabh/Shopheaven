import React from 'react'
import { Fragment } from 'react'
import './dashboard.css'
import NAV from '../components/nav'
import { isauthenticated } from '../auth/authenticate'
import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'

function DASHBOARD() {

    const user=isauthenticated().user;
    const token=isauthenticated().token;
    const [deletesucess,setdeletesucess]=useState(false)
    const [addsuccess, setaddsuccess] = useState(false)
    const [passsuccess, setpasssuccess] = useState(false)
    const [orderdata, setorderdata] = useState([])
    const [error, seterror] = useState(false)
    const [len, setlen] = useState(false)
    const [add, setadd] = useState("")
    const [newpass, setnewpass] = useState("")
    const id=user._id
    const usertoken=token
  
  
  useEffect(async() => {
    var order=await fetch(`/api/order/find/${id}`,{
          method:"GET",
          headers:{
              Accept:'application/json',
              "content-type":"application/json",
              token:`Bearer ${usertoken}`
          },
      }).then(response=>{
          return response.json();
      }).catch(err=>{
          console.log(err)
      })
   setorderdata(order)
  }, [])
  console.log(orderdata)


  // deleting user
    const deleteuser=(id)=>{
        return fetch(`/api/user/${id}`,{
            method:"DELETE",
            headers:{
                "content-type":"application/json",
                token:`Bearer ${token}`
            }
        }).then(response=>{
            return response.json();
        }).catch(err=>{
            console.log(err);
        })
    }
    const deleteuserbtn=(id)=>{
        deleteuser(id).then(data=>{
            if(data.error)
            {
                console.log(data)
                seterror(true)
            }
            else{
               setdeletesucess(true)
            }
        })
    }
    const showsuccess=()=>{
        if(deletesucess)
        {
            localStorage.removeItem("jwt")
            return <Redirect to="/" />
        }
    };
    const showpasssuccess=()=>(
        <div className="alert alert-info" style={{display:passsuccess ? '':'none'}}>
         Password updated succesfully.
        </div>
   );
  const showaddsuccess=()=>(
    <div className="alert alert-info" style={{display:addsuccess ? '':'none'}}>
    Address updated successfully.
    </div>
  );
    const showerror=()=>(
        <div className="alert alert-info" style={{display:error ? '':'none'}}>
              Something went wrong
         </div>
    );
    const showlen=()=>(
      <div className="alert alert-info" style={{display:len ? '':'none'}}>
            character length should be greater than 8
       </div>
  );

    const updatepassword=async(user)=>{
      return fetch(`/api/user/${id}`,{
          method:"PUT",
          headers:{
              Accept:'application/json',
              "content-type":"application/json",
              token:`Bearer ${usertoken}`
          },
          body:JSON.stringify(user)
      }).then(response=>{
          return response.json();
      }).catch(err=>{
          console.log(err)
      })
  }

    const passupdate=(event)=>{
      event.preventDefault();
     if(newpass.length<8)
     {
            setlen(true)
            setnewpass("")
     }
     else{
      updatepassword({username:user.username,password:newpass}).then(data=>{
        if(data.error)
        {
            console.log(data)
            seterror(true)
            setnewpass("")
        }
        else{
         setpasssuccess(true)
         setnewpass("")
        }
           
       })
     }
   }
   const addupdate = async (event)=>{
    event.preventDefault();
    console.log(add)
    console.log("add")
   if(add.length<8)
   {
    setlen(true)
    setadd("")
   }
   else{
    updatepassword({username:user.username,address:add}).then(data=>{
      if(data.error)
      {
          console.log(data)
          seterror(true)
          setadd("")
      }
      else{
          setaddsuccess(true)
          setadd("")
         console.log("jwt");
         var x=JSON.parse(localStorage.getItem("jwt"))
         console.log(x.user)
         x.user.address=add
         console.log(x)
         localStorage.setItem("jwt",JSON.stringify(x));
        
      }
         
     })
   }
 }
    return (
        <Fragment>
        <NAV/>  
            {
                showerror()
            }
            {
                showsuccess()
            }
            {
              showpasssuccess()
            }
            {
              showaddsuccess()
            }
            {
              showlen()
            }




        <div style={{paddingBottom:"150px"}}>   
        {/* padding for footer */}
            <div className="container mt-5">
                <div className="row justify-content-center">
                       <div className="col-md-8">
                         <div className='row justify-content-evenly'>
                         <div class="card" style={{padding:"0px"}}>
                         <h5 class="card-header">User details</h5>
                         <div class="card-body">
                           <h5 class="card-title">Username-{user.username}</h5>
                           <h5 class="card-title">Email -{user.email}</h5>
                           <h5 class="card-title">Address -{user.address}</h5>
                         </div>
                       </div>
                   

                         </div>

<h4 className="mt-4 mb-2">
    { user.isadmin ? <a href="/admin">go to admin page</a> :""}
</h4>
<div className='container mt-3'>
 <div className='row justify-content-center'>
     <div className='col-md-3 mt-2'>
         <button className='user-btn' data-bs-toggle="modal" data-bs-target="#Modaladdress">Add address</button>
             <div className="modal fade" id="Modaladdress" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                         <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLabel">ADD YOUR ADDRESS</h5>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                         </div>
                         <div className="modal-body">
                         <form>
                            <div class="form-group mt-2">
                                <label for="address" className='mb-2'>Give complete Address </label>
                               <input value={add} type="text" onChange={(e) => setadd(e.target.value)} class="form-control user-inp mb-2" id="address" placeholder="Address"/>
                            </div>
                            <button onClick={addupdate} data-bs-dismiss="modal" class="btn user-btn mt-2">Submit</button>
                        </form>
                      </div>
                </div>
              </div>
            </div>
     </div>

     <div className='col-md-3 mt-2'>

     <button className='user-btn' data-bs-toggle="modal" data-bs-target="#modalpassword">Set new password</button>
     <div className="modal fade" id="modalpassword" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                         <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLabel">Set New Password</h5>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                         </div>
                         <div className="modal-body">
                         <form>
                          
                           <div class="form-group mt-2">
                            <label for="exampleInputPassword1" className='mb-2'>Password</label>
                            <input value={newpass} type="password" onChange={(e) => setnewpass(e.target.value)} value ={newpass} class="form-control user-inp mb-2" id="exampleInputPassword1" placeholder="Password"/>
                             </div>
                            <button onClick={passupdate} data-bs-dismiss="modal" class="btn user-btn mt-2">Submit</button>
                          </form>
                      </div>
                </div>
            </div>
            </div>
     </div>
     
     <div className='col-md-3 mt-2'>
     <button className="user-btn" data-bs-toggle="modal" data-bs-target="#Modaldelete">
                 Delete account
            </button>
            
            <div className="modal fade" id="Modaldelete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                         <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLabel">Delete Account</h5>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                         </div>
                         <div className="modal-body">
                          Do you really want to delete your account
                         </div>
                     <div className="modal-footer">
                     <button type="button" onClick={()=>{deleteuserbtn(user._id)}}  className="btn user-btn" data-bs-dismiss="modal">Yes</button>
                     </div>
                </div>
            </div>
            </div>
     </div>
 </div>
</div>
<h3 className="mt-5 mb-3">
    your previous orders
</h3>
<div class="accordion accordion-flush" id="accordionFlushExample">

  {
    orderdata.map((item,index)=>(
      <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        Order {index+1}
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse mt-2" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
     <h5>
       Payment id - {item.paymentid}
     </h5>
     <h5>
       Amount - {item.amount}
     </h5>
     <h5>
       Address - {item.address}
     </h5>
   <h5>
     Products - 
     {

   item.products.map(p=>(
    <span style={{marginLeft:"10px"}}>
      { p.title }
    </span>
  ))
     }
</h5>
     
    </div>
  </div>
    ))
  }
 
</div>

                       </div>
                </div>
            </div>
        </div>
        </Fragment> 
    )
}

export default DASHBOARD
