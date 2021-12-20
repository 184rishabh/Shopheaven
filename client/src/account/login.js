import React ,{useState}from 'react'
import { Fragment } from 'react'
import './login.css'
import loginimg from '../components/static/loginimg.jpeg'
import { Redirect } from 'react-router';
import { isauthenticated } from '../auth/authenticate'
import NAV from '../components/nav'

function LOGIN() {
   
    //storing the token in local storage
    const authenticate=(data,next)=>{
     if(typeof window!=='undefined')
     {
         localStorage.setItem('jwt',JSON.stringify(data))
         next()
     }
    }

    const {user}=isauthenticated()

    //user form details
    const [values,setvalues]=useState(
        {
            name:"",
            password:"",
            error:"",
            loading:false,
            redirectdash:false,
        }
    )

    const { name , password ,loading ,error ,redirectdash }=values;
    
    const handlechange=name=>event=>{
    setvalues({...values,error:false,[name]:event.target.value})
    
    }

    //calling signin api from backend
    const signin=(user)=>{
        return fetch('/api/auth/login',{
            method:"POST",
            headers:{
                Accept:'application/json',
                "content-type":"application/json"
            },
            body:JSON.stringify(user)
        }).then(response=>{
            return response.json();
        }).catch(err=>{
            console.log(err)
        })
    }

    const clicksubmit=(event)=>{
       event.preventDefault();
       setvalues({...values ,error:false,loading:true});
       console.log(values)
       signin({username:name,password:password})
       .then(data=>{
           if(data.error)
           {
              setvalues({...values,error:data.error,loading:false})
              
           }
           else
           {
               authenticate(
                   data,()=>{
                    setvalues({...values,
                        redirectdash:true
                      })
                   }
               )
           }

       })
    }

    //error message 
    const showerror=()=>(
        <div className="alert alert-info" style={{display:error ? '':'none'}}>
              {error}
         </div>
    );

    //show loading
    const showloading=()=>(
        loading && (<div className="alert alert-info">
               <h3>loading</h3>
        </div>)
    );

    //redirect after signin
    const redirectuser=()=>{
        if(redirectdash)
        {
            if(user && user.isadmin)
            {
                return <Redirect to="/admin" />
            }
            else{
                
                return <Redirect to="/" />
            }
        }
    }

    return (
        <Fragment>
            <NAV/>
            <div>
                <div className="container login-container">
                    <div className="row login-row">

                        {/* login image */}

                        <div className="col-lg-5 login-img-container">
                            <img src={loginimg} alt="" className="img-fluid login-img"/>
                        </div>

                         {/* Login form */}
                         
                        <div className="col-lg-7 text-center py-5">
                           {
                            showerror()
                           }             
                           {
                            showloading()
                           }
                           {
                            redirectuser()
                           } 
                            <h1 style={{color:'#f7444e'}}>
                                 Login
                            </h1>  
                                <form onSubmit={clicksubmit}>

                                    <div className="form-row py-3 pt-5">
                                        <div className="login-inp-div offset-1 col-lg-10">
                                            <input onChange={handlechange('name')} type="text" className="login-input" placeholder="Username" required />
                                        </div> 
                                    </div>

                                    <div className="form-row">
                                        <div className="login-inp-div offset-1 py-3 col-lg-10">
                                            <input onChange={handlechange('password')} type="Password" className="login-input" placeholder="**********" required/>
                                        </div>
                                    </div>

                                    <div className="form-row py-3">
                                        <div className="login-inp-div offset-1 col-lg-10">
                                            <button type="submit" className="login-btn">LogIn</button>
                                        </div>
                                    </div>
                                </form>
                        </div>
                    </div>
                </div>           
            </div>
        </Fragment>
    )
}

export default LOGIN
