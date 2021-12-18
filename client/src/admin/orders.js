import React, { Fragment } from 'react'
import NAV from '../components/nav'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { isauthenticated } from '../auth/authenticate'

function ORDER() {

    const [order, setorder] = useState([])
    const [status, setstatus] = useState("")
    const [orderupdated, setorderupdated] = useState(false)
    const token=isauthenticated().token;
    useEffect(() => {
        setorderupdated(false)
        const fetchdata=async()=>{
            const {data}=await axios.get('http://localhost:5000/api/order/',{
                headers: {
                   token:`Bearer ${token}`
                  }
            })
            setorder(data)
            }
            fetchdata()
    }, [orderupdated])
  
    const updateorderapi=async(order,id)=>{
        return fetch(`http://localhost:5000/api/order/${id}`,{
            method:"PUT",
            headers:{
                Accept:'application/json',
                "content-type":"application/json",
                token:`Bearer ${token}`
            },
            body:JSON.stringify(order)
        }).then(response=>{
            return response.json();
        }).catch(err=>{
            console.log(err)
        })
    }
  
      const orderupdate=(item,stat)=>{
        console.log("item")
        console.log(item)
        const id=item._id
        console.log(item.paymentid)
        console.log(item.userid)
        console.log(item.products)
        console.log(item.amount)
        console.log(item.address)
        console.log(stat)
        updateorderapi({paymentid:item.paymentid,userid:item.userid,products:item.products,amount:item.amount,address:item.address,status:stat},id).then(data=>{
         if(data.error)
          {
              console.log(data)
          }
          else{
           console.log(data)
           setorderupdated(true)
          }
         })
     
     }


    return (
       <Fragment>
            <NAV></NAV>
           
        <div className='container text-center'>
            <h2>orders page</h2>
            <div className='row justify-content-evenly'>
                                  
           {
               
               order.map((item,index)=>(
                <div class="card mt-4 mb-4" style={{width: "18rem"}}>
                <div class="card-body">
                    <h4 class="card-title">Order {index+1}</h4>
                    <hr className='mt-1 mb-3'></hr>
                    <h6>Payment Id-{item.paymentid}</h6>
                    <h6>Amount-{item.amount}</h6>
                    <h6>Address-{item.address}</h6>
                    <h6>Status-{item.status}</h6>
                    
                    <select className='mt-1 mb-1' onChange={(e)=>{setstatus(e.target.value)}}>
                        <option selected>
                            select status
                        </option>
                        <option value="pending">
                            Pending
                        </option>
                        <option value="delivered">
                           Delivered
                        </option>
                        <option value="On the way">
                           On the way
                        </option>
                    </select>
                    <button onClick={()=>{orderupdate(item,status)}} className='btn btn-danger mt-2 mb-2'>Edit status</button>
                </div>
               </div>
               ))
           }





            </div> 
        </div>
       </Fragment>
    )
}

export default ORDER
