 import React, {Component} from "react"
// import axios from "axios";
import {Link} from "react-router-dom"

 class ProjectItem extends Component{




   render(){

     return (
         // <!-- Project Item Component -->
        <div className="projectItem">
                    <div className="projectItem__details">
                      <div className="projectItem__details-col1">
                          <h3 className="h3">{this.props.name}</h3>
                          <p className="p">{this.props.des}</p>
                      </div>
                      <div className="projectItem__details-col2">
                          {/*<p>Start Date: <strong>{this.props.data.startingDate}</strong></p>
                          <p>End Date: <strong>{this.props.data.endingDate}</strong></p>*/}
                          <p>Created On: <strong>{this.props.data.createdDate}</strong></p>
                      </div>
                    </div>
                    <div className="projectItem__edits">
                        <ul className="projectItem__edits-list">
                              <Link to={{
                                pathname:"/projectBoard",
                                state:{
                                  projectIdentifier:this.props.identifier,
                                  projectName:this.props.name,
                                  data:this.props.data
                                }
                              }}>
                                <li className="projectItem__edits-board projectItem__edits-item">
                                    <i className="fa fa-flag-checkered pr-1"> Project Board</i>
                                </li>
                              </Link>
                              <Link to={{
                                pathname:"/updateProject",
                                state:{
                                  data:this.props.data
                                }
                              }}>
                                <li className="projectItem__edits-update projectItem__edits-item">
                                    <i className="fa fa-edit pr-1"> Update Project Info</i>
                                </li>
                              </Link>
                                <li onClick={()=>this.props.delete(this.props.identifier,this.props.index)} className="projectItem__edits-delete projectItem__edits-item">
                                    <i className="fa fa-minus-circle pr-1"> Delete Project</i>
                                </li>
                        </ul>
                    </div>
                </div>
        // <!-- End of Project Item Component -->
     )
   }
 }


export default ProjectItem;
