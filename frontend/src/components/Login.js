import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

const Login = (props) => {
    const [credentials,setCredentials] = useState({email:"",password:""});
    let navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:5000/api/auth/login",{
            method:'POST',
            headers:{
              'Content-Type':'application/JSON',
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
          });
        const json=await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem('token',json.authToken);
            navigate("/");
            props.showAlert("Logged in successfully","success");
        }
        else{
          props.showAlert("Invalid credentials","danger");        
        }
      }

    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

  return (
    <div className='mt-3'>
      <h2>Login to continue</h2>
        <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input type="email" value={credentials.email} onChange={onChange} className="form-control" id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email"/>
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" value={credentials.password} onChange={onChange} className="form-control" id="password" name='password' minLength={5} placeholder="Password"/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login