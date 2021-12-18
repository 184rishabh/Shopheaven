import React ,{Fragment, useState} from 'react'
import { isauthenticated } from '../auth/authenticate'
import NAV from '../components/nav';
function ADDPRODUCT() {
    const [values,setvalues]=useState(
        {
            title:"",
            desc:"",
            img:"",
            categories:"",
            size:"",
            color:"",
            price:"",
            error:"",
            sucess:false
        }
    )
    const { title,desc,img,categories,size,color,price,error ,sucess}=values;
    const token=isauthenticated()
    
    const handlechange=name=>event=>{
    setvalues({...values,error:false,[name]:event.target.value})
    
    }

    const addproduct=(product)=>{
        return fetch('http://localhost:5000/api/product/',{
            method:"POST",
            headers:{
                Accept:'application/json',
                "content-type":"application/json",
                token:`Bearer ${token.token}`
            },
            body:JSON.stringify(product)
        }).then(response=>{
            return response.json();
        }).catch(err=>{
            console.log(err)
        })
    }

    const clicksubmit=(event)=>{
       event.preventDefault();
       addproduct({title,desc,img,categories,size,color,price})
       .then(data=>{
           if(data.error)
           {
              setvalues({...values,error:data.error,sucess:false})
            
           }
           else
           {
               setvalues({...values,
                title:"",
                desc:"",
                img:"",
                categories:"",
                size:"",
                color:"",
                price:"",
                error:"",
                sucess:true
              })
           }

       })
    }
    const showerror=()=>(
        <div className="alert alert-info" style={{display:error ? '':'none'}}>
              {error}
         </div>
    );
    const showsuccess=()=>(
        <div className="alert alert-info" style={{display:sucess ? '':'none'}}>
              product added succesfully
         </div>
    );
   
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
        <div class="container mb-5">
            <h3> ADD PRODUCT</h3>
        <div class="row justify-content-center mt-4">
          <div class="col-md-5">
              {
                  showerror()
              }
              {
                  showsuccess()
              }
            <form onSubmit={clicksubmit}>
           
              <div class="mb-3">
                <label for="title" class="form-label">Product Name</label>
                <input value={title} onChange={handlechange('title')} type="text" class="form-control" id="title" required/>
              </div>
              
              <div class="mb-3">
                <label for="desc" class="form-label">Product description</label>
                <input value={desc} onChange={handlechange('desc')} type="text" class="form-control" id="desc" required/>
              </div>
         
              <div class="mb-3">
                <label for="img-url" class="form-label">Image Url</label>
                <input value={img} onChange={handlechange('img')} type="text" class="form-control" id="img-url" required/>
              </div>
            
              <div class="mb-3">
                <label class="form-label">Select Category</label>
                <select value={categories} onChange={handlechange('categories')} class="form-select" required>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>
              
              <div class="mb-3">
                <label class="form-label">Select Size</label>
                <select value={size} onChange={handlechange('size')} class="form-select" required>
                  <option value="s">S</option>
                  <option value="m">M</option>
                  <option value="x">X</option>
                </select>
              </div>
             
              <div class="mb-3">
                <label for="color" class="form-label">Color</label>
                <input value={color} onChange={handlechange('color')} type="text" class="form-control" id="color" required/>
              </div>
              
              <div class="mb-3">
                <label for="price" class="form-label">Price</label>
                <input value={price} onChange={handlechange('price')} type="text" class="form-control" id="price" required/>
              </div>
              <button type="submit" class="btn btn-danger mt-2 mb-2">Submit</button>

            </form>
          </div>
        </div>
      </div>
    
  </div>
        </Fragment>
    )
}

export default ADDPRODUCT
