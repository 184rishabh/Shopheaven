import React, { Fragment } from 'react'
import { useEffect, useState } from 'react'
import { isauthenticated } from '../auth/authenticate'
import NAV from '../components/nav';

function EDITPRODUCT() {
    const [product, setproduct] = useState([]);
    const [change,setchange]=useState([])
    const [sucess,setsucess]=useState(false)

    const getallproduct=()=>{
        return fetch('http://localhost:5000/api/product/',{
            method:"GET"
        }).then(response=>{
            return response.json();
        }).catch(err=>{
            console.log(err);
        })
    }

    useEffect(async() => {
        const data=await getallproduct()
        setproduct(data)
    }, [change])

    const token=isauthenticated()

    const deleteproduct=(id)=>{
        return fetch(`http://localhost:5000/api/product/${id}`,{
            method:"DELETE",
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

    const deleteproductbtn=(id)=>{
        console.log(id)
        deleteproduct(id).then(data=>{
            if(data.error)
            {
                console.log(data)
            }
            else{
               console.log(data)
               setchange("")
               setsucess(true)
               console.log("error")
            }
        })
    }

    const showsuccess=()=>(
        <div className="alert alert-info" style={{display:sucess ? '':'none'}}>
              product deleted!
         </div>
    );

    return(
        <Fragment>
            <NAV/>
            <div>
            {
                showsuccess()
            }
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
            <div class="container admin-product"> 
                    <div class="row mt-5">
                            {
                                product.map(item=>(
                                    <div class="col-md-3">

                                 <div class="card product-top">
                                 <img src={item.img} alt="" class="img-fluid"/>
                                 </div>

                                 <div class="text-center">

                                 <button type="button" onClick={()=>{deleteproductbtn(`${item._id}`)}} class="btn btn-outline-danger mt-2 mb-2">Delete</button>
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

export default EDITPRODUCT
