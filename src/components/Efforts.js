import React, { Component } from 'react';
import axios from 'axios';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'; 

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import "./../css/Prikaz.css"

export default class Efforts extends Component{
  constructor(props){
        super(props);

        this.state={
            efforts:[]
        };   
    }
    componentDidMount(){
        axios.get('http://localhost:8080/projects', {headers:{'managerId': localStorage.getItem("managerId")}})
        .then(res=>{
            console.log(res.data);
            let data = res.data;
            let efforts =[];
            data.forEach(proj => proj.issues.forEach( issue => issue.efforts.forEach(effort => {
                efforts.push({
                    projectName : proj.projectName,
                    issueName  : issue.issueName,
                    employee : effort.employee.employeeName,
                    effortDescription : effort.description,
                    hours : effort.hours     
                })
            })))  
            
            this.setState({efforts});
      
        })
        .catch((err) => {
                alert("Nece get");
                console.log("AXIOS ERROR: ", err);
            });
        
    }

 add(e){
      e.preventDefault();
      this.props.history.push({pathname:'/neweffort'});
 }

    render(){
       var hidden={display:this.state.isHidden ? 'true' : ''};
        return(
            <div>
          
            <h1 align="center"> Efforts</h1>
            <div className="container" style={{marginTop:50}}>
            <BootstrapTable data={this.state.efforts} >
                <TableHeaderColumn dataField='effortId' isKey hidden></TableHeaderColumn>
                <TableHeaderColumn width ={'20%'} dataField='projectName'>Project Name</TableHeaderColumn>
                <TableHeaderColumn width ={'20%'} dataField='issueName'>Issue Name</TableHeaderColumn>
                <TableHeaderColumn width ={'20%'} dataField='employee'>Employee</TableHeaderColumn>
                <TableHeaderColumn width ={'20%'} dataField='effortDescription'>Effort Description</TableHeaderColumn>
                <TableHeaderColumn width ={'20%'} dataField='hours'>Hours</TableHeaderColumn>     
            </BootstrapTable>

               <button disabled={hidden.display} onClick={(e)=>{this.add(e)}}>Add new effort</button>
               <button disabled={hidden.display}  onClick={e=>this.props.history.push("/adminmain")} style={{float:'right'}}>Back to Home page</button>
            </div>
            </div>
         
        );
    }
}