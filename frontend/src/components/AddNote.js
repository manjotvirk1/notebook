import React,{useContext,useState} from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context =useContext(noteContext);
  const {addNote}=context;

  const [note,SetNote]=useState({title:'',description:'',tag:''});
  const handleClick=(e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    SetNote({title:'',description:'',tag:''});
    props.showAlert("Added successfully","success");
  }

  const onChange=(e)=>{
    SetNote({...note,[e.target.name]:e.target.value})
  }
  return (
    <div>
        <div className='container my-3'>
      <h2>Add a note</h2>
      <form>
        <div className="form-group">
          <label htmlFor='title'>Title</label>
          <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" placeholder="title" onChange={onChange} minLength={5} required/>
        </div>
        <div className="form-group">
          <label htmlFor='description'>Description</label>
          <input type="text" className="form-control" id='description' name='description' value={note.description} placeholder="description" onChange={onChange} minLength={5} required/>
        </div>
        <div className="form-group">
          <label htmlFor='tag'>Tag</label>
          <input type="text" className="form-control" id='tag' name='tag' value={note.tag} placeholder="tag" onChange={onChange} minLength={5} required/>
        </div>
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
      </div>
    </div>
  )
}

export default AddNote