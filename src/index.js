import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { render } from '@testing-library/react';
import { keyboard } from '@testing-library/user-event/dist/keyboard';
import { unmountComponentAtNode } from 'react-dom';

// I will be using classes in this project, but I should use hooks and functional in the next.
// Classes don't use props because you can just pass arguments through functions as normal.
class Main extends React.Component{
  constructor(props){
    super(props);
    this.state={
      noteCount:0,
      noteWindow:0,
      notes:[{}]
  }
  this.newNoteSubmitted=this.newNoteSubmitted.bind(this)
  }
    noteCreated(){
      this.setState({noteWindow:1})
    }
    noteCanceled(){
      this.setState({noteWindow:0})
    }
    newNoteTyping(event){
    }
    newNoteSubmitted(event){
      const titleWindow=document.getElementById("newNoteTitleWindow")
      const contentWindow=document.getElementById("newNoteContentsWindow")
      if(titleWindow.value===""||contentWindow.value===""){
        console.log("AT LEAST ONE FIELD EMPTY") //Should remove this for debugging.
        
      }
      else{
      this.setState({
        noteCount:this.state.noteCount+1,
        notes: [
          ...this.state.notes,
          {
            title:titleWindow.value,
            content:contentWindow.value
          }
        ]

      },()=>{
      contentWindow.value=""
      titleWindow.value=""
      this.noteMapped()
      }
    )}
    }
    clickedOutFullNote(){
      console.log("CLICKED OUT")
      const fullWindow=document.getElementById("clickedNoteContainer")
      const fullNote=document.getElementById("clickedNote")
      const mappedNotes=document.getElementById("noteContainer")
      fullWindow.style.zIndex="-1"
      fullWindow.style.opacity="0"
      fullNote.style.zIndex="-1"
      fullNote.style.opacity="0"
      mappedNotes.style.opacity="100"
    }
    noteClicked(title,contents){
      console.log("clicked note")
     
      const mappedNotes=document.getElementById("noteContainer")
      
      mappedNotes.style.opacity="0"
      render(
        <div id="clickedNoteContainer">
          <div id="clickedNoteGrayOut" onClick={()=>this.clickedOutFullNote()}></div>
          <div id="clickedNote">
           <div id="clickedNoteTitle">{title}</div>
           <div id="clickedNoteContents">{contents}</div>
          </div>
      </div>
      )
      const clickedNoteWindow=document.getElementById("clickedNoteContainer")
      clickedNoteWindow.style.zIndex="10"
      clickedNoteWindow.style.opacity="100"

    }
    header(){
      return(
        <div id="header">Notetaking App</div>
      )
    }
    mainWindow(){
      return(
        <div id="mainWindow"></div>
      )
    }
    singleNoteWindow(title, content){
      return(
        <div id="singleNote">
          <div id="noteTitle">{title}</div>
          <div id="noteContent">{content}</div>
        </div>
      )
    }
    noteMapped(){
      return(
      <ul id="noteContainer">
        {this.state.notes.map(note=>
          <li key={note} 
          onClick={()=>this.noteClicked(note.title,note.content)}
          id={note.content!==undefined?"singleNote":"hideUndefinedNote"}
          >
            <img src={note.content!==undefined?"thingrayline.png":""} id="noteGrayDivider"/>
            <div id="singleNoteTitle" >{note.title}</div>
            <div id="singleNoteContent">{note.content}</div>
          </li>
    )}
      </ul>
      )
    }
    sidebar(){
      switch(this.state.noteWindow){
        case 0:
          return(
            <div id="sidebar">
              <div id="newNoteBox" onClick={() => this.noteCreated()}>Create a New Note</div>
            </div>
          )
          break;
        case 1:
          return(
          <div id="sidebar">
            <div id="newNoteContainer">
              <textarea maxlength="10"id="newNoteTitleWindow" placeholder="Enter Title..."></textarea>
              <textarea maxlength="200" id="newNoteContentsWindow" placeholder="Start writing. Character limit: 200" onKeyUp={this.newNoteTyping}></textarea>
              <div id="newNoteSubmitButton" className="newNoteBottomButton" onClick={this.newNoteSubmitted}>Publish</div>
              <div id="newNoteCancelButton" className="newNoteBottomButton" onClick={()=>this.noteCanceled()}>Cancel</div>
            </div>
          </div>
          )
          break;
      }
    }
    render(){
      return(
        <>
          <>{this.header()}</>
          <>{this.mainWindow()}</>
          <>{this.sidebar()}</>
          <>{this.noteMapped()}</>
          
        </>
      )

    }

  }



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div id="container">
    <Main/>
  </div>
);