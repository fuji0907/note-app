
import { useEffect, useState } from 'react';
import './App.css'
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import uuid from 'react-uuid';

function App() {
  
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes") )|| []
    ); 
  const [activeNote,setActiveNote] =useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (notes.length > 0) {
      setActiveNote(notes[0].id);
    }
  }, [notes]);


  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "",
      content: "",
      modDate: Date.now(),
    };
    setNotes([...notes,newNote]);
  };

const onDeleteNote = (id) => {
  const filterNotes = notes.filter((note) => note.id  !== id);
  setNotes(filterNotes);
};

const getActiveNote = () => {
  return notes.find ((note) => note.id === activeNote  )
};

const onUpdateNote = (updateNote) => {
  const updateNoteArray = notes.map((note) => {
    if(note.id === updateNote.id){
      return updateNote;
    } else{
      return note;
    }
  });

  setNotes(updateNoteArray);
};

  return <div className="App">
    
      <Sidebar 
        onAddNote={onAddNote}
        notes={notes} 
        onDeleteNote={onDeleteNote}
        setActiveNote={setActiveNote}
        />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote}/>

    
    </div>;
}

export default App
