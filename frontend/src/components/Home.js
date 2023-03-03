import React, { useContext } from 'react'
import Notes from './Notes'
import noteContext from '../context/notes/noteContext';

const Home = () => {


  return (
    <div>
    <div className='container my-3'>
      <h2>Add a note</h2>
      <form>
        <div className="form-group">
          <label>Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label >Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>
      
      <Notes />
    </div>
  )
}

export default Home