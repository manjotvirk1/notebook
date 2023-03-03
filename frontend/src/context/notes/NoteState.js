import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>{
    const notesInitial=[
        {
        "_id": "63fc7459788129c169f34209",
        "user": "63fbc7f5729aa95730c0825f",
        "title": "My note",
        "description": "Hello world",
        "tag": "personal",
        "date": "2023-03-03",
        "__v": 0
      },{
        "_id": "63fc7459788129c169f34209",
        "user": "63fbc7f5729aa95730c0825f",
        "title": "My note",
        "description": "Hello world",
        "tag": "personal",
        "date": "2023-03-03",
        "__v": 0
      },{
        "_id": "63fc7459788129c169f34209",
        "user": "63fbc7f5729aa95730c0825f",
        "title": "My note",
        "description": "Hello world",
        "tag": "personal",
        "date": "2023-03-03",
        "__v": 0
      },{
        "_id": "63fc7459788129c169f34209",
        "user": "63fbc7f5729aa95730c0825f",
        "title": "My note",
        "description": "Hello world",
        "tag": "personal",
        "date": "2023-03-03",
        "__v": 0
      }
    ];
    const[notes,setNotes]=useState(notesInitial);
    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;