
import React, { Fragment } from 'react'
import { useEffect, useState } from 'react'
import { isauthenticated } from '../auth/authenticate'
import NAV from '../components/nav'

function VIEWUSER() { 
    const [user, setuser] = useState([])

    const token=isauthenticated()

    const getalluser=()=>{
        return fetch('/api/user/find',{
            method:"GET",
            headers:{
                Accept:'application/json',
                "content-type":"application/json",
                token:`Bearer ${token.token}`
            }
        }).then(response=>{
            return response.json();
        }).catch(err=>{
            console.log(err);
        })
    }
     
    useEffect(async() => {
        const data=await getalluser()
        setuser(data)
    }, [])

    return (
       <Fragment>
           <NAV></NAV>
           <div>
           <div className='container mt-5 mb-5'>
             <div className='row justify-content-evenly'>
                  <div className='col-md-3 pt-2 pb-2'>
                  <i class="fas fa-arrow-left"></i> <a href='/admin'>Go back to admin page</a>
                  </div>
                  <div className='col-md-3 pt-2 pb-2'>
                      <a href='/admin/editproduct'>Delete product</a> <i class="fas fa-arrow-right"></i>
                  </div>
                  <div className='col-md-3 pt-2 pb-2'>
                    <a href='/admin/viewuser'>View users</a> <i class="fas fa-arrow-right"></i>
                  </div>
             </div>
             </div>


             <div className='container '>
                 <div className='row justify-content-evenly'>
             
                  {
                      user.map(item=>(
                        <div class="card mt-2 mb-2" style={{width: "18rem;"}}>
                        <div class="card-body">
                            Username<h5 class="card-title">{item.username}</h5>
                            Email Id <h5 class="card-subtitle mb-2 text-muted">{item.email}</h5>
                        </div>
                      </div>
                      ))
                  }

                 </div>
            </div>
           </div> 
           
       </Fragment>
    )
}

export default VIEWUSER