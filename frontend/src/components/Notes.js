import React, { useContext, useEffect, useRef,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';


const Notes = (props) => {
  let navigate=useNavigate(noteContext)
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate('/login');
    }
  }, [])

  const [note,SetNote]=useState({id:'',etitle:'',edescription:'',etag:'default'});
  

  const onChange=(e)=>{
    SetNote({...note,[e.target.name]:e.target.value})
  }
  const ref = useRef(null);
  const refClose = useRef(null);
  const updateNote = (currentnote) => {
    ref.current.click();
    SetNote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag});
    props.showAlert("Updated successfully","success");
  }

  const handleClick=(e)=>{
    // console.log("Updating the note");
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();
    props.showAlert("Updated successfully","success");
  }
  
  return (
    <>
      <AddNote showAlert={props.showAlert}/>

      <button  type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor='title'>Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" placeholder="title" onChange={onChange} minLength={5} required/>
                </div>
                <div className="form-group">
                  <label htmlFor='description'>Description</label>
                  <input type="text" className="form-control" id='edescription' name='edescription' value={note.edescription} placeholder="description" onChange={onChange}  minLength={5} required/>
                </div>
                <div className="form-group">
                  <label htmlFor='tag'>Tag</label>
                  <input type="text" className="form-control" id='etag' name='tag' placeholder="etag" value={note.etag} onChange={onChange}  minLength={5} required/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5} className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h2>Your Notes</h2>
        <div className='container'>
        {(notes.length===0) && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes
