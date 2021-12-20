import React,{Fragment, useState} from 'react'
import'./signup.css'
import loginimg from '../components/static/loginimg.jpeg'
import NAV from '../components/nav';

function SIGNUP() {
    const [values,setvalues]=useState(
        {
            name:"",
            email:"",
            password:"",
            error:"",
            sucess:false
        }
    )
    const { name ,email , password ,error ,sucess}=values;
    
    const handlechange=name=>event=>{
    setvalues({...values,error:false,[name]:event.target.value})
    
    
    }
    const sign=(user)=>{
       
        return fetch('/api/auth/register',{
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
        if(values.password.length<6)
        {
            setvalues({...values,error:"password length should be 6 or more character",sucess:false});
        }
        else{
       sign({username:name,email:email,password:password})
       .then(data=>{
           if(data.error)
           {
              setvalues({...values,error:data.error,sucess:false})
           }
           else
           {
               setvalues({...values,
            name:'',
            email:'',
            password:'',
            error:'',
            sucess:true,
              })
           }

       })}
    }
    const showerror=()=>(
        <div className="alert alert-info" style={{display:error ? '':'none'}}>
              {error}
         </div>
    );
    const showsuccess=()=>(
        <div className="alert alert-info" style={{display:sucess ? '':'none'}}>
              new account created! please Signin
         </div>
    );
   

    return (
        <Fragment>
            <NAV/>
            <div>
        <div className="container login-container">
        <div className="row login-row">

            <div className="col-lg-5 login-img-container">
                      <img src={loginimg} alt="" className="img-fluid login-img"/>
            </div>
            

            <div className="col-lg-7 text-center py-5">
            {
                showerror()
            }
            {
                showsuccess()
            }
                <h1 style={{color:'#f7444e'}}>
                    SIGNUP
                </h1>  
                <form onSubmit={clicksubmit}>
                <div className="form-row py-3 pt-5">
                <div className="signup-inp-div offset-1 col-lg-10">
                    <input value={name} required="required" onChange={handlechange('name')} type="text" className="login-input" placeholder="Username" required />
                </div>
                 </div>
                    <div className="form-row py-3 ">
                        <div className="signup-inp-div offset-1 col-lg-10">
                            <input value={email} onChange={handlechange('email')} type="email" className="login-input" placeholder="Email" required />
                        </div>
                    </div>
                    <div className="form-row">
                      <div className="signup-inp-div offset-1 py-3 col-lg-10">
                          <input value={password} onChange={handlechange('password')} type="Password" className="login-input" placeholder="**********" required />
                      </div>
                    </div>
                    <div className="form-row py-3">
                      <div className="signup-inp-div offset-1 col-lg-10">
                          <button type="submit" className="login-btn">SIGNUP</button>
                      </div>
                    </div>
                    {/* {JSON.stringify(values)} */}
                    </form>
            </div>
        </div>
        </div>
        </div>
        </Fragment>
        
    )
}

export default SIGNUP
