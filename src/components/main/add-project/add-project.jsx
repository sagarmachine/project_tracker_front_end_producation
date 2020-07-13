 import React, {Component} from "react"
import axios from "axios"
import LayoutContext from "../../layout/layout-context"

 class AddProject extends Component{
    state={
      projectName: "",
      projectIdentifier: "",
      projectDescription: "",
      startingDate: "",
      endingDate: "",
      addNote:"",
      notes:[],
      links:[],
      addLinkFullLink:"",
      addLinkComment:""
    }

    static contextType=LayoutContext;

    onChangeHandler=(e)=>{
      const value = e.target.value
      const name = e.target.name
      let newState = {...this.state}
      this.setState({
        newState,[name]:value
      })
    }

    onSubmitHandler=()=>{

      console.log(this.props);
       const newProject= {
         projectName:this.state.projectName,
         projectIdentifier:this.state.projectIdentifier,
         projectDescription:this.state.projectDescription,
         startingDate: this.state.startingDate,
         endingDate: this.state.endingDate,
         notes:this.state.notes,
         usefullLinks:this.state.links
       }

       axios.post("/v1/project",newProject,{headers:{"Content-Type":"application/json"}}).then(response=>{
           console.log(response);
           this.props.history.push("/dashboard");
       }).catch(e=>{
          alert(e.response.data[0])
       })
    }

    removeNoteHandler=(noteIndex)=>{
      let newState= this.state
      newState.notes.splice(noteIndex,1);

      this.setState({
         ...newState
      })
    }

    addNoteHandler=()=>{
      let newState= this.state
      if(newState.addNote.length!==0){
        newState.notes.push(newState.addNote);
        newState.addNote="";
        this.setState({
          ...newState
        })
      }
    }

    removeLinkHandler=(linkIndex)=>{
      let newState= this.state
      newState.links.splice(linkIndex,1);
      this.setState({
         ...newState
      })
    }

    addLinkHandler=()=>{
      let newState= this.state
      let link={
        link:newState.addLinkFullLink,
        comment:newState.addLinkComment
      }
      if(newState.addLinkFullLink.length!==0 && newState.addLinkComment.length!==0){
        newState.links.push(link);
        newState.addLinkFullLink=""
        newState.addLinkComment=""
        this.setState({
          ...newState
        })
      }
    }


   render(){
    if(this.context.authenticated===false)
    window.location.href = "http://localhost:3000/login";

     return (
        <div className="addProject">
          <h5 className="addProject__heading">Create Project</h5>
<hr />
          <div className="addProject__item addProject__item1">
                <input
                type="text"
                className="addProject__item-name"
                placeholder="Project Name"
                name="projectName"
                value={this.state.projectName}
                onChange={this.onChangeHandler}/>
          </div>
          <div className="addProject__item addProject__item1">
                <input
                type="text"
                className="addProject__item-id"
                placeholder="Unique Project ID"
                name="projectIdentifier"
                value={this.state.projectIdentifier}
                onChange={this.onChangeHandler}/>
          </div>
          <div className="addProject__item">
                <textarea
                className="addProject__item-des"
                placeholder="Project Description"
                name="projectDescription"
                value={this.state.projectDescription}
                onChange={this.onChangeHandler}></textarea>
          </div>
          <div className="rowMaker rowMaker--marginRemover">
          <div className="addProject__item addProject__item1">
                <h6>Start Date</h6>
                <input
                type="date"
                className="addProject__item-date"
                name="startingDate"
                value={this.state.startingDate}
                onChange={this.onChangeHandler}/>
          </div>
          <div className="addProject__item addProject__item1">
                <h6>Estimated End Date</h6>
                <input
                type="date"
                className="addProject__item-date"
                name="endingDate"
                value={this.state.endingDate}
                onChange={this.onChangeHandler}/>
          </div>
          </div>
          <div className="">
            <div className="addProject__item addProject__item1 addProject__item3">
                 <h6>Notes</h6>
                    {this.state.notes.map((note,noteIndex)=>(
                        <div className="noteBox">
                              <input
                              type="text"
                              className="addProject__item-name addNote "
                              name="projectName"
                              value={note}
                              disabled="true"/>
                              <i onClick={()=>this.removeNoteHandler(noteIndex)} className="fa fa-remove fa-4x removeIcon" aria-hidden="true"></i>
                        </div>
                    ))}
                  <div>
                  <input
                  type="text"
                  className="addProject__item-name addNote"
                  placeholder="add a Note"
                  name="addNote"
                  value={this.state.addNote}
                  onChange={this.onChangeHandler}
                  />
                <i onClick={this.addNoteHandler}  className="fa fa-plus fa-4x addIcon addIcon1" aria-hidden="true"></i>
                </div>
          </div>
          <div className="addProject__item addProject__item1 addProject__item3">
              <h6>usefull Links</h6>
                {this.state.links.map((link,linkIndex)=>(
                  <div className="linkBox">
                      <input
                      type="text"
                      className="addProject__item-name addLink-fullLink"
                      value={link.link}
                      disabled="true"/>
                      <i onClick={()=>this.removeLinkHandler(linkIndex)} className="fa fa-remove fa-4x removeIcon removeIcon2" aria-hidden="true"></i>
                      <input
                      type="text"
                      className="addProject__item-name addLink-comment"
                      value={link.comment}
                      disabled="true"/>
                      <span className="comment__span">comment :</span>
                  </div>
                ))}
                <div>
                <input
                type="text"
                className="addProject__item-name addLink-fullLink"
                placeholder="add a Link"
                name="addLinkFullLink"
                value={this.state.addLinkFullLink}
                onChange={this.onChangeHandler}
                />
                <input
                type="text"
                className="addProject__item-name addLink-comment"
                placeholder="add a comment"
                name="addLinkComment"
                value={this.state.addLinkComment}
                onChange={this.onChangeHandler}
                />
                <span className="comment__span">comment :</span>
                <i onClick={this.addLinkHandler}  className="fa fa-plus fa-4x addIcon addIcon2" aria-hidden="true"></i>
                </div>
          </div>
          </div>
          <div className="addProject__item">
                    <input
                    onClick={this.onSubmitHandler}
                    type="submit"
                    className="submitBtn dark-btn"/>
          </div>
        </div>
     )
   }
 }


export default AddProject;
