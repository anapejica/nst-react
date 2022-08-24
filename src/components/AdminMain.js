import React, { Component } from 'react';

import "./../css/Prikaz.css"
import "./../css/Login.css"

export default class AdminMain extends Component{
  constructor(props){
    super(props);
    this.state={
        managerName:localStorage.getItem("name"),
        managerId:localStorage.getItem('managerId')
    };
    console.log(this.state.managerId);
    console.log(this.state.managerName)
  }
 goToPage(page,e){
      e.preventDefault();
      this.props.history.push('/'+page);
  }

  logout(e){
      e.preventDefault();
      localStorage.removeItem("name");
      localStorage.removeItem("managerId");
      this.props.history.push("/");

  }
    render(){
        return(
            
            <div className="login">
                <div className="login-container">
                <h2 className="login-header">{this.state.managerName}, choose option:</h2>    
                <hr/>
           
               <button 
               className="btn btn-lg btn-primary btn-block"
               type="submit"
               onClick={e=>this.goToPage("projects",e)}>Manage projects</button>
               <hr/>
               <button 
               className="btn btn-lg btn-primary btn-block"
               type="submit"
               onClick={e=>this.goToPage("employees",e)}>Manage employees</button>
               <hr/>
               <button 
               className="btn btn-lg btn-primary btn-block"
               type="submit"
               onClick={e=>this.goToPage("manageEfforts",e)}>Manage Efforts</button>
               <hr/>
               <button 
               className="btn btn-lg btn-primary btn-block"
               type="submit"
               onClick={e=>this.logout(e)}>Logout</button>
            </div>   
            </div>
            
        );
    }
}
