import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// I will be using classes in this project, but I should use hooks and functional in the next.
// Classes don't use props because you can just pass arguments through functions as normal.
// November 2021
// Clean up the code and make the CSS nicer before putting it anywhere.
class Main extends React.Component{
  constructor(props){
    super(props);
    this.state={
      noteWindow:0,
      showFullNote:0,
      showMappedNotes:1,
      showDeleteMenu:0,
      renderedTitle:"",
      renderedContent:"",
      renderedTrashcan:"",
      renderedId:"",
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
            content:contentWindow.value,
            index:this.state.notes.length,
            trashCan:"trashIcon.png"
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
      this.setState({
        showFullNote:0,
        showMappedNotes:1,
        showDeleteMenu:0
      })
    }
    noteClicked(note){
      this.setState({
        showFullNote:1,
        showMappedNotes:0,
        renderedTitle:note.title,
        renderedContent:note.content,
        renderedTrashcan:"trashIcon.png",
        renderedId:note.id
      })
    }
    noteDeleted(full=false,mapped=false){
      var index= this.state.notes.findIndex(note => note.title===this.state.renderedTitle)
      // Finds index of note being deleted
      this.state.notes.splice(index,1) // Remove note from array
      this.clickedOutFullNote()

    }
    trashClicked(event=null,note=null,clicked=false,full=false,mapped=false){
      var mappedTrash=mapped
      var fullTrash=full
      if(clicked){
        event.stopPropagation() // Stops note from displaying in full render

        this.setState({
          showDeleteMenu:1,
          showFullNote:0,
          showMappedNotes:1,
        })

        if(note!=null){
          this.setState({
            renderedId:note.id
          })
        }
      }
      switch(this.state.showDeleteMenu){
        case(0):
          break;
        case(1):
        return(
          <div id="clickedNoteContainer">
            <div id="clickedNoteGrayOut" onClick={()=>this.clickedOutFullNote()}></div>
            <div id="deleteNotePrompt">Delete This Note?</div>
            <div id="deleteNoteCancelButton" className="deleteNoteButtons" 
              onClick={()=>this.clickedOutFullNote()}
              >Cancel</div>
            <div id="deleteNoteDeleteButton" className="deleteNoteButtons"
            onClick={(full,mapped)=>this.noteDeleted(fullTrash,mappedTrash)}
            >Delete</div>
        </div>
    )
        break;

      }
      

    }
    renderFullNote(note,title="",contents=""){
      switch(this.state.showFullNote){
        case(0):
          break;
        case(1):
          return(
            <div id="clickedNoteContainer">
              <div id="clickedNoteGrayOut" onClick={()=>this.clickedOutFullNote()}></div>
              <div id="clickedNote">
              <div id="clickedNoteTitle">{this.state.renderedTitle}</div>
              <div id="clickedNoteContents">{this.state.renderedContent}</div>
              <div onClick={(event,clicked,full)=>this.trashClicked(event,true,true)}><img id="clickedNoteTrashcan" src={this.state.renderedTrashcan}/></div>
              </div>
          </div>
      )
      }
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
      switch(this.state.showMappedNotes){
        case(0):
        break;
        case(1):
          if(this.state.noteCount>0){
            return(
            <ul id="noteContainer">
              {this.state.notes.map(note=>
                <li key={note.index} onClick={()=>this.noteClicked(note)}
                id={note.content!==undefined?"singleNote":"hideUndefinedNote"}
                >
                  <img src={note.content!==undefined?"thingrayline.png":""} id="noteGrayDivider"/>
                  <div id="singleNoteTitle" >{note.title}</div>
                  <div id="singleNoteContent">{note.content}</div>
                  <div id="singleNoteTrashcan" onClick={(event,note,clicked,mapped)=>this.trashClicked(event,note,true,true)}><img id="singleNoteTrashcan"src={note.trashCan}/></div>
                </li>
          )}
            </ul>
          )
              }
        break;
        }
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
          <>{this.renderFullNote()}</>
          <>{this.header()}</>
          <>{this.mainWindow()}</>
          <>{this.sidebar()}</>
          <>{this.noteMapped()}</>
          <>{this.trashClicked()}</>
          
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