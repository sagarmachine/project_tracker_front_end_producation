import React, {Component,Fragment} from "react"
import Toolbar from "../navigation/toolbar/toolbar";
import SideDrawer from "../navigation/side-drawer/side-drawer";
import Main from "../main/main";
import axios from "axios";
import LayoutContext from "./layout-context"



class Layout extends Component{
  state={
    sideDrawer:null,
    toolbar:["toolbar","closeToolbar"],
    toggle:true,
    logInName:"",
    logIn:false
  }


  sideDrawerToggleHandler=()=>{
    const newToggle = !this.state.toggle
    this.setState({toggle:newToggle})
    const classes = ["sideDrawer",this.state.toggle?"open":"close"]
    const newClasses = classes.join(" ");
    this.setState({sideDrawer:newClasses})
    this.toolbarHandler();
  }

   toolbarHandler=()=>{
     const newToggle =this.state.toggle
     if(this.state.toggle){
       const newClasses = ["toolbar",newToggle?"openToolbar":"closeToolbar"]
       this.setState({toolbar:newClasses})
     }else{
       const newClasses = ["toolbar",newToggle?"openToolbar":"closeToolbar"]
       this.setState({toolbar:newClasses})
     }
   }


   logOutHandler=()=>{
     if(window.confirm('Are you sure you want to logout?')===true){
       this.setState({logInName:"",login :this.state.logIn})
       axios.defaults.headers.common['Authentication'] = null;
       window.location.href = "http://localhost:3000";
     }else{
       return;
     }

   }

   logInNameHandler=(email)=>{
     const newState = this.state;
     newState.logInName = email;
     newState.logIn=true;
     this.setState({
       ...newState
     })
   }

   css=()=>{
     return "black"
   }

   render(){

    let sideDrawer = null;
     if(this.state.sideDrawer){
        sideDrawer = <SideDrawer classes={this.state.sideDrawer}/>

     }
     return (
       <LayoutContext.Provider value={{authenticated:this.state.logIn}}>
       <Fragment>
          <Toolbar
           logOut={this.logOutHandler}
           email={this.state.logInName}
           classes={this.state.toolbar}
           toggleSideDrawer={this.sideDrawerToggleHandler}/>
            {sideDrawer}
          <Main getStarted={this.state.logIn}  email={this.logInNameHandler}/>
       </Fragment>
       </LayoutContext.Provider>
     )
  }
}


export default Layout;
