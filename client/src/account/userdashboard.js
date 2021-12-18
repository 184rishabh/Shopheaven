import React, { Fragment } from 'react'
import { isauthenticated } from '../auth/authenticate'
import { useEffect, useState } from 'react'
import { Redirect } from 'react-router';
import NAV from '../components/nav';

function USERDASHBOARD() {

    const user=isauthenticated().user;
    const token=isauthenticated().token;
    const [sucess,setsucess]=useState(false)
    const [error, seterror] = useState(false)
    
    const deleteuser=(id)=>{
        return fetch(`http://localhost:5000/api/user/${id}`,{
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
               setsucess(true)
            }
        })
    }
    const showsuccess=()=>{

        if(sucess)
        {
            localStorage.removeItem("jwt")
            return <Redirect to="/" />
        }
    };

    const showerror=()=>(
        <div className="alert alert-info" style={{display:error ? '':'none'}}>
              something went wrong
         </div>
    );


    return (
        <Fragment>
            <NAV></NAV>
            <div>
            {
                showerror()
            }
            {
                showsuccess()
            }
            <div className="mt-5">
                <a href="/dashboard">
                    <h2>
                    go back to user dashboard
                    </h2>
                </a>
            </div>
            <button type="button" className="btn btn-danger my-5" ><a href="/user/update">Set new password</a></button>
            
        </div>
    
        </Fragment>
        )
}

export default USERDASHBOARD
