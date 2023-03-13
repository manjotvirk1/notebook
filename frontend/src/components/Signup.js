import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

const Signup = (props) => {
  const [credentials,setCredentials] = useState({name:"",email:"",password:"",cpassword:""});
    let navigate=useNavigate();
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const {name,email,password}=credentials;
    const response=await fetch("http://localhost:5000/api/auth/createuser",{
      
        method:'POST',
        headers:{
          'Content-Type':'application/JSON',
        },
        body:JSON.stringify({name,email,password})
      });
    const json=await response.json();
    console.log(json);
    if(json.success){
        localStorage.setItem('token',json.authtoken);
        navigate("/");
        props.showAlert("Account created Successfully","success");
    }
    else{
        props.showAlert("Invalid credentials","danger");
    }
}

const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
}
  return (
    <div className='container mt-2'>
    <h2 className='my-2'>Create an account</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group my-3">
    <label htmlFor="name">Name</label>
    <input type="text" onChange={onChange} className="form-control" id="name" name='name' aria-describedby="emailHelp" placeholder="Enter email"/>
  </div>
  <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input type="email" onChange={onChange} className="form-control" id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email"/>
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" value={credentials.password} onChange={onChange} className="form-control" id="password" name='password' placeholder="Password"/>
  </div>
  <div className="form-group">
    <label htmlFor="cpassword">Confirm Password</label>
    <input type="password" onChange={onChange} className="form-control" id="cpassword" name='cpassword' placeholder="Password"/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup