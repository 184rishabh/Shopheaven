import React,{Fragment, useState} from 'react'
import { isauthenticated } from '../auth/authenticate'
import NAV from '../components/nav'

function USERUPDATE() {

    const [newpass, setnewpass] = useState()
    const [sucess,setsucess]=useState(false)
    const [error, seterror] = useState(false)
 
    const user=isauthenticated()
    const id=user.user._id
    const usertoken=user.token

    const updatepassword=(user)=>{
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
    
    const clickupdate=()=>{
       updatepassword({username:user.user.username,password:newpass}).then(data=>{
        if(data.error)
        {
            console.log(data)
            seterror(true)
        }
        else{
           setsucess(true)
        }
           
       })
    }
    const showsuccess=()=>(

        
            <div className="alert alert-info" style={{display:sucess ? '':'none'}}>
              succesfully updated
           </div>
      
    );

    const showerror=()=>(
        <div className="alert alert-info" style={{display:error ? '':'none'}}>
              something went wrong
         </div>
    );

    return (
        <Fragment>
            <NAV></NAV>
            <div className="mt-5">
           <h1 className="mt-2">You can update your password</h1>
           {showerror()}
           {
               showsuccess()
           }
           <div className="container mt-5">
               <div className="row justify-content-center">
                   <div className="col-md-5">
                        <label for="inputPassword" class="form-label"><h3>Password</h3></label>
                        <input onChange={(e) => setnewpass(e.target.value)} value ={newpass} type="password" id="inputPassword" className="form-control"/>
                        <div className="form-text">
                                Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                        </div>
                        <button onClick={clickupdate} className="btn btn-primary mt-3">set password</button>
                   </div>
               </div>

           </div>
        </div>
        </Fragment>
    )
}

export default USERUPDATE
